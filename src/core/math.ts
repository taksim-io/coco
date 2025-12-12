export type Vector3 = [number, number, number];

export function mul3x3(m: number[][], v: Vector3): Vector3 {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

export function lin_sRGB(RGB: Vector3): Vector3 {
  return RGB.map((val) => {
    const v = val / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }) as Vector3;
}

export function gam_sRGB(RGB: Vector3): Vector3 {
  return RGB.map((val) => {
    const v =
      val > 0.0031308 ? 1.055 * Math.pow(val, 1.0 / 2.4) - 0.055 : 12.92 * val;
    return Math.round(Math.max(0, Math.min(1, v)) * 255);
  }) as Vector3;
}

// OKLAB Matrices (Linear sRGB <-> LMS)
// Source: https://bottosson.github.io/posts/oklab/
export const OKLAB_M1 = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005],
];
export const OKLAB_M1_INV = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.707614701],
];
export const OKLAB_M2 = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766],
];
export const OKLAB_M2_INV = [
  [0.9999999985, 0.3963377774, 0.2158037573],
  [1.0000000089, -0.1055613458, -0.0638541728],
  [1.0000000547, -0.0894841775, -1.291485548],
];
// sRGB (D65) <-> XYZ (D65)
// Source: http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
export const M_SRGB_TO_XYZ_D65 = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041],
];
export const M_XYZ_D65_TO_SRGB = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.969266, 1.8760108, 0.041556],
  [0.0556434, -0.2040259, 1.0572252],
];

// Bradford Adaptation D65 -> D50
// Source: http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
export const M_D65_TO_D50 = [
  [1.0478112, 0.0228866, -0.050127],
  [0.0295424, 0.9904844, -0.0170491],
  [-0.0092345, 0.0150436, 0.7521316],
];
export const M_D50_TO_D65 = [
  [0.9555766, -0.0230393, 0.0631636],
  [-0.0282895, 1.0099416, 0.0210077],
  [0.0122982, -0.020483, 1.3299098],
];

// D50 White Point
export const D50 = [0.96422, 1.0, 0.82521];
