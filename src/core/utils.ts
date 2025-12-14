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

export function normalizeHex(hex: string): string {
  const normalized = hex.toLowerCase().replace("#", "");

  if (normalized.length === 3 || normalized.length === 4) {
    return normalized
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (normalized.length === 8 && normalized.endsWith("ff")) {
    return normalized.slice(0, 6);
  }

  return normalized;
}

export function reverseNamedColors(
  namedColors: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(namedColors).map(([key, value]) => [
      normalizeHex(value),
      key,
    ])
  );
}

export function smartQuantize(
  coords: [number, number, number],
  prec: number,
  getRgb: (c1: number, c2: number, c3: number) => number[]
): [number, number, number] {
  const [c1, c2, c3] = coords;
  const factor = Math.pow(10, prec);

  let C1 = Math.round(c1 * factor) / factor;
  let C2 = Math.round(c2 * factor) / factor;
  let C3 = Math.round(c3 * factor) / factor;

  const targetRgb = getRgb(c1, c2, c3);
  const currentRgb = getRgb(C1, C2, C3);

  if (
    currentRgb[0] !== targetRgb[0] ||
    currentRgb[1] !== targetRgb[1] ||
    currentRgb[2] !== targetRgb[2]
  ) {
    let found = false;

    // Search neighborhood at current precision
    for (let d1 = -2; d1 <= 2; d1++) {
      for (let d2 = -2; d2 <= 2; d2++) {
        for (let d3 = -2; d3 <= 2; d3++) {
          if (d1 === 0 && d2 === 0 && d3 === 0) continue;

          const val1 = Math.round((c1 + d1 / factor) * factor) / factor;
          const val2 = Math.round((c2 + d2 / factor) * factor) / factor;
          const val3 = Math.round((c3 + d3 / factor) * factor) / factor;

          const candidateRgb = getRgb(val1, val2, val3);

          if (
            candidateRgb[0] === targetRgb[0] &&
            candidateRgb[1] === targetRgb[1] &&
            candidateRgb[2] === targetRgb[2]
          ) {
            C1 = val1;
            C2 = val2;
            C3 = val3;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }

    // Adaptive Precision: If 3-decimal search failed, try 4-decimal
    if (!found && prec === 3) {
      const factor4 = 10000;
      for (let d1 = -2; d1 <= 2; d1++) {
        for (let d2 = -2; d2 <= 2; d2++) {
          for (let d3 = -2; d3 <= 2; d3++) {
            const val1 = Math.round((c1 + d1 / factor4) * factor4) / factor4;
            const val2 = Math.round((c2 + d2 / factor4) * factor4) / factor4;
            const val3 = Math.round((c3 + d3 / factor4) * factor4) / factor4;

            const candidateRgb = getRgb(val1, val2, val3);

            if (
              candidateRgb[0] === targetRgb[0] &&
              candidateRgb[1] === targetRgb[1] &&
              candidateRgb[2] === targetRgb[2]
            ) {
              C1 = val1;
              C2 = val2;
              C3 = val3;
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }
    }
  }

  return [C1, C2, C3];
}
