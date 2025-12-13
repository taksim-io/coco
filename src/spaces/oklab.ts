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
  const [l, a, b] = color.coords.map((v) => Math.round(v * factor) / factor);
  const alpha = color.alpha;
  return alpha < 1
    ? `oklab(${l} ${a} ${b} / ${alpha})`
    : `oklab(${l} ${a} ${b})`;
}

export function oklabToRgb(color: ColorObject): ColorObject {
  const [L, a, b] = color.coords;
  const alpha = color.alpha;

  // OKLAB to Linear RGB
  const lms_hat = mul3x3(OKLAB_M2_INV, [L, a, b]);
  const lms = lms_hat.map((v) => v * v * v) as Vector3;
  const linRGB = mul3x3(OKLAB_M1_INV, lms);

  // sRGB
  const srgb = gam_sRGB(linRGB);

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
