import { describe, expect, it } from "vitest";
import { createCoco, namedColors } from "../src/coco";
import { ColorSpace } from "../src/core/types";

const coco = createCoco({ namedColors });

const formats: Array<ColorSpace> = [
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

const colors: Record<string, Record<string, string>> = {
  black: {
    x11: "black",
    hex3: "#000",
    hex6: "#000000",
    hex4: "#000f",
    hex4_80: "#000c",
    hex8: "#000000ff",
    hex8_80: "#000000cc",
    rgb: "rgb(0, 0, 0)",
    rgb_80: "rgba(0, 0, 0, 0.8)",
    hsl: "hsl(0, 0%, 0%)",
    hsl_80: "hsla(0, 0%, 0%, 0.8)",
    hsv: "hsv(0, 0%, 0%)",
    hsv_80: "hsva(0, 0%, 0%, 0.8)",
    xyz: "color(xyz 0 0 0)",
    xyz_80: "color(xyz 0 0 0 / 0.8)",
    lab: "lab(0 0 0)",
    lab_80: "lab(0 0 0 / 0.8)",
    lch: "lch(0 0 0)",
    lch_80: "lch(0 0 0 / 0.8)",
    oklab: "oklab(0 0 0)",
    oklab_80: "oklab(0 0 0 / 0.8)",
    oklch: "oklch(0 0 0)",
    oklch_80: "oklch(0 0 0 / 0.8)",
  },
  nearBlack: {
    hex3: "#010101",
    hex6: "#010101",
    hex4: "#010101ff",
    hex4_80: "#010101cc",
    hex8: "#010101ff",
    hex8_80: "#010101cc",
    rgb: "rgb(1, 1, 1)",
    rgb_80: "rgba(1, 1, 1, 0.8)",
    hsl: "hsl(0, 0%, 0.392%)",
    hsl_80: "hsla(0, 0%, 0.392%, 0.8)",
    hsv: "hsv(0, 0%, 0.392%)",
    hsv_80: "hsva(0, 0%, 0.392%, 0.8)",
    xyz: "color(xyz 0.0003 0.0003 0.0003)",
    xyz_80: "color(xyz 0.0003 0.0003 0.0003 / 0.8)",
    lab: "lab(0.274 0 0)",
    lab_80: "lab(0.274 0 0 / 0.8)",
    lch: "lch(0.274 0 0)",
    lch_80: "lch(0.274 0 0 / 0.8)",
    oklab: "oklab(0.067 0 0)",
    oklab_80: "oklab(0.067 0 0 / 0.8)",
    oklch: "oklch(0.067 0 0)",
    oklch_80: "oklch(0.067 0 0 / 0.8)",
  },
  white: {
    x11: "white",
    hex3: "#fff",
    hex6: "#ffffff",
    hex4: "#ffff",
    hex4_80: "#fffc",
    hex8: "#ffffffff",
    hex8_80: "#ffffffcc",
    rgb: "rgb(255, 255, 255)",
    rgb_80: "rgba(255, 255, 255, 0.8)",
    hsl: "hsl(0, 0%, 100%)",
    hsl_80: "hsla(0, 0%, 100%, 0.8)",
    hsv: "hsv(0, 0%, 100%)",
    hsv_80: "hsva(0, 0%, 100%, 0.8)",
    xyz: "color(xyz 0.9505 1 1.0888)",
    xyz_80: "color(xyz 0.9505 1 1.0888 / 0.8)",
    lab: "lab(100 0 0)",
    lab_80: "lab(100 0 0 / 0.8)",
    lch: "lch(100 0 0)",
    lch_80: "lch(100 0 0 / 0.8)",
    oklab: "oklab(1 0 0)",
    oklab_80: "oklab(1 0 0 / 0.8)",
    oklch: "oklch(1 0 0)",
    oklch_80: "oklch(1 0 0 / 0.8)",
  },
  nearWhite: {
    hex3: "#fefefe",
    hex6: "#fefefe",
    hex4: "#fefefeff",
    hex4_80: "#fefefecc",
    hex8: "#fefefeff",
    hex8_80: "#fefefecc",
    rgb: "rgb(254, 254, 254)",
    rgb_80: "rgba(254, 254, 254, 0.8)",
    hsl: "hsl(0, 0%, 99.608%)",
    hsl_80: "hsla(0, 0%, 99.608%, 0.8)",
    hsv: "hsv(0, 0%, 99.608%)",
    hsv_80: "hsva(0, 0%, 99.608%, 0.8)",
    xyz: "color(xyz 0.942 0.9911 1.0791)",
    xyz_80: "color(xyz 0.942 0.9911 1.0791 / 0.8)",
    lab: "lab(99.655 0 0)",
    lab_80: "lab(99.655 0 0 / 0.8)",
    lch: "lch(99.655 0 0)",
    lch_80: "lch(99.655 0 0 / 0.8)",
    oklab: "oklab(0.997 0 0)",
    oklab_80: "oklab(0.997 0 0 / 0.8)",
    oklch: "oklch(0.997 0 0)",
    oklch_80: "oklch(0.997 0 0 / 0.8)",
  },
  midGray: {
    hex3: "#808080",
    hex6: "#808080",
    hex4: "#808080ff",
    hex4_50: "#80808080",
    hex4_80: "#808080cc",
    hex8: "#808080ff",
    hex8_50: "#80808080",
    hex8_80: "#808080cc",
    rgb: "rgb(128, 128, 128)",
    rgb_50: "rgba(128, 128, 128, 0.5)",
    rgb_80: "rgba(128, 128, 128, 0.8)",
    hsl: "hsl(0, 0%, 50.196%)",
    hsl_50: "hsla(0, 0%, 50.196%, 0.5)",
    hsl_80: "hsla(0, 0%, 50.196%, 0.8)",
    hsv: "hsv(0, 0%, 50.196%)",
    hsv_50: "hsva(0, 0%, 50.196%, 0.5)",
    hsv_80: "hsva(0, 0%, 50.196%, 0.8)",
    xyz: "color(xyz 0.2052 0.2159 0.235)",
    xyz_50: "color(xyz 0.2052 0.2159 0.235 / 0.5)",
    xyz_80: "color(xyz 0.2052 0.2159 0.235 / 0.8)",
    lab: "lab(53.585 0 0)",
    lab_50: "lab(53.585 0 0 / 0.5)",
    lab_80: "lab(53.585 0 0 / 0.8)",
    lch: "lch(53.585 0 0)",
    lch_50: "lch(53.585 0 0 / 0.5)",
    lch_80: "lch(53.585 0 0 / 0.8)",
    oklab: "oklab(0.6 0 0)",
    oklab_50: "oklab(0.6 0 0 / 0.5)",
    oklab_80: "oklab(0.6 0 0 / 0.8)",
    oklch: "oklch(0.6 0 0)",
    oklch_50: "oklch(0.6 0 0 / 0.5)",
    oklch_80: "oklch(0.6 0 0 / 0.8)",
  },
  red: {
    x11: "red",
    hex3: "#f00",
    hex6: "#ff0000",
    hex4: "#f00f",
    hex4_80: "#f00c",
    hex8: "#ff0000ff",
    hex8_80: "#ff0000cc",
    rgb: "rgb(255, 0, 0)",
    rgb_80: "rgba(255, 0, 0, 0.8)",
    hsl: "hsl(0, 100%, 50%)",
    hsl_80: "hsla(0, 100%, 50%, 0.8)",
    hsv: "hsv(0, 100%, 100%)",
    hsv_80: "hsva(0, 100%, 100%, 0.8)",
    xyz: "color(xyz 0.4125 0.2127 0.0193)",
    xyz_80: "color(xyz 0.4125 0.2127 0.0193 / 0.8)",
    lab: "lab(54.292 80.812 69.885)",
    lab_80: "lab(54.292 80.812 69.885 / 0.8)",
    lch: "lch(54.292 106.839 40.853)",
    lch_80: "lch(54.292 106.839 40.853 / 0.8)",
    oklab: "oklab(0.628 0.225 0.126)",
    oklab_80: "oklab(0.628 0.225 0.126 / 0.8)",
    oklch: "oklch(0.628 0.258 29.234)",
    oklch_80: "oklch(0.628 0.258 29.234 / 0.8)",
  },
};

describe("Conversions", () => {
  Object.keys(colors).forEach((colorName) => {
    describe(colorName, () => {
      const variations = colors[colorName];

      Object.keys(variations).forEach((variationName) => {
        describe(variationName, () => {
          const sourceColor = variations[variationName];
          const [sourceFormat, transparency] = variationName.split("_");
          const suffix = transparency ? `_${transparency}` : "";

          formats.forEach((fmt) => {
            const targetColor = variations[fmt + suffix];

            it(fmt, () => {
              const output = coco(sourceColor, fmt);

              if (fmt === "hex") {
                if (transparency) {
                  expect(output).toBe(variations["hex8" + suffix]);
                } else {
                  expect(output).toBe(variations["hex6"]);
                }
              } else if (fmt === "hex6") {
                expect(output).toBe(variations["hex6"]);
              } else if (fmt === "hex3") {
                expect(output).toBe(variations["hex3"]);
              } else {
                // If source is hex with transparency, alpha might effectively be different
                // due to 8-bit precision (e.g. 0.5 vs 0.502).
                // In that case, we verify against the solid color with the *actual* source alpha applied.
                if (transparency && sourceFormat.startsWith("hex")) {
                  const solidTarget = variations[fmt];
                  const actualAlpha = coco.getAlpha(sourceColor);
                  const alphaApplied = coco.setAlpha(solidTarget, actualAlpha);
                  // setAlpha returns generic hex (long), but if fmt is hex4/hex3 we need to format it strictly
                  expect(output).toBe(coco(alphaApplied!, fmt));
                } else {
                  expect(output).toBe(targetColor);
                }
              }
            });

            it(`isEqual(${sourceColor}, ${targetColor})`, () =>
              expect(coco.isEqual(sourceColor, targetColor)).toBe(
                targetColor ? true : false
              ));
          });

          it("getType", () => {
            if (sourceFormat.startsWith("hex")) {
              expect(coco.getType(sourceColor)).toBe("hex");
            } else {
              expect(coco.getType(sourceColor)).toBe(sourceFormat);
            }
          });

          it("getAlpha", () => {
            if (transparency) {
              const expected = parseInt(transparency) / 100;
              const actual = coco.getAlpha(sourceColor);
              if (sourceFormat.startsWith("hex")) {
                expect(actual).toBeCloseTo(expected, 1);
              } else {
                expect(actual).toBe(expected);
              }
            } else {
              expect(coco.getAlpha(sourceColor)).toBe(1);
            }
          });

          it("setAlpha", () => {
            if (sourceFormat === "x11") {
              expect(coco.setAlpha(sourceColor, 0.8)).toBe(
                variations["rgb_80"]
              );
            } else if (sourceFormat.startsWith("hex")) {
              expect(coco.setAlpha(sourceColor, 0.8)).toBe(
                variations["hex8_80"]
              );
            } else {
              expect(coco.setAlpha(sourceColor, 0.8)).toBe(
                variations[sourceFormat + "_80"]
              );
            }
          });

          it("removeAlpha", () => {
            if (sourceFormat === "x11") {
              expect(coco.removeAlpha(sourceColor)).toBe(variations["rgb"]);
            } else if (sourceFormat.startsWith("hex")) {
              expect(coco.removeAlpha(sourceColor)).toBe(variations["hex6"]);
            } else {
              expect(coco.removeAlpha(sourceColor)).toBe(
                variations[sourceFormat]
              );
            }
          });

          it("isColor", () => expect(coco.isColor(sourceColor)).toBe(true));
        });
      });
    });
  });
});
