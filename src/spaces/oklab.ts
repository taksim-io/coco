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

export function parseOklab(input: string): ParseResult {
  const match = input.match(
    /^oklab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
  if (!match) return undefined;

  const [_, l, a, b, alpha] = match;
  let L = parseFloat(l);
  if (match[1].endsWith("%")) L /= 100;

  return {
    space: "oklab",
    coords: [L, parseFloat(a), parseFloat(b)],
    alpha: alpha ? parseFloat(alpha) : 1,
    meta: {
      precision:
        (input.match(/\.\d+/g) || []).length > 0
          ? Math.max(...(input.match(/\.\d+/g) || []).map((m) => m.length - 1))
          : 0,
    },
  };
}

export function serializeOklab(color: ColorObject): string {
  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);
  const [l, a, b] = color.coords;
  const L = Math.round(l * factor) / factor;
  const A = Math.round(a * factor) / factor;
  const B = Math.round(b * factor) / factor;
  const Alpha = Math.round(color.alpha * 1000) / 1000;

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
  const Chroma = Math.sqrt(a * a + b * b);
  const threshold = Chroma > 0.01 ? 0.003 : 0.0001;
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
