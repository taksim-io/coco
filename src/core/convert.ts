import { ColorObject, ColorSpace } from "./types";
import { hslToRgb, rgbToHsl } from "../spaces/hsl";
import { hsvToRgb, rgbToHsv } from "../spaces/hsv";
import { oklchToRgb, rgbToOklch } from "../spaces/oklch";

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
