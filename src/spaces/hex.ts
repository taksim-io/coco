import { ColorObject, ParseResult } from "../core/types";

export function parseHex(input: string): ParseResult {
  if (input.startsWith("#")) {
    const hex = input.slice(1);
    if (hex.match(/^[0-9a-f]{3}$/i)) {
      return {
        space: "rgb",
        coords: [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16),
        ],
        alpha: 1,
      };
    }
    if (hex.match(/^[0-9a-f]{4}$/i)) {
      return {
        space: "rgb",
        coords: [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16),
        ],
        alpha: parseInt(hex[3] + hex[3], 16) / 255,
      };
    }
    if (hex.match(/^[0-9a-f]{6}$/i)) {
      return {
        space: "rgb",
        coords: [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ],
        alpha: 1,
      };
    }
    if (hex.match(/^[0-9a-f]{8}$/i)) {
      return {
        space: "rgb",
        coords: [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ],
        alpha: parseInt(hex.slice(6, 8), 16) / 255,
      };
    }
  }
  return undefined;
}

// Actually, let's just create specific helpers for strict formats
export function serializeHex8(color: ColorObject): string {
  const { coords, alpha } = color;
  const [r, g, b] = coords.map((c) =>
    Math.round(Math.max(0, Math.min(255, c)))
  );
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  // Force alpha inclusion
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
}

export function serializeHex6(color: ColorObject): string {
  const { coords } = color;
  const [r, g, b] = coords.map((c) =>
    Math.round(Math.max(0, Math.min(255, c)))
  );
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function serializeHex4(color: ColorObject): string {
  // Attempt conversion to 4 char hex if possible, else fallback to 8?
  // User requested "hex4" conversion. Usually implies strict requirement.
  // But if value is #12345678, it can't be #1234.
  // Old lib: coco('#ff0000', 'hex3') => '#f00'
  // If we call 'hex3' on something valid that CAN represent it.
  // If not representable? Old lib might return hex6 anyway or nearest?
  // Let's implement best effort.
  const h8 = serializeHex8(color); // #RRGGBBAA
  if (
    h8[1] === h8[2] &&
    h8[3] === h8[4] &&
    h8[5] === h8[6] &&
    h8[7] === h8[8]
  ) {
    return `#${h8[1]}${h8[3]}${h8[5]}${h8[7]}`;
  }
  return h8; // Fallback
}

export function serializeHex3(color: ColorObject): string {
  const h6 = serializeHex6(color);
  if (h6[1] === h6[2] && h6[3] === h6[4] && h6[5] === h6[6]) {
    return `#${h6[1]}${h6[3]}${h6[5]}`;
  }
  return h6;
}

export function serializeHex(color: ColorObject): string {
  // Default to hex6 or hex8
  return serializeHexLong(color);
}

export function serializeHexLong(color: ColorObject): string {
  const { coords, alpha } = color;
  const [r, g, b] = coords.map((c) =>
    Math.round(Math.max(0, Math.min(255, c)))
  );

  const toHex = (n: number) => n.toString(16).padStart(2, "0");

  if (alpha < 1) {
    const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function serializeHexShort(color: ColorObject): string {
  const long = serializeHexLong(color);
  // Check if we can shorten
  // #RRGGBB -> #RGB
  if (long.length === 7) {
    if (long[1] === long[2] && long[3] === long[4] && long[5] === long[6]) {
      return `#${long[1]}${long[3]}${long[5]}`;
    }
  } else if (long.length === 9) {
    if (
      long[1] === long[2] &&
      long[3] === long[4] &&
      long[5] === long[6] &&
      long[7] === long[8]
    ) {
      return `#${long[1]}${long[3]}${long[5]}${long[7]}`;
    }
  }
  return long;
}
