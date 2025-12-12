import { ColorObject, ParseResult } from "../core/types";
import {
  gam_sRGB,
  lin_sRGB,
  mul3x3,
  Vector3,
  OKLAB_M1,
  OKLAB_M1_INV,
  OKLAB_M2,
  OKLAB_M2_INV,
} from "../core/math";

export function parseOklch(input: string): ParseResult {
  const match = input.match(
    /^oklch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
  if (!match) return parseOklchRefined(input);

  return parseOklchRefined(input);
}

function parseOklchRefined(input: string): ParseResult {
  const match = input.match(
    /^oklch\(\s*([^\s\/,]+)[\s,]+([^\s\/,]+)[\s,]+([^\s\/,]+)(?:[\s\/,]+([^\s\)]+))?\s*\)$/i
  );
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
    alpha: Math.min(1, Math.max(0, a)),
  };
}

export function serializeOklch(color: ColorObject): string {
  const [l, c, h] = color.coords;
  const L = Math.round(l * 1000) / 1000;
  const C = Math.round(c * 1000) / 1000;
  const H = Math.round(h * 100) / 100;
  const A = color.alpha;

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

  // sRGB
  const srgb = gam_sRGB(linRGB);

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
  let Hue = Math.atan2(bTerm, aTerm) * (180 / Math.PI);
  if (Hue < 0) Hue += 360;

  return {
    space: "oklch",
    coords: [L, Chroma, Hue],
    alpha: color.alpha,
  };
}
