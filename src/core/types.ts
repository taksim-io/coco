export type ColorType =
  | "name"
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

export type ParseResult = ColorObject | undefined;
export type NameResolver = (name: string) => string | undefined;
export type ValueResolver = (color: ColorObject) => string | undefined;

export interface ColorObject {
  space: ColorType;
  coords: [number, number, number];
  alpha: number;
  meta?: {
    precision?: number;
    name?: string;
    originalInput?: string;
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
  valueResolver?: ValueResolver;
  namedColors?: Record<string, string>;
  namedColorsReverse?: Record<string, string>;
}

export interface CocoInstance {
  (color: string | undefined, targetFormat: ColorType): string | undefined;
  (color: string | undefined): string | undefined;
  isColor(input: string | undefined): boolean;
  getType(input: string | undefined): ColorType | undefined;
  getAlpha(input: string | undefined): number | undefined;
  setAlpha(
    input: string | undefined,
    alpha: number | undefined
  ): string | undefined;
  removeAlpha(input: string | undefined): string | undefined;
  isEqual(c1: string | undefined, c2: string | undefined): boolean;
}
