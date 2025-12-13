import { ColorObject, ParseResult } from "../core/types";

const R_RGB_COMMA =
  /^rgba?\(\s*([-+]?[\d\.]+)(%?)\s*,\s*([-+]?[\d\.]+)(%?)\s*,\s*([-+]?[\d\.]+)(%?)\s*(?:,\s*([-+]?[\d\.]+)(\%?))?\s*\)$/i;
const R_RGB_SPACE =
  /^rgba?\(\s*([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(%?)\s*(?:\/\s*([-+]?[\d\.]+)(\%?))?\s*\)$/i;

export function parseRgb(input: string): ParseResult {
  const match = input.match(R_RGB_COMMA);
  if (!match) {
    // Try space separated syntax (CSS4)
    const match4 = input.match(R_RGB_SPACE);
    if (match4) return parseMatch(match4);
    return undefined;
  }
  return parseMatch(match);
}

function parseMatch(match: RegExpMatchArray): ColorObject {
  const r = parseValue(match[1], match[2], 255);
  const g = parseValue(match[3], match[4], 255);
  const b = parseValue(match[5], match[6], 255);
  const a = match[7] ? parseValue(match[7], match[8], 1) : 1;

  return {
    space: "rgb",
    coords: [r, g, b],
    alpha: a,
  };
}

function parseValue(val: string, unit: string, max: number): number {
  let num = parseFloat(val);
  if (unit === "%") {
    num = (num / 100) * max;
  }
  return Math.min(Math.max(num, 0), max);
}

export function serializeRgb(color: ColorObject): string {
  const { coords, alpha } = color;
  const [r, g, b] = coords.map((c) => Math.round(c));
  const A = Math.round(alpha * 1000) / 1000;

  if (A < 1) {
    return `rgba(${r}, ${g}, ${b}, ${A})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
