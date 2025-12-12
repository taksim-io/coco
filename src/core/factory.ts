import { ColorObject, ColorSpace, ParseResult } from "./types";
import { convert } from "./convert";
import {
  parseHex,
  serializeHex,
  serializeHex3,
  serializeHex4,
  serializeHex6,
  serializeHex8,
} from "../spaces/hex";
import { parseRgb, serializeRgb } from "../spaces/rgb";
import { parseHsl, serializeHsl } from "../spaces/hsl";
import { parseHsv, serializeHsv } from "../spaces/hsv";
import { parseOklch, serializeOklch } from "../spaces/oklch";

export type NameResolver = (name: string) => string | undefined;

export interface CocoConfig {
  nameResolver?: NameResolver;
}

export interface CocoInstance {
  (color: string, targetFormat: ColorSpace): string;
  (color: string): string;
  isColor(input: string): boolean;
  getSpace(input: string): ColorSpace | "x11" | undefined;
  getAlpha(input: string): number;
  isEqual(c1: string, c2: string): boolean;
  format(input: string): ColorSpace | undefined; // Alias for getSpace? Old lib had format.
}

export function createCoco(config: CocoConfig = {}): CocoInstance {
  const { nameResolver } = config;

  function parse(input: string): ParseResult {
    input = input.trim();

    // Use resolver if provided
    if (nameResolver) {
      const resolved = nameResolver(input);
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

  function serialize(color: ColorObject, format: ColorSpace): string {
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

  function coco(input: string, targetFormat?: ColorSpace): string | undefined {
    // Check if input is empty or invalid logic
    const color = parse(input);
    if (!color) return undefined as any;

    targetFormat = targetFormat ?? "hex";

    const converted = convert(color, targetFormat);
    return serialize(converted, targetFormat);
  }

  // Bind methods
  (coco as any).isColor = (input: string) => !!parse(input);
  (coco as any).getSpace = (input: string) => {
    if (nameResolver && nameResolver(input)) return "x11"; // or 'name' ? Old lib returned 'name'
    const p = parse(input);
    return p ? (input.startsWith("#") ? "hex" : p.space) : undefined;
  };
  (coco as any).format = (coco as any).getSpace; // Alias as per old lib test
  (coco as any).getAlpha = (input: string) => {
    const color = parse(input);
    return color ? color.alpha : 1;
  };
  (coco as any).isEqual = (c1: string, c2: string) => {
    const p1 = parse(c1);
    const p2 = parse(c2);
    if (!p1 || !p2) return false;
    const rgb1 = convert(p1, "rgb");
    const rgb2 = convert(p2, "rgb");
    return (
      rgb1.coords[0] === rgb2.coords[0] &&
      rgb1.coords[1] === rgb2.coords[1] &&
      rgb1.coords[2] === rgb2.coords[2] &&
      rgb1.alpha === rgb2.alpha
    );
  };

  return coco as CocoInstance;
}
