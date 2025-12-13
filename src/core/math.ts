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
// High precision values for better stability
export const OKLAB_M1 = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005],
];
export const OKLAB_M1_INV = [
  [4.0767416613479935, -3.3077115904081937, 0.2309699287294278],
  [-1.2684380040921763, 2.609757400663372, -0.3413193963102196],
  [-0.0041960865418371, -0.7034186144594495, 1.7076147009309446],
];
export const OKLAB_M2 = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766],
];
export const OKLAB_M2_INV = [
  [0.9999999984505198, 0.3963377921737678, 0.2158037580607588],
  [1.0000000088817607, -0.1055613423236563, -0.0638541747717059],
  [1.0000000546724109, -0.0894841820949657, -1.2914855378640917],
];

// sRGB (D65) <-> XYZ (D65)
// Source: http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// 10+ decimal precision
export const M_SRGB_TO_XYZ_D65 = [
  [0.4124564391, 0.3575760776, 0.1804374833],
  [0.2126728514, 0.7151521552, 0.0721749934],
  [0.0193338956, 0.1191920259, 0.9503040785],
];
export const M_XYZ_D65_TO_SRGB = [
  [3.2404541621, -1.5371385127, -0.4985314095],
  [-0.9692660305, 1.8760108454, 0.0415560175],
  [0.055643431, -0.2040259135, 1.0572251882],
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
