export type Region =
  | "China"
  | "North America/Europe"
  | "Overall"
  | "South Asia"
  | "Southeast Asia"
  | "Middle East"
  | "South America"
  | "Africa";

export const regionFollowUpYears: Record<Region, number> = {
  "South Asia": 7,
  "China": 4,
  "Southeast Asia": 4,
  "Africa": 5,
  "North America/Europe": 6,
  "Middle East": 6,
  "South America": 5,
  "Overall": 5,
};

export interface NL_IHRS_Data {
  ageSex: number; // 2 or 0
  whr: number; // 0, 2, or 4
  hypertension: number; // 5 or 0
  diabetes: number; // 6 or 0
  familyHistory: number; // 4 or 0
  smoking: number; // 0, 2, 4, 6, 7, 11
  secondhandSmoke: number; // 2 or 0
  stress: number; // 3 or 0
  depression: number; // 3 or 0
  saltyFood: number; // 1 or 0
  friedFood: number; // 1 or 0
  fruit: number; // 1 or 0
  vegetables: number; // 1 or 0
  meat: number; // 2 or 0
  physicalActivity: number; // 2 or 0
}

const regionParams: Record<Region, { alpha: number; beta: number }> = {
  "China": { alpha: -4.06, beta: 0.81 },
  "North America/Europe": { alpha: -3.7, beta: 0.77 },
  "Overall": { alpha: -3.85, beta: 0.77 },
  "South Asia": { alpha: -3.03, beta: 0.75 },
  "Southeast Asia": { alpha: -4.17, beta: 0.92 },
  "Middle East": { alpha: -4.0, beta: 1.06 },
  "South America": { alpha: -4.43, beta: 0.87 },
  "Africa": { alpha: -3.27, beta: 0.75 },
};

export function calculateCVDRisk(data: NL_IHRS_Data, region: Region): number {
  const safeNum = (val: number) => isNaN(val) ? 0 : val;

  const totalPoints =
    safeNum(data.ageSex) +
    safeNum(data.whr) +
    safeNum(data.hypertension) +
    safeNum(data.diabetes) +
    safeNum(data.familyHistory) +
    safeNum(data.smoking) +
    safeNum(data.secondhandSmoke) +
    safeNum(data.stress) +
    safeNum(data.depression) +
    safeNum(data.saltyFood) +
    safeNum(data.friedFood) +
    safeNum(data.fruit) +
    safeNum(data.vegetables) +
    safeNum(data.meat) +
    safeNum(data.physicalActivity);

  const PI = -1.45 + 0.2875 * (totalPoints / 2);
  const { alpha, beta } = regionParams[region];

  const exponent = -(alpha + beta * PI);
  const probability = 1 / (1 + Math.exp(exponent));

  return probability * 100; // Return percentage
}

export function getAnnualRisk(probability: number, region: Region): number {
  return probability / regionFollowUpYears[region];
}

export function getRiskLevel(probability: number, region: Region): {
  label: string;
  color: string;
  key: string;
} {
  const years = regionFollowUpYears[region];
  const annualRisk = probability / years;

  if (annualRisk < 1) {
    return { label: "Low Risk", color: "text-green-600 bg-green-50 border-green-200", key: "low" };
  } else if (annualRisk <= 2) {
    return { label: "Moderate Risk", color: "text-yellow-600 bg-yellow-50 border-yellow-200", key: "moderate" };
  } else {
    return { label: "High Risk", color: "text-red-600 bg-red-50 border-red-200", key: "high" };
  }
}
