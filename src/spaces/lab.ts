import { D50, M_D50_TO_D65, M_D65_TO_D50, mul3x3, Vector3 } from "../core/math";
import { ColorObject, ParseResult } from "../core/types";
import { rgbToXyz, xyzToRgb } from "./xyz";

const EPSILON = 216 / 24389; // 0.008856
const KAPPA = 24389 / 27; // 903.3

export function parseLab(input: string): ParseResult {
  const match = input.match(
    /^lab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\)$/i
  );
  if (!match) return undefined;

  const [_, l, a, b, alpha] = match;
  return {
    space: "lab",
    coords: [parseFloat(l), parseFloat(a), parseFloat(b)],
    alpha: alpha ? parseFloat(alpha) : 1,
    meta: {
      precision:
        (input.match(/\.\d+/g) || []).length > 0
          ? Math.max(...(input.match(/\.\d+/g) || []).map((m) => m.length - 1))
          : 0,
    },
  };
}

export function serializeLab(color: ColorObject): string {
  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);
  const [l, a, b] = color.coords.map((v) => Math.round(v * factor) / factor);
  const A = Math.round(color.alpha * 1000) / 1000;

  if (A < 1) {
    return `lab(${l} ${a} ${b} / ${A})`;
  }
  return `lab(${l} ${a} ${b})`;
}

// XYZ (D50) to Lab
function xyzToLabRaw(xyz: Vector3): Vector3 {
  const [x, y, z] = xyz;
  const xr = x / D50[0];
  const yr = y / D50[1];
  const zr = z / D50[2];

  const f = (t: number) =>
    t > EPSILON ? Math.cbrt(t) : (KAPPA * t + 16) / 116;

  const fx = f(xr);
  const fy = f(yr);
  const fz = f(zr);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return [L, a, b];
}

// Lab to XYZ (D50)
function labToXyzRaw(lab: Vector3): Vector3 {
  const [L, a, b] = lab;
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;

  const f3 = (t: number) =>
    t * t * t > EPSILON ? t * t * t : (116 * t - 16) / KAPPA;

  const xr = f3(fx);
  const yr = L > KAPPA * EPSILON ? Math.pow((L + 16) / 116, 3) : L / KAPPA;
  const zr = f3(fz);

  return [xr * D50[0], yr * D50[1], zr * D50[2]];
}

export function labToRgb(color: ColorObject): ColorObject {
  const lab = color.coords as Vector3;
  const xyzD50 = labToXyzRaw(lab);
  const xyzD65 = mul3x3(M_D50_TO_D65, xyzD50);

  return xyzToRgb({
    space: "xyz",
    coords: xyzD65,
    alpha: color.alpha,
  });
}

export function rgbToLab(color: ColorObject): ColorObject {
  const xyzD65Obj = rgbToXyz(color);
  const xyzD65 = xyzD65Obj.coords as Vector3;
  const xyzD50 = mul3x3(M_D65_TO_D50, xyzD65);
  const lab = xyzToLabRaw(xyzD50);

  return {
    space: "lab",
    coords: lab,
    alpha: color.alpha,
  };
}
