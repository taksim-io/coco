import { CocoConfig, CocoInstance, ColorSpace, ColorType } from "./types";
import { convert, parse, serialize } from "./convert";

export function createCoco(config: CocoConfig = {}): CocoInstance {
  const _coco = (
    input: string,
    targetFormat?: ColorSpace
  ): string | undefined => {
    const color = parse(input, config);

    if (!color) return undefined;

    targetFormat = targetFormat ?? "hex";

    return serialize(convert(color, targetFormat), targetFormat);
  };

  const coco = _coco as CocoInstance;

  coco.isColor = (input: string) => !!parse(input, config);

  coco.getType = (input: string): ColorType | undefined => {
    if (config.nameResolver?.(input) || config.namedColors?.[input]) {
      return "x11";
    }

    const p = parse(input, config);
    return p ? (input.startsWith("#") ? "hex" : p.space) : undefined;
  };

  coco.getAlpha = (input: string): number => parse(input, config)?.alpha ?? 1;

  coco.isEqual = (c1: string, c2: string): boolean => {
    const p1 = parse(c1, config);
    const p2 = parse(c2, config);

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

  return coco;
}
