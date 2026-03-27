import { PreventInput, PreventOutput, ModelType } from './types';
import { mmolConversion, adjust, sdicat, sigmoid100 } from './helpers';

function selectModel(input: PreventInput): ModelType {
  const hasUacr = input.uacr !== undefined && input.uacr !== null;
  const hasHba1c = input.hba1c !== undefined && input.hba1c !== null;
  const hasSdi = input.sdi !== undefined && input.sdi !== null;
  const count = [hasUacr, hasHba1c, hasSdi].filter(Boolean).length;
  if (count === 0) return 'base';
  if (count >= 2) return 'full';
  if (hasUacr) return 'uacr';
  if (hasHba1c) return 'hba1c';
  return 'sdi';
}

// ─── BASE MODEL ───────────────────────────────────────────────────────────
function calcBaseLogors(input: PreventInput): Record<string, number> {
  const { sex, age, tc, hdl, sbp, dm, smoking, bmi, egfr, bptreat, statin } = input;
  const ageC = (age - 55) / 10;
  const nonHdl_cvd = mmolConversion(tc - hdl) - 3.5;
  const nonHdl_ascvd = (mmolConversion(tc) - mmolConversion(hdl)) - 3.5;
  const hdlC = (mmolConversion(hdl) - 1.3) / 0.3;
  const sbpLow = (Math.min(sbp, 110) - 110) / 20;
  const sbpHigh = (Math.max(sbp, 110) - 130) / 20;
  const egfrLow = (Math.min(egfr, 60) - 60) / (-15);
  const egfrHigh = (Math.max(egfr, 60) - 90) / (-15);
  const bmiVal = bmi ?? 25;
  const bmiLow = (Math.min(bmiVal, 30) - 25) / 5;
  const bmiHigh = (Math.max(bmiVal, 30) - 30) / 5;

  const r: Record<string, number> = {};

  if (sex === 1) { // female
    r['10yr_cvd'] = -3.307728+0.7939329*ageC+0.0305239*nonHdl_cvd-0.1606857*hdlC-0.2394003*sbpLow+0.360078*sbpHigh+0.8667604*dm+0.5360739*smoking+0.6045917*egfrLow+0.0433769*egfrHigh+0.3151672*bptreat-0.1477655*statin-0.0663612*bptreat*sbpHigh+0.1197879*statin*nonHdl_cvd-0.0819715*ageC*nonHdl_cvd+0.0306769*ageC*hdlC-0.0946348*ageC*sbpHigh-0.27057*ageC*dm-0.078715*ageC*smoking-0.1637806*ageC*egfrLow;
    r['30yr_cvd'] = -1.318827+0.5503079*ageC-0.0928369*(ageC**2)+0.0409794*nonHdl_cvd+(-0.1663306)*hdlC+(-0.1628654)*sbpLow+0.3299505*sbpHigh+0.6793894*dm+0.3196112*smoking+0.1857101*egfrLow+0.0553528*egfrHigh+0.2894*bptreat+(-0.075688)*statin+(-0.056367)*bptreat*sbpHigh+(0.1071019)*statin*nonHdl_cvd+(-0.0751438)*ageC*nonHdl_cvd+(0.0301786)*ageC*hdlC+(-0.0998776)*ageC*sbpHigh+(-0.3206166)*ageC*dm+(-0.1607862)*ageC*smoking+(-0.1450788)*ageC*egfrLow;
    r['10yr_ascvd'] = -3.819975+0.719883*ageC+0.1176967*nonHdl_ascvd-0.151185*hdlC-0.0835358*sbpLow+0.3592852*sbpHigh+0.8348585*dm+0.4831078*smoking+0.4864619*egfrLow+0.0397779*egfrHigh+0.2265309*bptreat-0.0592374*statin-0.0395762*bptreat*sbpHigh+0.0844423*statin*nonHdl_ascvd-0.0567839*ageC*nonHdl_ascvd+0.0325692*ageC*hdlC-0.1035985*ageC*sbpHigh-0.2417542*ageC*dm-0.0791142*ageC*smoking-0.1671492*ageC*egfrLow;
    r['30yr_ascvd'] = -1.974074+0.4669202*ageC-0.0893118*(ageC**2)+0.1256901*nonHdl_ascvd-0.1542255*hdlC-0.0018093*sbpLow+0.322949*sbpHigh+0.6296707*dm+0.268292*smoking+0.100106*egfrLow+0.0499663*egfrHigh+0.1875292*bptreat+0.0152476*statin-0.0276123*bptreat*sbpHigh+0.0736147*statin*nonHdl_ascvd-0.0521962*ageC*nonHdl_ascvd+0.0316918*ageC*hdlC-0.1046101*ageC*sbpHigh-0.2727793*ageC*dm-0.1530907*ageC*smoking-0.1299149*ageC*egfrLow;
    r['10yr_hf'] = -4.310409+0.8998235*ageC-0.4559771*sbpLow+0.3576505*sbpHigh+1.038346*dm+0.583916*smoking-0.0072294*bmiLow+0.2997706*bmiHigh+0.7451638*egfrLow+0.0557087*egfrHigh+0.3534442*bptreat-0.0981511*bptreat*sbpHigh-0.0946663*ageC*sbpHigh-0.3581041*ageC*dm-0.1159453*ageC*smoking-0.003878*ageC*bmiHigh-0.1884289*ageC*egfrLow;
    r['30yr_hf'] = -2.205379+0.6254374*ageC-0.0983038*(ageC**2)-0.3919241*sbpLow+0.3142295*sbpHigh+0.8330787*dm+0.3438651*smoking+0.0594874*bmiLow+0.2525536*bmiHigh+0.2981642*egfrLow+0.0667159*egfrHigh+0.333921*bptreat-0.0893177*bptreat*sbpHigh-0.0974299*ageC*sbpHigh-0.404855*ageC*dm-0.1982991*ageC*smoking-0.0035619*ageC*bmiHigh-0.1564215*ageC*egfrLow;
  } else { // male
    r['10yr_cvd'] = -3.031168+0.7688528*ageC+0.0736174*nonHdl_cvd-0.0954431*hdlC-0.4347345*sbpLow+0.3362658*sbpHigh+0.7692857*dm+0.4386871*smoking+0.5378979*egfrLow+0.0164827*egfrHigh+0.288879*bptreat-0.1337349*statin-0.0475924*bptreat*sbpHigh+0.150273*statin*nonHdl_cvd-0.0517874*ageC*nonHdl_cvd+0.0191169*ageC*hdlC-0.1049477*ageC*sbpHigh-0.2251948*ageC*dm-0.0895067*ageC*smoking-0.1543702*ageC*egfrLow;
    r['30yr_cvd'] = -1.148204+0.4627309*ageC-0.0984281*(ageC**2)+0.0836088*nonHdl_cvd+(-0.1029824)*hdlC+(-0.2140352)*sbpLow+0.2904325*sbpHigh+0.5331276*dm+0.2141914*smoking+0.1155556*egfrLow+0.0603775*egfrHigh+0.232714*bptreat+(-0.0272112)*statin+(-0.0384488)*bptreat*sbpHigh+(0.134192)*statin*nonHdl_cvd+(-0.0511759)*ageC*nonHdl_cvd+0.0165865*ageC*hdlC+(-0.1101437)*ageC*sbpHigh+(-0.2585943)*ageC*dm+(-0.1566406)*ageC*smoking+(-0.1166776)*ageC*egfrLow;
    r['10yr_ascvd'] = -3.500655+0.7099847*ageC+0.1658663*nonHdl_ascvd-0.1144285*hdlC-0.2837212*sbpLow+0.3239977*sbpHigh+0.7189597*dm+0.3956973*smoking+0.3690075*egfrLow+0.0203619*egfrHigh+0.2036522*bptreat-0.0865581*statin-0.0322916*bptreat*sbpHigh+0.114563*statin*nonHdl_ascvd-0.0300005*ageC*nonHdl_ascvd+0.0232747*ageC*hdlC-0.0927024*ageC*sbpHigh-0.2018525*ageC*dm-0.0970527*ageC*smoking-0.1217081*ageC*egfrLow;
    r['30yr_ascvd'] = -1.736444+0.3994099*ageC-0.0937484*(ageC**2)+0.1744643*nonHdl_ascvd-0.120203*hdlC-0.0665117*sbpLow+0.2753037*sbpHigh+0.4790257*dm+0.1782635*smoking-0.0218789*egfrLow+0.0602553*egfrHigh+0.1421182*bptreat+0.0135996*statin-0.0218265*bptreat*sbpHigh+0.1013148*statin*nonHdl_ascvd-0.0312619*ageC*nonHdl_ascvd+0.020673*ageC*hdlC-0.0920935*ageC*sbpHigh-0.2159947*ageC*dm-0.1548811*ageC*smoking-0.0712547*ageC*egfrLow;
    r['10yr_hf'] = -3.946391+0.8972642*ageC-0.6811466*sbpLow+0.3634461*sbpHigh+0.923776*dm+0.5023736*smoking-0.0485841*bmiLow+0.3726929*bmiHigh+0.6926917*egfrLow+0.0251827*egfrHigh+0.2980922*bptreat-0.0497731*bptreat*sbpHigh-0.1289201*ageC*sbpHigh-0.3040924*ageC*dm-0.1401688*ageC*smoking+0.0068126*ageC*bmiHigh-0.1797778*ageC*egfrLow;
    r['30yr_hf'] = -1.95751+0.5681541*ageC-0.1048388*(ageC**2)-0.4761564*sbpLow+0.30324*sbpHigh+0.6840338*dm+0.2656273*smoking+0.0833107*bmiLow+0.26999*bmiHigh+0.2541805*egfrLow+0.0638923*egfrHigh+0.2583631*bptreat-0.0391938*bptreat*sbpHigh-0.1269124*ageC*sbpHigh-0.3273572*ageC*dm-0.2043019*ageC*smoking-0.0182831*ageC*bmiHigh-0.1342618*ageC*egfrLow;
  }
  return r;
}

// ─── FULL MODEL ───────────────────────────────────────────────────────────
function calcFullLogors(input: PreventInput): Record<string, number> {
  const { sex, age, tc, hdl, sbp, dm, smoking, bmi, egfr, bptreat, statin, uacr, hba1c, sdi } = input;
  const ageC = (age - 55) / 10;
  const nonHdl_cvd = mmolConversion(tc - hdl) - 3.5;
  const nonHdl_ascvd = (mmolConversion(tc) - mmolConversion(hdl)) - 3.5;
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

  const r: Record<string, number> = {};

  if (sex === 1) { // female
    r['10yr_cvd'] = -3.860385+0.7716794*ageC+0.0062109*nonHdl_cvd-0.1547756*hdlC-0.1933123*sbpLow+0.3071217*sbpHigh+0.496753*dm+0.466605*smoking+0.4780697*egfrLow+0.0529077*egfrHigh+0.3034892*bptreat-0.1556524*statin-0.0667026*bptreat*sbpHigh+0.1061825*statin*nonHdl_cvd-0.0742271*ageC*nonHdl_cvd+0.0288245*ageC*hdlC-0.0875188*ageC*sbpHigh-0.2267102*ageC*dm-0.0676125*ageC*smoking-0.1493231*ageC*egfrLow+(hasSdi?(0.1361989*(2-sdicat(sdi!))*(sdicat(sdi!))+0.2261596*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1804508)+(hasUacr?0.1645922*Math.log(adjust(uacr!)):0.0198413)+(hasHba1c?(0.1298513*(hba1c!-5.3)*dm+0.1412555*(hba1c!-5.3)*(1-dm)):-0.0031658);
    r['10yr_ascvd'] = -4.291503+0.7023067*ageC+0.0898765*nonHdl_ascvd-0.1407316*hdlC-0.0256648*sbpLow+0.314511*sbpHigh+0.4799217*dm+0.4062049*smoking+0.3847744*egfrLow+0.0495174*egfrHigh+0.2133861*bptreat-0.0678552*statin-0.0451416*bptreat*sbpHigh+0.0788187*statin*nonHdl_ascvd-0.0535985*ageC*nonHdl_ascvd+0.0291762*ageC*hdlC-0.0961839*ageC*sbpHigh-0.2001466*ageC*dm-0.0586472*ageC*smoking-0.1537791*ageC*egfrLow+(hasSdi?(0.1413965*(2-sdicat(sdi!))*(sdicat(sdi!))+0.228136*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1588908)+(hasUacr?0.1371824*Math.log(adjust(uacr!)):0.0061613)+(hasHba1c?(0.123192*(hba1c!-5.3)*dm+0.1410572*(hba1c!-5.3)*(1-dm)):0.005866);
    r['10yr_hf'] = -4.896524+0.884209*ageC-0.421474*sbpLow+0.3002919*sbpHigh+0.6170359*dm+0.5380269*smoking-0.0191335*bmiLow+0.2764302*bmiHigh+0.5975847*egfrLow+0.0654197*egfrHigh+0.3313614*bptreat-0.1002304*bptreat*sbpHigh-0.0845363*ageC*sbpHigh-0.2989062*ageC*dm-0.1111354*ageC*smoking+0.0008104*ageC*bmiHigh-0.1666635*ageC*egfrLow+(hasSdi?(0.1213034*(2-sdicat(sdi!))*(sdicat(sdi!))+0.2314147*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1819138)+(hasUacr?0.1948135*Math.log(adjust(uacr!)):0.0395368)+(hasHba1c?(0.176668*(hba1c!-5.3)*dm+0.1614911*(hba1c!-5.3)*(1-dm)):-0.0010583);
    r['30yr_cvd'] = -1.748475+0.5073749*ageC-0.0981751*(ageC**2)+0.0162303*nonHdl_cvd-0.1617147*hdlC-0.1111241*sbpLow+0.282946*sbpHigh+0.4004069*dm+0.2918701*smoking+0.1017102*egfrLow+0.0622643*egfrHigh+0.2872416*bptreat-0.0768135*statin-0.0557282*bptreat*sbpHigh+0.0917585*statin*nonHdl_cvd-0.0679131*ageC*nonHdl_cvd+0.029076*ageC*hdlC-0.0907755*ageC*sbpHigh-0.2702118*ageC*dm-0.1373216*ageC*smoking-0.1255864*ageC*egfrLow+(hasSdi?(0.1067741*(2-sdicat(sdi!))*(sdicat(sdi!))+0.1853138*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1567115)+(hasUacr?0.1028065*Math.log(adjust(uacr!)):-0.0006181)+(hasHba1c?(0.0925285*(hba1c!-5.3)*dm+0.0975598*(hba1c!-5.3)*(1-dm)):0.0101713);
    r['30yr_ascvd'] = -2.314066+0.4386739*ageC-0.0921956*(ageC**2)+0.0977728*nonHdl_ascvd-0.1453525*hdlC+0.0590925*sbpLow+0.2862862*sbpHigh+0.3669136*dm+0.2354695*smoking+0.0354338*egfrLow+0.0573093*egfrHigh+0.1840085*bptreat+0.0117504*statin-0.0331945*bptreat*sbpHigh+0.0664311*statin*nonHdl_ascvd-0.0492826*ageC*nonHdl_ascvd+0.0288888*ageC*hdlC-0.0964709*ageC*sbpHigh-0.2279648*ageC*dm-0.120405*ageC*smoking-0.1157635*ageC*egfrLow+(hasSdi?(0.1107632*(2-sdicat(sdi!))*(sdicat(sdi!))+0.1840367*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1308962)+(hasUacr?0.0810739*Math.log(adjust(uacr!)):-0.0147785)+(hasHba1c?(0.0794709*(hba1c!-5.3)*dm+0.1002615*(hba1c!-5.3)*(1-dm)):0.017301);
    r['30yr_hf'] = -2.642208+0.5927507*ageC-0.1028754*(ageC**2)-0.3593781*sbpLow+0.2628556*sbpHigh+0.5113472*dm+0.347344*smoking+0.0564656*bmiLow+0.2363857*bmiHigh+0.1971295*egfrLow+0.0735227*egfrHigh+0.3219386*bptreat-0.0880321*bptreat*sbpHigh-0.0863132*ageC*sbpHigh-0.3425359*ageC*dm-0.181405*ageC*smoking+0.0031285*ageC*bmiHigh-0.1356989*ageC*egfrLow+(hasSdi?(0.0847634*(2-sdicat(sdi!))*(sdicat(sdi!))+0.18397*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1485802)+(hasUacr?0.1273306*Math.log(adjust(uacr!)):0.0167008)+(hasHba1c?(0.1378342*(hba1c!-5.3)*dm+0.1138832*(hba1c!-5.3)*(1-dm)):0.0138979);
  } else { // male
    r['10yr_cvd'] = -3.631387+0.7847578*ageC+0.0534485*nonHdl_cvd-0.0911282*hdlC-0.4921973*sbpLow+0.2972415*sbpHigh+0.4527054*dm+0.3726641*smoking+0.3886854*egfrLow+0.0081661*egfrHigh+0.2508052*bptreat-0.1538484*statin-0.0474695*bptreat*sbpHigh+0.1415382*statin*nonHdl_cvd-0.0436455*ageC*nonHdl_cvd+0.0199549*ageC*hdlC-0.1022686*ageC*sbpHigh-0.1762507*ageC*dm-0.0715873*ageC*smoking-0.1428668*ageC*egfrLow+(hasSdi?(0.0802431*(2-sdicat(sdi!))*(sdicat(sdi!))+0.275073*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.144759)+(hasUacr?0.1772853*Math.log(adjust(uacr!)):0.1095674)+(hasHba1c?(0.1165698*(hba1c!-5.3)*dm+0.1048297*(hba1c!-5.3)*(1-dm)):-0.0230072);
    r['10yr_ascvd'] = -3.969788+0.7128741*ageC+0.1465201*nonHdl_ascvd-0.1125794*hdlC-0.3387216*sbpLow+0.2980252*sbpHigh+0.399583*dm+0.3379111*smoking+0.2582604*egfrLow+0.0147769*egfrHigh+0.1686621*bptreat-0.1073619*statin-0.0381038*bptreat*sbpHigh+0.1034169*statin*nonHdl_ascvd-0.0228755*ageC*nonHdl_ascvd+0.0267453*ageC*hdlC-0.0897449*ageC*sbpHigh-0.1497464*ageC*dm-0.077206*ageC*smoking-0.1198368*ageC*egfrLow+(hasSdi?(0.0651121*(2-sdicat(sdi!))*(sdicat(sdi!))+0.2676683*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1388492)+(hasUacr?0.1375837*Math.log(adjust(uacr!)):0.0652944)+(hasHba1c?(0.101282*(hba1c!-5.3)*dm+0.1092726*(hba1c!-5.3)*(1-dm)):-0.0112852);
    r['10yr_hf'] = -4.663513+0.9095703*ageC-0.6765184*sbpLow+0.3111651*sbpHigh+0.5535052*dm+0.4326811*smoking-0.0854286*bmiLow+0.3551736*bmiHigh+0.5102245*egfrLow+0.015472*egfrHigh+0.2570964*bptreat-0.0591177*bptreat*sbpHigh-0.1219056*ageC*sbpHigh-0.2437577*ageC*dm-0.105363*ageC*smoking+0.0037907*ageC*bmiHigh-0.1660207*ageC*egfrLow+(hasSdi?(0.1106372*(2-sdicat(sdi!))*(sdicat(sdi!))+0.3371204*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1694628)+(hasUacr?0.2164607*Math.log(adjust(uacr!)):0.1702805)+(hasHba1c?(0.148297*(hba1c!-5.3)*dm+0.1234088*(hba1c!-5.3)*(1-dm)):-0.0234637);
    r['30yr_cvd'] = -1.504558+0.4427595*ageC-0.1064108*(ageC**2)+0.0629381*nonHdl_cvd-0.1015427*hdlC-0.2542326*sbpLow+0.2549679*sbpHigh+0.333835*dm+0.1873833*smoking+0.0246102*egfrLow+0.0552014*egfrHigh+0.1979729*bptreat-0.0407714*statin-0.0365522*bptreat*sbpHigh+0.1232822*statin*nonHdl_cvd-0.0441334*ageC*nonHdl_cvd+0.0177865*ageC*hdlC-0.1046657*ageC*sbpHigh-0.2116113*ageC*dm-0.1277905*ageC*smoking-0.0955922*ageC*egfrLow+(hasSdi?(0.0256704*(2-sdicat(sdi!))*(sdicat(sdi!))+0.1887637*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.089241)+(hasUacr?0.0894596*Math.log(adjust(uacr!)):0.0710124)+(hasHba1c?(0.0676202*(hba1c!-5.3)*dm+0.063409*(hba1c!-5.3)*(1-dm)):0.0038783);
    r['30yr_ascvd'] = -1.985368+0.3743566*ageC-0.0995499*(ageC**2)+0.1544808*nonHdl_ascvd-0.1215297*hdlC-0.1083968*sbpLow+0.2555179*sbpHigh+0.2696998*dm+0.1628432*smoking-0.077507*egfrLow+0.0583407*egfrHigh+0.1120322*bptreat-0.0025063*statin-0.0256116*bptreat*sbpHigh+0.0886745*statin*nonHdl_ascvd-0.0254507*ageC*nonHdl_ascvd+0.0244639*ageC*hdlC-0.0869146*ageC*sbpHigh-0.165745*ageC*dm-0.1244714*ageC*smoking-0.0624552*ageC*egfrLow+(hasSdi?(0.015675*(2-sdicat(sdi!))*(sdicat(sdi!))+0.1864231*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.0845697)+(hasUacr?0.0560171*Math.log(adjust(uacr!)):0.0252244)+(hasHba1c?(0.0501422*(hba1c!-5.3)*dm+0.0722905*(hba1c!-5.3)*(1-dm)):0.0114945);
    r['30yr_hf'] = -2.425439+0.5478829*ageC-0.1111928*(ageC**2)-0.4547346*sbpLow+0.2527602*sbpHigh+0.4385384*dm+0.2397952*smoking+0.0640931*bmiLow+0.2643081*bmiHigh+0.1354588*egfrLow+0.0570689*egfrHigh+0.220666*bptreat-0.0436769*bptreat*sbpHigh-0.1168376*ageC*sbpHigh-0.2730055*ageC*dm-0.1573691*ageC*smoking-0.0174998*ageC*bmiHigh-0.1128676*ageC*egfrLow+(hasSdi?(0.057746*(2-sdicat(sdi!))*(sdicat(sdi!))+0.2446441*(sdicat(sdi!)-1)*(0.5*sdicat(sdi!))):0.1076782)+(hasUacr?0.1233486*Math.log(adjust(uacr!)):0.1274796)+(hasHba1c?(0.0985062*(hba1c!-5.3)*dm+0.0804844*(hba1c!-5.3)*(1-dm)):0.0022806);
  }
  return r;
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────
export function calculatePreventRisk(input: PreventInput): PreventOutput {
  const model = selectModel(input);
  const warnings: string[] = [];

  // Choose calculation function
  const logors = model === 'base' ? calcBaseLogors(input) : calcFullLogors(input);

  // Convert logors to probabilities
  let tenCvd: number | null = sigmoid100(logors['10yr_cvd']);
  let tenAscvd: number | null = sigmoid100(logors['10yr_ascvd']);
  let tenHf: number | null = sigmoid100(logors['10yr_hf']);
  let thirtyCvd: number | null = sigmoid100(logors['30yr_cvd']);
  let thirtyAscvd: number | null = sigmoid100(logors['30yr_ascvd']);
  let thirtyHf: number | null = sigmoid100(logors['30yr_hf']);

  // ─── Validation: apply N/A rules per R source ───
  const { age, tc, hdl, sbp, bmi, egfr, statin, uacr, hba1c, sdi } = input;

  // Age constraints
  if (age > 59 && age <= 79) {
    thirtyCvd = thirtyAscvd = thirtyHf = null;
    warnings.push('age>59');
  } else if (age < 30 || age > 79) {
    tenCvd = tenAscvd = tenHf = thirtyCvd = thirtyAscvd = thirtyHf = null;
    warnings.push('age_out_of_range');
  }

  // TC/HDL constraints → CVD/ASCVD only
  if (tc < 130 || tc > 320) {
    tenCvd = tenAscvd = thirtyCvd = thirtyAscvd = null;
    warnings.push('tc_out_of_range');
  }
  if (hdl < 20 || hdl > 100) {
    tenCvd = tenAscvd = thirtyCvd = thirtyAscvd = null;
    warnings.push('hdl_out_of_range');
  }

  // SBP constraint → all
  if (sbp < 90 || sbp > 200) {
    tenCvd = tenAscvd = tenHf = thirtyCvd = thirtyAscvd = thirtyHf = null;
    warnings.push('sbp_out_of_range');
  }

  // eGFR constraint → all
  if (egfr <= 0) {
    tenCvd = tenAscvd = tenHf = thirtyCvd = thirtyAscvd = thirtyHf = null;
    warnings.push('egfr_invalid');
  }

  // Statin constraint → CVD/ASCVD only
  if (statin !== 0 && statin !== 1) {
    tenCvd = tenAscvd = thirtyCvd = thirtyAscvd = null;
    warnings.push('statin_invalid');
  }

  // BMI constraint → HF only
  if (bmi === undefined || bmi === null || bmi < 18.5 || bmi >= 40) {
    tenHf = thirtyHf = null;
    warnings.push('bmi_invalid_for_hf');
  }

  // Optional variable constraints (only when provided)
  if (uacr !== undefined && uacr !== null && uacr < 0) {
    tenCvd = tenAscvd = tenHf = thirtyCvd = thirtyAscvd = thirtyHf = null;
    warnings.push('uacr_negative');
  }
  if (hba1c !== undefined && hba1c !== null && hba1c <= 0) {
    tenCvd = tenAscvd = tenHf = thirtyCvd = thirtyAscvd = thirtyHf = null;
    warnings.push('hba1c_invalid');
  }

  return {
    model,
    tenYear: { cvd: tenCvd, ascvd: tenAscvd, hf: tenHf },
    thirtyYear: { cvd: thirtyCvd, ascvd: thirtyAscvd, hf: thirtyHf },
    warnings,
  };
}
