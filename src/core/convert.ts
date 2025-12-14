import {
  parseHex,
  serializeHex,
  serializeHex3,
  serializeHex4,
  serializeHex6,
  serializeHex8,
} from "../spaces/hex";
import { hslToRgb, parseHsl, rgbToHsl, serializeHsl } from "../spaces/hsl";
import { hsvToRgb, parseHsv, rgbToHsv, serializeHsv } from "../spaces/hsv";
import { labToRgb, parseLab, rgbToLab, serializeLab } from "../spaces/lab";
import { lchToRgb, parseLch, rgbToLch, serializeLch } from "../spaces/lch";
import {
  oklabToRgb,
  parseOklab,
  rgbToOklab,
  serializeOklab,
} from "../spaces/oklab";
import {
  oklchToRgb,
  parseOklch,
  rgbToOklch,
  serializeOklch,
} from "../spaces/oklch";
import { parseRgb, serializeRgb } from "../spaces/rgb";
import { parseXyz, rgbToXyz, serializeXyz, xyzToRgb } from "../spaces/xyz";
import { CocoConfig, ColorObject, ColorSpace, ParseResult } from "./types";

export function convert(
  color: ColorObject,
  targetSpace: ColorSpace
): ColorObject {
  if (color.space === targetSpace) return color;

  // Normalize source to RGB first
  const rgb = toRgbInternal(color);

  // If RGB was the target, we are done
  if (targetSpace === "rgb") return rgb;

  // Convert RGB to target
  if (targetSpace === "hsl") return rgbToHsl(rgb);
  if (targetSpace === "hsv") return rgbToHsv(rgb);
  if (targetSpace === "oklch") return rgbToOklch(rgb);
  if (targetSpace === "xyz") return rgbToXyz(rgb);
  if (targetSpace === "lab") return rgbToLab(rgb);
  if (targetSpace === "lch") return rgbToLch(rgb);
  if (targetSpace === "oklab") return rgbToOklab(rgb);

  // Hex variations
  if (targetSpace.startsWith("hex")) {
    return rgb; // Handled by serialize
  }

  throw new Error(`Unsupported target space: ${targetSpace}`);
}

function toRgbInternal(color: ColorObject): ColorObject {
  if (color.space === "rgb") return color;
  if (color.space === "hsl") return hslToRgb(color);
  if (color.space === "hsv") return hsvToRgb(color);
  if (color.space === "oklch") return oklchToRgb(color);
  if (color.space === "xyz") return xyzToRgb(color);
  if (color.space === "lab") return labToRgb(color);
  if (color.space === "lch") return lchToRgb(color);
  if (color.space === "oklab") return oklabToRgb(color);

  // Hex should have been parsed to one of the above (usually rgb or hex->rgb parser)
  // But if we encounter hex object (hypothetically), we parse it.
  if (color.space.startsWith("hex")) {
    return { ...color, space: "rgb" };
  }

  throw new Error(`Unsupported source space: ${color.space}`);
}

export function parse(
  input: string,
  { namedColors, nameResolver }: CocoConfig = {}
): ParseResult | undefined {
  if (!input) {
    return undefined;
  }

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
  if (lower.startsWith("color(xyz")) return parseXyz(input);
  if (lower.startsWith("lab")) return parseLab(input);
  if (lower.startsWith("lch")) return parseLch(input);
  if (lower.startsWith("oklab")) return parseOklab(input);

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
  if (format === "xyz") return serializeXyz(color);
  if (format === "lab") return serializeLab(color);
  if (format === "lch") return serializeLch(color);
  if (format === "oklab") return serializeOklab(color);

  return serializeHex(color);
}
