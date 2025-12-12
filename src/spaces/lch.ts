import { ColorObject, ParseResult } from "../core/types";
import { labToRgb, rgbToLab } from "./lab";

export function parseLch(input: string): ParseResult {
  const match = input.match(
    /^lch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
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
    alpha: alpha ? parseFloat(alpha) : 1,
  };
}

export function serializeLch(color: ColorObject): string {
  const [l, c, h] = color.coords.map((v) => Math.round(v * 1000) / 1000); // Rounding
  const alpha = color.alpha;
  return alpha < 1 ? `lch(${l} ${c} ${h} / ${alpha})` : `lch(${l} ${c} ${h})`;
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
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return {
    space: "lch",
    coords: [l, c, h],
    alpha: color.alpha,
  };
}
