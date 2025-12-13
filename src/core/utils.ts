export const R_DECIMAL = /\.\d+/g;

export function getPrecision(input: string): number {
  return (input.match(R_DECIMAL) || []).length > 0
    ? Math.max(...(input.match(R_DECIMAL) || []).map((m) => m.length - 1))
    : 0;
}

export function clampRgb(v: number): number {
  return Math.min(255, Math.max(0, v));
}

export function clampAlpha(a: number): number {
  return Math.min(1, Math.max(0, a));
}

export function snapToInt(v: number): number {
  const rounded = Math.round(v);
  return Math.abs(v - rounded) < 0.01 ? rounded : v;
}
