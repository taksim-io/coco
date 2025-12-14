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

export type ColorType = "name" | ColorSpace;
export type ParseResult = ColorObject | undefined;
export type NameResolver = (name: string) => string | undefined;

export interface ColorObject {
  space: ColorSpace;
  coords: [number, number, number];
  alpha: number;
  meta?: {
    precision?: number;
  };
}

export interface ColorParser {
  (input: string): ParseResult;
}

export interface ColorSerializer {
  (color: ColorObject): string;
}

export interface CocoConfig {
  nameResolver?: NameResolver;
  namedColors?: Record<string, string>;
}

export interface CocoInstance {
  (color: string, targetFormat: ColorSpace): string;
  (color: string): string;
  isColor(input: string): boolean;
  getType(input: string): ColorType | undefined;
  getAlpha(input: string): number;
  setAlpha(input: string, alpha: number): string | undefined;
  removeAlpha(input: string): string | undefined;
  isEqual(c1: string, c2: string): boolean;
}
