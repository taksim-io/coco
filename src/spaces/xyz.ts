import { ColorObject, ParseResult } from "../core/types";
import {
  M_SRGB_TO_XYZ_D65,
  M_XYZ_D65_TO_SRGB,
  gam_sRGB,
  lin_sRGB,
  mul3x3,
} from "../core/math";

export function parseXyz(input: string): ParseResult {
  const match = input.match(
    /^color\(xyz\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\)$/i
  );
  if (!match) return undefined;

  const [_, x, y, z, a] = match;
  return {
    space: "xyz",
    coords: [parseFloat(x), parseFloat(y), parseFloat(z)],
    alpha: a ? parseFloat(a) : 1,
    meta: {
      precision:
        (input.match(/\.\d+/g) || []).length > 0
          ? Math.max(...(input.match(/\.\d+/g) || []).map((m) => m.length - 1))
          : 0,
    },
  };
}

export function serializeXyz(color: ColorObject): string {
  const prec = color.meta?.precision ?? 4;
  const factor = Math.pow(10, prec);
  const [x, y, z] = color.coords.map((v) => Math.round(v * factor) / factor);
  const a = color.alpha;
  return a < 1
    ? `color(xyz ${x} ${y} ${z} / ${a})`
    : `color(xyz ${x} ${y} ${z})`;
}

export function xyzToRgb(color: ColorObject): ColorObject {
  const xyz = color.coords;
  const linRGB = mul3x3(M_XYZ_D65_TO_SRGB, xyz as [number, number, number]);
  const sRGB = gam_sRGB(linRGB);
  return {
    space: "rgb",
    coords: sRGB,
    alpha: color.alpha,
  };
}

export function rgbToXyz(color: ColorObject): ColorObject {
  const linRGB = lin_sRGB(color.coords);
  const xyz = mul3x3(M_SRGB_TO_XYZ_D65, linRGB);
  return {
    space: "xyz",
    coords: xyz,
    alpha: color.alpha,
  };
}
