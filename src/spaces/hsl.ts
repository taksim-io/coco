import { ColorObject, ParseResult } from "../core/types";
import { clampAlpha, clampRgb, R_DECIMAL, snapToInt } from "../core/utils";

const R_HSL =
  /^hsla?\(\s*([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([-+]?[\d\.]+)%\s*[,\s]\s*([-+]?[\d\.]+)%\s*(?:[,\/]\s*([-+]?[\d\.]+)(%)?)?\s*\)$/i;

export function parseHsl(input: string): ParseResult {
  return parseHslRefined(input);
}

// Better parser needed for Alpha %
function parseHslRefined(input: string): ParseResult {
  const match = input.match(R_HSL);
  if (!match) return undefined;

  let h = parseFloat(match[1]);
  const hUnit = match[2];
  const s = parseFloat(match[3]);
  const l = parseFloat(match[4]);
  let a = 1;

  if (match[5]) {
    a = parseFloat(match[5]);
    if (match[6] === "%") a /= 100;
  }

  // Normalize hue
  if (hUnit === "rad") h = (h * 180) / Math.PI;
  else if (hUnit === "grad") h = h * 0.9;
  else if (hUnit === "turn") h = h * 360;

  // Normalize negative hues
  h = h % 360;
  if (h < 0) h += 360;

  // Detect max precision from input
  const decimalMatches = input.match(R_DECIMAL) || [];
  const precision =
    decimalMatches.length > 0
      ? Math.max(...decimalMatches.map((m) => m.length - 1))
      : 0;

  return {
    space: "hsl",
    coords: [h, Math.min(100, Math.max(0, s)), Math.min(100, Math.max(0, l))],
    alpha: clampAlpha(a),
    meta: { precision },
  };
}

export function serializeHsl(color: ColorObject): string {
  const [h, s, l] = color.coords;
  const a = color.alpha;

  const prec = color.meta?.precision ?? 3;
  const factor = Math.pow(10, prec);

  const hRound = Math.round(h * factor) / factor;
  const sRound = Math.round(s * factor) / factor;
  const lRound = Math.round(l * factor) / factor;
  const A = Math.round(a * 1000) / 1000;

  if (A < 1) {
    return `hsla(${hRound}, ${sRound}%, ${lRound}%, ${A})`;
  }
  return `hsl(${hRound}, ${sRound}%, ${lRound}%)`;
}

export function hslToRgb(color: ColorObject): ColorObject {
  const [h, s, l] = color.coords;
  const a = color.alpha;

  const C = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - C / 2;

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

export function rgbToHsl(color: ColorObject): ColorObject {
  let [r, g, b] = color.coords;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

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
  }

  return {
    space: "hsl",
    coords: [h, s * 100, l * 100],
    alpha: color.alpha,
  };
}
