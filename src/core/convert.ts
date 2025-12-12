import { CocoConfig, ColorObject, ColorSpace, ParseResult } from "./types";
import { hslToRgb, parseHsl, rgbToHsl, serializeHsl } from "../spaces/hsl";
import { hsvToRgb, parseHsv, rgbToHsv, serializeHsv } from "../spaces/hsv";
import {
  oklchToRgb,
  parseOklch,
  rgbToOklch,
  serializeOklch,
} from "../spaces/oklch";
import {
  parseHex,
  serializeHex,
  serializeHex3,
  serializeHex4,
  serializeHex6,
  serializeHex8,
} from "../spaces/hex";
import { parseRgb, serializeRgb } from "../spaces/rgb";

export function convert(
  color: ColorObject,
  targetSpace: ColorSpace
): ColorObject {
  if (color.space === targetSpace) return color;

  // If target is hex, we treat it as RGB for the object model
  if (
    targetSpace === "hex" ||
    targetSpace === "hex3" ||
    targetSpace === "hex4" ||
    targetSpace === "hex6" ||
    targetSpace === "hex8"
  ) {
    targetSpace = "rgb";
  }

  // Normalize source to RGB first
  let rgb: ColorObject;
  if (color.space === "rgb") {
    rgb = color;
  } else if (color.space === "hsl") {
    rgb = hslToRgb(color);
  } else if (color.space === "hsv") {
    rgb = hsvToRgb(color);
  } else if (color.space === "oklch") {
    rgb = oklchToRgb(color);
  } else {
    throw new Error(`Unsupported source space: ${color.space}`);
  }

  // If RGB was the target, we are done
  if (targetSpace === "rgb") return rgb;

  // Convert RGB to target
  if (targetSpace === "hsl") {
    return rgbToHsl(rgb);
  } else if (targetSpace === "hsv") {
    return rgbToHsv(rgb);
  } else if (targetSpace === "oklch") {
    return rgbToOklch(rgb);
  }

  throw new Error(`Unsupported target space: ${targetSpace}`);
}

export function parse(
  input: string,
  { namedColors, nameResolver }: CocoConfig = {}
): ParseResult {
  input = input.trim();

  // Use resolver if provided
  if (nameResolver) {
    const resolved = nameResolver(input);

    if (resolved) {
      return parseHex("#" + resolved.replace("#", ""));
    }
  }

  // Use name map if provided
  if (namedColors) {
    const resolved = namedColors[input];

    if (resolved) {
      return parseHex("#" + resolved.replace("#", ""));
    }
  }

  if (input.startsWith("#")) return parseHex(input);

  const lower = input.toLowerCase();
  if (lower.startsWith("rgb")) return parseRgb(input);
  if (lower.startsWith("hsl")) return parseHsl(input);
  if (lower.startsWith("hsv")) return parseHsv(input);
  if (lower.startsWith("oklch")) return parseOklch(input);

  return undefined;
}

export function serialize(color: ColorObject, format: ColorSpace): string {
  if (format === "hex") return serializeHex(color);
  if (format === "hex3") return serializeHex3(color);
  if (format === "hex4") return serializeHex4(color);
  if (format === "hex6") return serializeHex6(color);
  if (format === "hex8") return serializeHex8(color);
  if (format === "rgb") return serializeRgb(color);
  if (format === "hsl") return serializeHsl(color);
  if (format === "hsv") return serializeHsv(color);
  if (format === "oklch") return serializeOklch(color);

  return serializeHex(color);
}

export function hue2hex(hue: number): string {
  return serializeHex(
    convert({ space: "hsl", coords: [hue, 100, 50], alpha: 1 }, "rgb")
  );
}

export function hue2rgb(hue: number): string {
  const c = convert({ space: "hsl", coords: [hue, 100, 50], alpha: 1 }, "rgb");
  return serializeRgb(c);
}

export function hue2hsl(hue: number): string {
  return serializeHsl({
    space: "hsl",
    coords: [clip(hue, 0, 360), 100, 50],
    alpha: 1,
  });
}

export function hue2hsv(hue: number): string {
  return serializeHsv({
    space: "hsv",
    coords: [clip(hue, 0, 360), 100, 100],
    alpha: 1,
  });
}

export function hue2oklch(hue: number): string {
  // Uses L=0.7, C=0.2 for a vibrant color
  return serializeOklch({
    space: "oklch",
    coords: [0.7, 0.2, clip(hue, 0, 360)],
    alpha: 1,
  });
}

function clip(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}
