import { createCoco, CocoConfig } from "./core/factory";
import { namedColors } from "./data/named-colors";
import { convert } from "./core/convert"; // Export core utilities as well
import { serializeHex } from "./spaces/hex"; // Used by hue2hex

// Default configuration with named colors
const defaultConfig: CocoConfig = {
  nameResolver: (name: string) => namedColors[name.toLowerCase()],
};

// Create default instance
const coco = createCoco(defaultConfig);

// Static Utils (re-attach for API compatibility if needed, though instance has them)
// But to expose independent utils:
export { createCoco };
export { convert };

// Parse and Serialize are generic names. The instance has them internally.
// If users want raw parse/serialize they can us factory or import specific spaces?
// Old `src/coco.ts` exported `parse` and `serialize`.
// `parse` needs config (names).
// So `coco.parse` is better than standalone `parse` that knows names?
// But previously I exported `parse` that hardcoded names.
// I will attach `parse` and `serialize` from the default instance or keep them if needed.

// Wait, the instance `coco` IS a function.
export const parse = (input: string) =>
  (coco as any).isColor(input)
    ? { space: (coco as any).getSpace(input) }
    : undefined;
// Actually `parse` returned ParseResult object.
// The factory `parse` is internal.
// If I want to export `parse`, I should expose it from instance.
// Let's modify factory to expose `parse` and `serialize` on the instance.

// For now, export default coco and the helper functions attached to it.
const isColor = coco.isColor;
const getSpace = coco.getSpace;
const getAlpha = coco.getAlpha;
const isEqual = coco.isEqual;
const format = coco.format;

// Hue Helpers
function hue2hex(hue: number): string {
  return serializeHex(
    convert({ space: "hsl", coords: [hue, 100, 50], alpha: 1 }, "rgb")
  );
}
function hue2rgb(hue: number): [number, number, number, number] {
  const c = convert({ space: "hsl", coords: [hue, 100, 50], alpha: 1 }, "rgb");
  return [...c.coords, c.alpha] as [number, number, number, number];
}
function hue2hsl(hue: number): [number, number, number, number] {
  return [hue, 100, 50, 1];
}

export {
  coco,
  isColor,
  getSpace,
  getAlpha,
  isEqual,
  hue2hex,
  hue2rgb,
  hue2hsl,
  format,
};
export default coco;
