import { describe, it, expect } from "vitest";
import {
  hue2hex,
  hue2rgb,
  hue2hsl,
  hue2hsv,
  hue2oklch,
  hue2xyz,
  hue2lab,
  hue2lch,
  hue2oklab,
  createCoco,
  namedColors,
} from "../src/coco";
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
    oklch: "oklch(0.628 0.258 29.23)",
    oklch_80: "oklch(0.628 0.258 29.23 / 0.8)",
  },
};

describe("Taksim-Coco Library", () => {
  Object.keys(colors).forEach((colorName) => {
    describe(colorName, () => {
      const variations = colors[colorName];

      Object.keys(variations).forEach((variationName) => {
        describe(variationName, () => {
          const sourceColor = variations[variationName];
          const transparency = variationName.split("_")[1];
          const suffix = transparency ? `_${transparency}` : "";

          formats.forEach((fmt) =>
            it(fmt, () => {
              if (fmt === "hex") {
                if (transparency) {
                  expect(coco(sourceColor, fmt)).toBe(
                    variations["hex8" + suffix]
                  );
                } else {
                  expect(coco(sourceColor, fmt)).toBe(variations["hex6"]);
                }
              } else if (fmt === "hex6") {
                expect(coco(sourceColor, fmt)).toBe(variations["hex6"]);
              } else if (fmt === "hex3") {
                expect(coco(sourceColor, fmt)).toBe(variations["hex3"]);
              } else {
                expect(coco(sourceColor, fmt)).toBe(variations[fmt + suffix]);
              }
            })
          );

          it("getType", () => {
            const fmt = variationName.split("_")[0];

            if (fmt.startsWith("hex")) {
              expect(coco.getType(sourceColor)).toBe("hex");
            } else {
              expect(coco.getType(sourceColor)).toBe(fmt);
            }
          });

          it("isColor", () => expect(coco.isColor(sourceColor)).toBe(true));
        });
      });
    });
  });

  describe("RGB", () => {
    describe("Clamping/Edge Cases", () => {
      it("clamps negative RGB values to 0", () => {
        expect(coco("rgb(-1, -1, -1)", "hex")).toBe("#000000");
      });
      it("clamps RGB values > 255 to 255", () => {
        expect(coco("rgb(256, 256, 256)", "hex")).toBe("#ffffff");
      });
    });
  });

  describe("HSL", () => {
    describe("Edge Cases", () => {
      it("clamps negative HSL values", () => {
        expect(coco("hsl(-1, -1%, -1%)", "hex")).toBe("#000000");
      });
      it("clamps HSL values > 100%", () => {
        expect(coco("hsl(361, 101%, 101%)", "hex")).toBe("#ffffff");
      });
      it("normalizes negative hue", () => {
        expect(coco("hsl(-1, 100%, 50%)", "hex")).toMatch(/^#ff[0-9a-f]{4}$/);
      });
      it("normalizes hue > 360", () => {
        expect(coco("hsl(361, 100%, 50%)", "hex")).toMatch(/^#ff[0-9a-f]{4}$/);
      });
    });
  });

  describe("HSV", () => {
    it("parses signed values", () => {
      expect(coco("hsv(-120, 100%, 50%)", "hsv")).toBe("hsv(240, 100%, 50%)");
    });
  });

  describe("XYZ", () => {
    it("parses and serializes", () => {
      // Signed input check
      expect(coco("color(xyz -0.1 0.2 0.3)", "xyz")).toBe(
        "color(xyz -0.1 0.2 0.3)"
      );
    });
  });

  describe("LAB", () => {
    it("parses and serializes", () => {
      expect(coco("lab(50 -20 -30)", "lab")).toBe("lab(50 -20 -30)");
    });
  });

  describe("LCH", () => {
    it("parses and serializes", () => {
      expect(coco("lch(50 50 -90)", "lch")).toBe("lch(50 50 270)");
    });
  });

  describe("OKLAB", () => {
    it("parses and serializes", () => {
      expect(coco("oklab(0.5 -0.1 -0.1)", "oklab")).toBe(
        "oklab(0.5 -0.1 -0.1)"
      );
    });
  });

  describe("OKLCH", () => {
    it("parses and serializes", () => {
      expect(coco("oklch(0.5 0.1 -90)", "oklch")).toBe("oklch(0.5 0.1 270)");
    });
  });

  describe("Core Parsing & Validation", () => {
    it("validates isColor", () => {
      expect(coco.isColor("foo")).toBe(false);
    });

    it("returns undefined for totally invalid input", () => {
      expect(coco("invalid_color")).toBe(undefined);
    });

    it("returns undefined for garbage rgb string", () => {
      expect(coco("rgb(foo, bar, baz)")).toBe(undefined);
    });

    it("does not support raw comma numbers by default", () => {
      expect(coco("75, 79, 33")).toBe(undefined);
    });

    it("does not support named colors by default", () => {
      const leanCoco = createCoco();
      expect(leanCoco("red")).toBe(undefined);
    });
  });

  describe("Factory Configuration", () => {
    it("supports custom resolver", () => {
      const cocoWithNameResolver = createCoco({
        nameResolver: (n: string) => (n === "mycolor" ? "f00" : undefined),
      });
      expect(cocoWithNameResolver("mycolor", "hex")).toBe("#ff0000");
    });
  });

  describe("Utilities", () => {
    describe("Hue Helpers", () => {
      it("hue2hex", () => expect(hue2hex(120)).toBe("#00ff00"));
      it("hue2rgb", () => expect(hue2rgb(120)).toBe("rgb(0, 255, 0)"));
      it("hue2hsl", () => expect(hue2hsl(240)).toBe("hsl(240, 100%, 50%)"));
      it("hue2hsv", () => expect(hue2hsv(300)).toBe("hsv(300, 100%, 100%)"));
      it("hue2oklch", () => expect(hue2oklch(180)).toBe("oklch(0.7 0.2 180)"));
      it("hue2lab", () => expect(hue2lab(0)).toBe("lab(53 104 0)"));
      it("hue2lch", () => expect(hue2lch(40)).toBe("lch(53 104 40)"));
      it("hue2oklab", () => expect(hue2oklab(0)).toBe("oklab(0.7 0.2 0)"));
      it("hue2xyz", () =>
        expect(hue2xyz(120)).toBe("color(xyz 0.3576 0.7152 0.1192)"));
    });

    describe("Alpha Manipulation (get/set)", () => {
      it("gets alpha from rgba", () =>
        expect(coco.getAlpha("rgba(0,0,0,0.5)")).toBe(0.5));
      it("gets alpha from hex8", () =>
        expect(coco.getAlpha("#ff000080")).toBeCloseTo(0.5019, 2));
      it("gets alpha defaulting to 1", () =>
        expect(coco.getAlpha("red")).toBe(1));
      it("gets alpha from oklch", () =>
        expect(coco.getAlpha("oklch(0.5 0.1 100 / 0.5)")).toBe(0.5));

      it("sets alpha on named color", () =>
        expect(coco.setAlpha("red", 0.5)).toBe("rgba(255, 0, 0, 0.5)"));
      it("sets alpha on hex", () =>
        expect(coco.setAlpha("#f00", 0.5)).toBe("#ff000080"));
      it("updates existing alpha", () =>
        expect(coco.setAlpha("rgba(0, 0, 0, 0.5)", 0.8)).toBe(
          "rgba(0, 0, 0, 0.8)"
        ));
      it("removes alpha from rgba", () =>
        expect(coco.removeAlpha("rgba(0, 0, 0, 0.5)")).toBe("rgb(0, 0, 0)"));
      it("removes alpha from hex8", () =>
        expect(coco.removeAlpha("#ff000080")).toBe("#ff0000"));

      // Alpha Edge Cases
      it("handles alpha > 1 in input", () =>
        expect(coco("rgba(0, 0, 0, 1.5)", "hex8")).toBe("#000000ff"));
      it("handles negative alpha", () =>
        expect(coco("rgba(0,0,0,-0.5)", "hex8")).toBe("#00000000"));
    });

    describe("Equality (isEqual)", () => {
      it("compares same colors", () => {
        expect(coco.isEqual("red", "#f00")).toBe(true);
        expect(coco.isEqual("rgb(255, 0, 0)", "hsl(0, 100%, 50%)")).toBe(true);
      });
      it("compares different colors", () => {
        expect(coco.isEqual("red", "blue")).toBe(false);
      });
      it("respects alpha in equality", () => {
        expect(coco.isEqual("#ff0000", "#ff000080")).toBe(false);
      });
    });
  });

  // =========================================
  // 5. Integration & External Data
  // =========================================
  describe("Integration & Reference Tests (External Coverage)", () => {
    it("Validates specific conversions", () => {
      expect(coco("hsl(0, 0%, 0%)", "hsv")).toBe("hsv(0, 0%, 0%)");
      expect(coco("rgb(0, 0, 0)", "lab")).toBe("lab(0 0 0)");
      expect(coco("rgb(255, 255, 255)", "lab")).toBe("lab(100 0 0)");
      expect(coco("rgb(128, 128, 128)", "hsl")).toBe("hsl(0, 0%, 50%)");
      expect(coco("bisque", "rgb")).toBe("rgb(255, 228, 196)");
      expect(coco("blue", "lab")).toBe("lab(29.568 68.299 -112.029)");
      expect(coco("oklch(0.64 0.22 295)", "rgb")).toBe("rgb(154, 101, 255)");
      expect(coco("oklab(0.64 0.09 -0.20)", "rgb")).toBe("rgb(152, 102, 255)");
      expect(coco("lab(75 20 -30)", "rgb")).toBe("rgb(201, 173, 240)");
      expect(coco("color(xyz 0.25 0.40 0.15)", "rgb")).toBe("rgb(97, 190, 85)");
      expect(coco("rgb(92, 191, 84)", "lch")).toBe("lch(69.66 63.724 136.482)");
      expect(coco("rgb(92, 191, 84)", "lab")).toBe("lab(69.66 -46.21 43.879)");
      expect(coco("rgb(92, 191, 84)", "xyz")).toBe(
        "color(xyz 0.2464 0.4018 0.1484)"
      );
      expect(coco("rgb(153, 102, 255)", "oklab")).toBe(
        "oklab(0.64 0.091 -0.197)"
      );
      expect(coco("rgb(153, 102, 255)", "oklch")).toBe(
        "oklch(0.64 0.217 294.87)"
      );
    });
  });
});
