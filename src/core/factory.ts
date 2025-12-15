import { convert, convertToAll, parse, serialize } from "./convert";
import { CocoConfig, CocoInstance, ColorType } from "./types";
import { reverseNamedColors } from "./utils";

export function createCoco(config: CocoConfig = {}): CocoInstance {
  if (config.namedColors && !config.namedColorsReverse) {
    config.namedColorsReverse = reverseNamedColors(config.namedColors);
  }

  const _coco = (
    input: string | undefined,
    targetFormat?: ColorType | "all"
  ): string | Record<string, string> | undefined => {
    if (targetFormat === "all") {
      return convertToAll(input, config);
    }

    const color = parse(input, config);

    if (!color) return undefined;

    targetFormat = targetFormat ?? "hex";

    return serialize(convert(color, targetFormat, config), targetFormat);
  };

  const coco = _coco as CocoInstance;

  coco.isColor = (input: string | undefined) => !!parse(input, config);

  coco.getType = (input: string | undefined): ColorType | undefined => {
    if (!input) return undefined;
    if (config.nameResolver?.(input) || config.namedColors?.[input]) {
      return "name";
    }

    const p = parse(input, config);
    return p ? (input.startsWith("#") ? "hex" : p.space) : undefined;
  };

  coco.getAlpha = (input: string | undefined): number | undefined => {
    if (!input) return undefined;
    const alpha = parse(input, config)?.alpha ?? 1;
    return Math.round(alpha * 1000) / 1000;
  };

  coco.setAlpha = (
    input: string | undefined,
    alpha: number | undefined
  ): string | undefined => {
    if (!input || !alpha) return undefined;

    const color = parse(input, config);

    if (!color) return undefined;

    color.alpha = Math.min(1, Math.max(0, alpha));

    // Infer format: maintain Hex f input was Hex, otherwise use internal space (rgb/hsl/etc)
    const inferredSpace = input.startsWith("#") ? "hex" : color.space;
    return serialize(color, inferredSpace);
  };

  coco.removeAlpha = (input: string | undefined): string | undefined => {
    return coco.setAlpha(input, 1);
  };

  coco.hasAlpha = (input: string | undefined): boolean => {
    if (!input) return false;
    const color = parse(input, config);
    if (!color) return false;
    return color.alpha < 1;
  };

  coco.isEqual = (c1: string | undefined, c2: string | undefined): boolean => {
    if (c1?.toLowerCase() === c2?.toLowerCase()) return true;
    if (!c1 || !c2) return false;

    const p1 = parse(c1, config);
    const p2 = parse(c2, config);

    if (!p1 || !p2) return false;

    const rgb1 = convert(p1, "rgb");
    const rgb2 = convert(p2, "rgb");

    // Fuzzy matching to handle floating-point drift (e.g. rgb(1,1,1) vs hsl -> 0.9996)
    const epsilon = Number.EPSILON * 255;

    return (
      Math.abs(rgb1.coords[0] - rgb2.coords[0]) < epsilon &&
      Math.abs(rgb1.coords[1] - rgb2.coords[1]) < epsilon &&
      Math.abs(rgb1.coords[2] - rgb2.coords[2]) < epsilon &&
      Math.abs(rgb1.alpha - rgb2.alpha) < Number.EPSILON
    );
  };

  return coco;
}
