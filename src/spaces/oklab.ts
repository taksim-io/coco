import {
  gam_sRGB,
  lin_sRGB,
  mul3x3,
  OKLAB_M1,
  OKLAB_M1_INV,
  OKLAB_M2,
  OKLAB_M2_INV,
  Vector3,
} from "../core/math";
import { ColorObject, ParseResult } from "../core/types";
import { clampAlpha, getPrecision } from "../core/utils";

const R_OKLAB =
  /^oklab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i;

export function parseOklab(input: string): ParseResult {
  const match = input.match(R_OKLAB);
  if (!match) return undefined;

  const [_, l, a, b, alpha] = match;
  let L = parseFloat(l);
  if (match[1].endsWith("%")) L /= 100;

  return {
    space: "oklab",
    coords: [L, parseFloat(a), parseFloat(b)],
    alpha: alpha ? clampAlpha(parseFloat(alpha)) : 1,
    meta: { precision: getPrecision(input) },
  };
}

export function serializeOklab(color: ColorObject): string {
  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);
  const [l, a, b] = color.coords;
  let L = Math.round(l * factor) / factor;
  let A = Math.round(a * factor) / factor;
  let B = Math.round(b * factor) / factor;
  const Alpha = Math.round(color.alpha * 1000) / 1000;
  const currentRgb = getRgb(L, A, B);
  const targetRgb = getRgb(l, a, b);

  if (
    currentRgb[0] !== targetRgb[0] ||
    currentRgb[1] !== targetRgb[1] ||
    currentRgb[2] !== targetRgb[2]
  ) {
    let found = false;
    // Search neighborhood
    for (let dl = -2; dl <= 2; dl++) {
      for (let da = -2; da <= 2; da++) {
        for (let db = -2; db <= 2; db++) {
          if (dl === 0 && da === 0 && db === 0) continue;

          const valL = Math.round((l + dl / factor) * factor) / factor;
          const valA = Math.round((a + da / factor) * factor) / factor;
          const valB = Math.round((b + db / factor) * factor) / factor;

          const candidateRgb = getRgb(valL, valA, valB);

          if (
            candidateRgb[0] === targetRgb[0] &&
            candidateRgb[1] === targetRgb[1] &&
            candidateRgb[2] === targetRgb[2]
          ) {
            L = valL;
            A = valA;
            B = valB;
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
      for (let dl = -2; dl <= 2; dl++) {
        for (let da = -2; da <= 2; da++) {
          for (let db = -2; db <= 2; db++) {
            const valL = Math.round((l + dl / factor4) * factor4) / factor4;
            const valA = Math.round((a + da / factor4) * factor4) / factor4;
            const valB = Math.round((b + db / factor4) * factor4) / factor4;

            const candidateRgb = getRgb(valL, valA, valB);
            if (
              candidateRgb[0] === targetRgb[0] &&
              candidateRgb[1] === targetRgb[1] &&
              candidateRgb[2] === targetRgb[2]
            ) {
              L = valL;
              A = valA;
              B = valB;
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

  if (Alpha < 1) {
    return `oklab(${L} ${A} ${B} / ${Alpha})`;
  }
  return `oklab(${L} ${A} ${B})`;
}

export function oklabToRgb(color: ColorObject): ColorObject {
  const [L, a, b] = color.coords;
  const alpha = color.alpha;

  // OKLAB to Linear RGB
  const lms_hat = mul3x3(OKLAB_M2_INV, [L, a, b]);
  const lms = lms_hat.map((v) => v * v * v) as Vector3;
  const linRGB = mul3x3(OKLAB_M1_INV, lms);
  // Precise matrices are stable, so we only need a tiny threshold for epsilon noise
  const threshold = 0.0001;
  const snappedLin = linRGB.map((v) => {
    if (Math.abs(v) < threshold) return 0;
    if (Math.abs(v - 1) < threshold) return 1;
    return v;
  }) as [number, number, number];
  const srgb = gam_sRGB(snappedLin);

  return {
    space: "rgb",
    coords: srgb,
    alpha: alpha,
  };
}

export function rgbToOklab(color: ColorObject): ColorObject {
  const [r, g, b] = color.coords;

  const linRGB = lin_sRGB([r, g, b]);
  const lms = mul3x3(OKLAB_M1, linRGB);
  const lms_hat = lms.map((v) => Math.cbrt(v)) as Vector3;
  const lab = mul3x3(OKLAB_M2, lms_hat);

  return {
    space: "oklab",
    coords: lab,
    alpha: color.alpha,
  };
}

function getRgb(l: number, a: number, b: number) {
  return oklabToRgb({
    space: "oklab",
    coords: [l, a, b],
    alpha: 1,
  }).coords.map((v) => Math.round(v));
}
