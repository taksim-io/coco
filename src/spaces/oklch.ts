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

const R_OKLCH =
  /^oklch\(\s*([^\s\/,]+)[\s,]+([^\s\/,]+)[\s,]+([^\s\/,]+)(?:[\s\/,]+([^\s\)]+))?\s*\)$/i;

export function parseOklch(input: string): ParseResult {
  const match = input.match(R_OKLCH);
  if (!match) return undefined;

  let l = parseFloat(match[1]);
  if (match[1].endsWith("%")) l /= 100;

  let c = parseFloat(match[2]);
  if (match[2].endsWith("%")) c = (c / 100) * 0.4;

  let h = parseFloat(match[3]);
  if (match[3].endsWith("rad")) h = (h * 180) / Math.PI;
  else if (match[3].endsWith("grad")) h = h * 0.9;
  else if (match[3].endsWith("turn")) h = h * 360;

  h = h % 360;
  if (h < 0) h += 360;

  const aStr = match[4];
  let a = 1;
  if (aStr) {
    a = parseFloat(aStr);
    if (aStr.endsWith("%")) a /= 100;
  }

  return {
    space: "oklch",
    coords: [l, c, h],
    alpha: clampAlpha(a),
    meta: { precision: getPrecision(input) },
  };
}

export function serializeOklch(color: ColorObject): string {
  const [l, c, h] = color.coords;
  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);

  // standard 3-decimal rounding
  let L = Math.round(l * factor) / factor;
  let C = Math.round(c * factor) / factor;
  let H = Math.round(h * factor) / factor;
  const A = Math.round(color.alpha * 1000) / 1000;
  const currentRgb = getRgb(L, C, H);
  const targetRgb = getRgb(l, c, h);

  // "Smart Quantization": Check if strict 3-decimal round-trip preserves the RGB int values.
  // If we came from an integer RGB, the "exact" OKLCH should point back to it.
  // We check if the 3-decimal approximation *also* points back to it.
  // If not, we search neighbors.

  if (
    currentRgb[0] !== targetRgb[0] ||
    currentRgb[1] !== targetRgb[1] ||
    currentRgb[2] !== targetRgb[2]
  ) {
    let found = false;
    // Search neighborhood at current precision
    for (let dl = -2; dl <= 2; dl++) {
      for (let dc = -2; dc <= 2; dc++) {
        for (let dh = -2; dh <= 2; dh++) {
          if (dl === 0 && dc === 0 && dh === 0) continue;

          const valL = Math.round((l + dl / factor) * factor) / factor;
          const valC = Math.round((c + dc / factor) * factor) / factor;
          const valH = Math.round((h + dh / factor) * factor) / factor;

          const candidateRgb = getRgb(valL, valC, valH);
          if (
            candidateRgb[0] === targetRgb[0] &&
            candidateRgb[1] === targetRgb[1] &&
            candidateRgb[2] === targetRgb[2]
          ) {
            L = valL;
            C = valC;
            H = valH;
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
        for (let dc = -2; dc <= 2; dc++) {
          for (let dh = -2; dh <= 2; dh++) {
            const valL = Math.round((l + dl / factor4) * factor4) / factor4;
            const valC = Math.round((c + dc / factor4) * factor4) / factor4;
            const valH = Math.round((h + dh / factor4) * factor4) / factor4;

            const candidateRgb = getRgb(valL, valC, valH);
            if (
              candidateRgb[0] === targetRgb[0] &&
              candidateRgb[1] === targetRgb[1] &&
              candidateRgb[2] === targetRgb[2]
            ) {
              L = valL;
              C = valC;
              H = valH;
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

  if (A < 1) {
    return `oklch(${L} ${C} ${H} / ${A})`;
  }
  return `oklch(${L} ${C} ${H})`;
}

export function oklchToRgb(color: ColorObject): ColorObject {
  const [l, c, h] = color.coords;
  const a = color.alpha;

  // Polar to Cartesian (OKLAB)
  const hRad = (h * Math.PI) / 180;
  const labL = l;
  const labA = c * Math.cos(hRad);
  const labB = c * Math.sin(hRad);

  // OKLAB to Linear RGB
  const lms_hat = mul3x3(OKLAB_M2_INV, [labL, labA, labB]);
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
    alpha: a,
  };
}

export function rgbToOklch(color: ColorObject): ColorObject {
  const [r, g, b] = color.coords;

  const linRGB = lin_sRGB([r, g, b]);
  const lms = mul3x3(OKLAB_M1, linRGB);
  const lms_hat = lms.map((v) => Math.cbrt(v)) as Vector3;
  const [L, aTerm, bTerm] = mul3x3(OKLAB_M2, lms_hat);

  const Chroma = Math.sqrt(aTerm * aTerm + bTerm * bTerm);
  let Hue: number;
  if (Chroma < 0.0001) {
    Hue = 0;
  } else {
    Hue = Math.atan2(bTerm, aTerm) * (180 / Math.PI);
    if (Hue < 0) Hue += 360;
  }

  return {
    space: "oklch",
    coords: [L, Chroma, Hue],
    alpha: color.alpha,
  };
}

function getRgb(l: number, c: number, h: number) {
  return oklchToRgb({
    space: "oklch",
    coords: [l, c, h],
    alpha: 1,
  }).coords.map((v) => Math.round(v));
}
