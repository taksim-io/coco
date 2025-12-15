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
import { CocoConfig, ColorObject, ColorType, ParseResult } from "./types";

const SUPPORTED_FORMATS: Array<ColorType> = [
  "name",
  "hex",
  "hex3",
  "hex4",
  "hex6",
  "hex8",
  "rgb",
  "hsl",
  "hsv",
  "xyz",
  "lab",
  "lch",
  "oklab",
  "oklch",
];

export function convert(
  color: ColorObject,
  targetType: ColorType,
  config: CocoConfig = {}
): ColorObject {
  if (color.space === targetType) return color;

  // Normalize source to RGB first
  const rgb = toRgbInternal(color);

  // If RGB was the target, we are done
  if (targetType === "rgb") return rgb;

  // Convert RGB to target
  if (targetType === "hsl") return rgbToHsl(rgb);
  if (targetType === "hsv") return rgbToHsv(rgb);
  if (targetType === "oklch") return rgbToOklch(rgb);
  if (targetType === "xyz") return rgbToXyz(rgb);
  if (targetType === "lab") return rgbToLab(rgb);
  if (targetType === "lch") return rgbToLch(rgb);
  if (targetType === "oklab") return rgbToOklab(rgb);

  // Hex variations
  if (targetType.startsWith("hex")) {
    return rgb; // Handled by serialize
  }

  if (targetType === "name") {
    // 1. Try value resolver
    if (config.valueResolver) {
      const name = config.valueResolver(color);
      if (name) {
        return {
          space: "name",
          coords: [0, 0, 0],
          alpha: color.alpha,
          meta: { ...color.meta, name },
        };
      }
    }

    // 2. Try named colors map
    if (config.namedColorsReverse) {
      const hex = serializeHex(toRgbInternal(color)); // #RRGGBB
      const currentHex = hex.toLowerCase().replace("#", "");
      let foundName = config.namedColorsReverse[currentHex];

      if (!foundName && currentHex.length === 8 && currentHex.endsWith("ff")) {
        foundName = config.namedColorsReverse[currentHex.substring(0, 6)];
      }

      if (foundName) {
        return {
          space: "name",
          coords: [0, 0, 0],
          alpha: color.alpha,
          meta: { ...color.meta, name: foundName },
        };
      }
    }

    // Fallback: return "name" object without name property set (or undefined)
    return {
      space: "name",
      coords: [0, 0, 0], // dummy
      alpha: color.alpha,
      meta: { ...color.meta, name: undefined },
    };
  }

  throw new Error(`Unsupported target color type: ${targetType}`);
}

export function convertToAll(
  input: string | undefined,
  config: CocoConfig
): Partial<Record<ColorType, string>> {
  const result: Partial<Record<ColorType, string>> = {};

  if (!input) return result;

  const color = parse(input, config);

  if (!color) return result;

  SUPPORTED_FORMATS.forEach((fmt) => {
    try {
      const val = serialize(convert(color, fmt, config), fmt);
      if (val && val !== input) {
        result[fmt] = val;
      }
    } catch (e) {
      // ignore
    }
  });

  return result;
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
  input: string | undefined,
  { namedColors, nameResolver }: CocoConfig = {}
): ParseResult | undefined {
  if (!input) {
    return undefined;
  }

  input = input.trim();

  let result: ParseResult;
  const lower = input.toLowerCase();

  // Use resolver if provided
  if (nameResolver) {
    const resolved = nameResolver(input);
    if (resolved) {
      result = parseHex("#" + resolved.replace("#", ""));
    }
  }

  // Use name map if provided
  if (!result && namedColors) {
    const resolved = namedColors[input];
    if (resolved) {
      result = parseHex("#" + resolved.replace("#", ""));
    }
  }

  if (!result) {
    if (input.startsWith("#")) result = parseHex(input);
    else if (lower.startsWith("rgb")) result = parseRgb(input);
    else if (lower.startsWith("hsl")) result = parseHsl(input);
    else if (lower.startsWith("hsv")) result = parseHsv(input);
    else if (lower.startsWith("oklch")) result = parseOklch(input);
    else if (lower.startsWith("color(xyz")) result = parseXyz(input);
    else if (lower.startsWith("lab")) result = parseLab(input);
    else if (lower.startsWith("lch")) result = parseLch(input);
    else if (lower.startsWith("oklab")) result = parseOklab(input);
  }

  if (result) {
    result.meta = { ...result.meta, originalInput: input };
    return result;
  }

  return undefined;
}

export function serialize(
  color: ColorObject,
  format: ColorType
): string | undefined {
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
  if (format === "name") return color.meta?.name;

  return serializeHex(color);
}
