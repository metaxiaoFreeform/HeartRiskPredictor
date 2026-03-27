export interface PreventInput {
  sex: 0 | 1;
  age: number;
  tc: number;
  hdl: number;
  sbp: number;
  dm: 0 | 1;
  smoking: 0 | 1;
  bmi?: number;
  egfr: number;
  bptreat: 0 | 1;
  statin: 0 | 1;
  uacr?: number;
  hba1c?: number;
  sdi?: number;
}

export type ModelType = 'base' | 'uacr' | 'hba1c' | 'sdi' | 'full';
export type Outcome = 'cvd' | 'ascvd' | 'hf';
export type TimeHorizon = '10yr' | '30yr';

export interface PreventOutput {
  model: ModelType;
  tenYear: { cvd: number | null; ascvd: number | null; hf: number | null };
  thirtyYear: { cvd: number | null; ascvd: number | null; hf: number | null };
  warnings: string[];
}
