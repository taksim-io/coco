import { ColorObject, ParseResult } from "../core/types";
import { clampAlpha, clampRgb, R_DECIMAL, snapToInt } from "../core/utils";

const R_HSV =
  /^hsva?\(\s*([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([-+]?[\d\.]+)%?\s*[,\s]\s*([-+]?[\d\.]+)%?\s*(?:[,\/]\s*([-+]?[\d\.]+)(%)?)?\s*\)$/i;

export function parseHsv(input: string): ParseResult {
  const match = input.match(R_HSV);
  if (!match) return undefined;

  let h = parseFloat(match[1]);
  const hUnit = match[2];
  const s = parseFloat(match[3]);
  const v = parseFloat(match[4]);
  let a = 1;

  if (match[5]) {
    a = parseFloat(match[5]);
    if (match[6] === "%") a /= 100;
  }

  // Normalize hue
  if (hUnit === "rad") h = (h * 180) / Math.PI;
  else if (hUnit === "grad") h = h * 0.9;
  else if (hUnit === "turn") h = h * 360;

  h = h % 360;
  if (h < 0) h += 360;

  // Detect max precision from input
  const decimalMatches = input.match(R_DECIMAL) || [];
  const precision =
    decimalMatches.length > 0
      ? Math.max(...decimalMatches.map((m) => m.length - 1))
      : 0;

  return {
    space: "hsv",
    coords: [h, Math.min(100, Math.max(0, s)), Math.min(100, Math.max(0, v))],
    alpha: clampAlpha(a),
    meta: { precision },
  };
}

export function serializeHsv(color: ColorObject): string {
  const [h, s, v] = color.coords;
  const a = color.alpha;

  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);

  const H = Math.round(h * factor) / factor;
  const S = Math.round(s * factor) / factor;
  const V = Math.round(v * factor) / factor;
  const A = Math.round(a * 1000) / 1000;

  if (A < 1) {
    return `hsva(${H}, ${S}%, ${V}%, ${A})`;
  }
  return `hsv(${H}, ${S}%, ${V}%)`;
}

export function hsvToRgb(color: ColorObject): ColorObject {
  const [h, s, v] = color.coords;
  const a = color.alpha;

  const sRat = s / 100;
  const vRat = v / 100;

  const C = vRat * sRat;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vRat - C;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = C;
    g = X;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = X;
    g = C;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = C;
    b = X;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = X;
    b = C;
  } else if (240 <= h && h < 300) {
    r = X;
    g = 0;
    b = C;
  } else if (300 <= h && h < 360) {
    r = C;
    g = 0;
    b = X;
  }

  const R = snapToInt(clampRgb((r + m) * 255));
  const G = snapToInt(clampRgb((g + m) * 255));
  const B = snapToInt(clampRgb((b + m) * 255));

  return {
    space: "rgb",
    coords: [R, G, B],
    alpha: a,
  };
}

export function rgbToHsv(color: ColorObject): ColorObject {
  let [r, g, b] = color.coords;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  } else {
    h = 0; // Achromatic
  }

  return {
    space: "hsv",
    coords: [h, s * 100, v * 100],
    alpha: color.alpha,
  };
}
