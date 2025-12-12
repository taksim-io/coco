export type ColorSpace =
  | "rgb"
  | "hsl"
  | "hsv"
  | "hex"
  | "hex3"
  | "hex4"
  | "hex6"
  | "hex8"
  | "oklch"
  | "oklab"
  | "lch"
  | "lab"
  | "xyz";

export interface ColorObject {
  space: ColorSpace;
  coords: [number, number, number];
  alpha: number;
}

export type ParseResult = ColorObject | undefined;

export interface ColorParser {
  (input: string): ParseResult;
}

export interface ColorSerializer {
  (color: ColorObject): string;
}
