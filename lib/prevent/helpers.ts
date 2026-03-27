/** Convert mg/dL cholesterol to mmol/L */
export function mmolConversion(cholesterol: number): number {
  return 0.02586 * cholesterol;
}

/** Clamp UACR to min 0.1 to prevent log(0) */
export function adjust(uacr: number): number {
  if (uacr >= 0.1) return uacr;
  return 0.1;
}

/** Convert SDI decile (1-10) to tertile (0,1,2) */
export function sdicat(sdi: number): number {
  if (sdi > 0 && sdi < 4) return 0;
  if (sdi >= 4 && sdi < 7) return 1;
  if (sdi >= 7 && sdi <= 10) return 2;
  return 0;
}

/** Sigmoid function: 100 * exp(x) / (1 + exp(x)) */
export function sigmoid100(logor: number): number {
  return 100 * Math.exp(logor) / (1 + Math.exp(logor));
}
