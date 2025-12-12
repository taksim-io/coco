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

// OKLAB Matrices
export const OKLAB_M1 = [
  [0.8189330101, 0.3618667424, -0.1288597137],
  [0.0329845436, 0.9293118715, 0.0361456387],
  [0.0482003018, 0.2643662691, 0.633851707],
];
export const OKLAB_M1_INV = [
  [1.2270138511, -0.5577532521, 0.2812038044],
  [-0.0405801784, 1.1122568696, -0.0716766787],
  [-0.0763812845, -0.4214819784, 1.5861632204],
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
