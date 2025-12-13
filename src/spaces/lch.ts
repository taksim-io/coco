import { ColorObject, ParseResult } from "../core/types";
import { clampAlpha, getPrecision } from "../core/utils";
import { labToRgb, rgbToLab } from "./lab";

const R_LCH =
  /^lch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i;

export function parseLch(input: string): ParseResult {
  const match = input.match(R_LCH);
  if (!match) return undefined;

  const [_, l, c, hStr, unit, alpha] = match;
  let h = parseFloat(hStr);
  if (unit === "rad") h = (h * 180) / Math.PI;
  else if (unit === "grad") h = h * 0.9;
  else if (unit === "turn") h = h * 360;

  h = h % 360;
  if (h < 0) h += 360;

  return {
    space: "lch",
    coords: [parseFloat(l), parseFloat(c), h],
    alpha: alpha ? clampAlpha(parseFloat(alpha)) : 1,
    meta: { precision: getPrecision(input) },
  };
}

export function serializeLch(color: ColorObject): string {
  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);
  const [l, c, h] = color.coords;
  const L = Math.round(l * factor) / factor;
  const C = Math.round(c * factor) / factor;
  const H = Math.round(h * factor) / factor;
  const A = Math.round(color.alpha * 1000) / 1000;

  if (A < 1) {
    return `lch(${L} ${C} ${H} / ${A})`;
  }
  return `lch(${L} ${C} ${H})`;
}

export function lchToRgb(color: ColorObject): ColorObject {
  const [l, c, h] = color.coords;
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  return labToRgb({
    space: "lab",
    coords: [l, a, b],
    alpha: color.alpha,
  });
}

export function rgbToLch(color: ColorObject): ColorObject {
  const lab = rgbToLab(color);
  const [l, a, b] = lab.coords;

  const c = Math.sqrt(a * a + b * b);
  let h: number;
  if (c < 0.0001) {
    h = 0;
  } else {
    h = (Math.atan2(b, a) * 180) / Math.PI;
    if (h < 0) h += 360;
  }

  return {
    space: "lch",
    coords: [l, c, h],
    alpha: color.alpha,
  };
}
