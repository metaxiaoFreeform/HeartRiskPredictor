import { PreventInput, ModelType } from './types';
import { mmolConversion, adjust, sdicat } from './helpers';

export interface FactorContribution {
  factor: string;
  value: number;
  direction: 'risk' | 'protective';
}

/**
 * Decompose the 10-year CVD log-odds into individual factor groups.
 * Returns sorted by |value| descending.
 */
export function computeContributions(input: PreventInput, model: ModelType): FactorContribution[] {
  const { sex, age, tc, hdl, sbp, dm, smoking, bmi, egfr, bptreat, statin, uacr, hba1c, sdi } = input;
  const ageC = (age - 55) / 10;
  const nonHdl = mmolConversion(tc - hdl) - 3.5;
  const hdlC = (mmolConversion(hdl) - 1.3) / 0.3;
  const sbpLow = (Math.min(sbp, 110) - 110) / 20;
  const sbpHigh = (Math.max(sbp, 110) - 130) / 20;
  const egfrLow = (Math.min(egfr, 60) - 60) / (-15);
  const egfrHigh = (Math.max(egfr, 60) - 90) / (-15);
  const bmiVal = bmi ?? 25;
  const bmiLow = (Math.min(bmiVal, 30) - 25) / 5;
  const bmiHigh = (Math.max(bmiVal, 30) - 30) / 5;

  const hasUacr = uacr !== undefined && uacr !== null;
  const hasHba1c = hba1c !== undefined && hba1c !== null;
  const hasSdi = sdi !== undefined && sdi !== null;

  const useFull = model !== 'base';

  // We compute factor contributions for 10yr CVD only
  let ageContrib: number;
  let cholContrib: number;
  let hdlContrib: number;
  let bpContrib: number;
  let dmContrib: number;
  let smokingContrib: number;
  let kidneyContrib: number;
  let statinContrib: number;
  let uacrContrib = 0;
  let hba1cContrib = 0;
  let sdiContrib = 0;

  if (!useFull) {
    // Base model 10yr CVD coefficients
    if (sex === 1) { // female
      ageContrib = 0.7939329 * ageC;
      cholContrib = 0.0305239 * nonHdl + 0.1197879 * statin * nonHdl - 0.0819715 * ageC * nonHdl;
      hdlContrib = -0.1606857 * hdlC + 0.0306769 * ageC * hdlC;
      bpContrib = -0.2394003 * sbpLow + 0.360078 * sbpHigh + 0.3151672 * bptreat - 0.0663612 * bptreat * sbpHigh - 0.0946348 * ageC * sbpHigh;
      dmContrib = 0.8667604 * dm - 0.27057 * ageC * dm;
      smokingContrib = 0.5360739 * smoking - 0.078715 * ageC * smoking;
      kidneyContrib = 0.6045917 * egfrLow + 0.0433769 * egfrHigh - 0.1637806 * ageC * egfrLow;
      statinContrib = -0.1477655 * statin;
    } else { // male
      ageContrib = 0.7688528 * ageC;
      cholContrib = 0.0736174 * nonHdl + 0.150273 * statin * nonHdl - 0.0517874 * ageC * nonHdl;
      hdlContrib = -0.0954431 * hdlC + 0.0191169 * ageC * hdlC;
      bpContrib = -0.4347345 * sbpLow + 0.3362658 * sbpHigh + 0.288879 * bptreat - 0.0475924 * bptreat * sbpHigh - 0.1049477 * ageC * sbpHigh;
      dmContrib = 0.7692857 * dm - 0.2251948 * ageC * dm;
      smokingContrib = 0.4386871 * smoking - 0.0895067 * ageC * smoking;
      kidneyContrib = 0.5378979 * egfrLow + 0.0164827 * egfrHigh - 0.1543702 * ageC * egfrLow;
      statinContrib = -0.1337349 * statin;
    }
  } else {
    // Full model 10yr CVD coefficients
    if (sex === 1) { // female
      ageContrib = 0.7716794 * ageC;
      cholContrib = 0.0062109 * nonHdl + 0.1061825 * statin * nonHdl - 0.0742271 * ageC * nonHdl;
      hdlContrib = -0.1547756 * hdlC + 0.0288245 * ageC * hdlC;
      bpContrib = -0.1933123 * sbpLow + 0.3071217 * sbpHigh + 0.3034892 * bptreat - 0.0667026 * bptreat * sbpHigh - 0.0875188 * ageC * sbpHigh;
      dmContrib = 0.496753 * dm - 0.2267102 * ageC * dm;
      smokingContrib = 0.466605 * smoking - 0.0676125 * ageC * smoking;
      kidneyContrib = 0.4780697 * egfrLow + 0.0529077 * egfrHigh - 0.1493231 * ageC * egfrLow;
      statinContrib = -0.1556524 * statin;
      sdiContrib = hasSdi ? (0.1361989 * (2 - sdicat(sdi!)) * sdicat(sdi!) + 0.2261596 * (sdicat(sdi!) - 1) * (0.5 * sdicat(sdi!))) : 0.1804508;
      uacrContrib = hasUacr ? 0.1645922 * Math.log(adjust(uacr!)) : 0.0198413;
      hba1cContrib = hasHba1c ? (0.1298513 * (hba1c! - 5.3) * dm + 0.1412555 * (hba1c! - 5.3) * (1 - dm)) : -0.0031658;
    } else { // male
      ageContrib = 0.7847578 * ageC;
      cholContrib = 0.0534485 * nonHdl + 0.1415382 * statin * nonHdl - 0.0436455 * ageC * nonHdl;
      hdlContrib = -0.0911282 * hdlC + 0.0199549 * ageC * hdlC;
      bpContrib = -0.4921973 * sbpLow + 0.2972415 * sbpHigh + 0.2508052 * bptreat - 0.0474695 * bptreat * sbpHigh - 0.1022686 * ageC * sbpHigh;
      dmContrib = 0.4527054 * dm - 0.1762507 * ageC * dm;
      smokingContrib = 0.3726641 * smoking - 0.0715873 * ageC * smoking;
      kidneyContrib = 0.3886854 * egfrLow + 0.0081661 * egfrHigh - 0.1428668 * ageC * egfrLow;
      statinContrib = -0.1538484 * statin;
      sdiContrib = hasSdi ? (0.0802431 * (2 - sdicat(sdi!)) * sdicat(sdi!) + 0.275073 * (sdicat(sdi!) - 1) * (0.5 * sdicat(sdi!))) : 0.144759;
      uacrContrib = hasUacr ? 0.1772853 * Math.log(adjust(uacr!)) : 0.1095674;
      hba1cContrib = hasHba1c ? (0.1165698 * (hba1c! - 5.3) * dm + 0.1048297 * (hba1c! - 5.3) * (1 - dm)) : -0.0230072;
    }
  }

  const factors: FactorContribution[] = [
    { factor: 'age', value: ageContrib, direction: ageContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'cholesterol', value: cholContrib, direction: cholContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'hdl', value: hdlContrib, direction: hdlContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'bloodPressure', value: bpContrib, direction: bpContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'diabetes', value: dmContrib, direction: dmContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'smoking', value: smokingContrib, direction: smokingContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'kidney', value: kidneyContrib, direction: kidneyContrib >= 0 ? 'risk' : 'protective' },
    { factor: 'statin', value: statinContrib, direction: statinContrib >= 0 ? 'risk' : 'protective' },
  ];

  if (useFull || hasSdi) {
    factors.push({ factor: 'sdi', value: sdiContrib, direction: sdiContrib >= 0 ? 'risk' : 'protective' });
  }
  if (useFull || hasUacr) {
    factors.push({ factor: 'uacr', value: uacrContrib, direction: uacrContrib >= 0 ? 'risk' : 'protective' });
  }
  if (useFull || hasHba1c) {
    factors.push({ factor: 'hba1c', value: hba1cContrib, direction: hba1cContrib >= 0 ? 'risk' : 'protective' });
  }

  // Filter out zero-contribution factors and sort by absolute value
  return factors
    .filter(f => Math.abs(f.value) > 0.001)
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
}
