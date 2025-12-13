import { describe, expect, it } from "vitest";
import { coco } from "../src/coco";

describe("Edge Cases", () => {
  describe("Core Parsing & Validation", () => {
    it("validates isColor", () => {
      expect(coco.isColor("foo")).toBe(false);
    });

    it("returns undefined for totally invalid input", () => {
      expect(coco("invalid_color")).toBeUndefined();
    });

    it("should handle empty strings", () => {
      expect(coco("")).toBeUndefined();
      expect(coco("   ")).toBeUndefined();
    });

    it("returns undefined for garbage rgb string", () => {
      expect(coco("rgb(foo, bar, baz)")).toBeUndefined();
    });

    it("does not support raw comma numbers by default", () => {
      expect(coco("75, 79, 33")).toBeUndefined();
    });

    it("should reject malformed hex", () => {
      expect(coco("##ff0000")).toBeUndefined();
      expect(coco("#gg0000")).toBeUndefined();
      expect(coco("#12345")).toBeUndefined();
    });

    it("should reject malformed RGB", () => {
      expect(coco("rgb(255, 0)")).toBeUndefined();
      expect(coco("rgb(255, 0, 0, 0, 0)")).toBeUndefined();
      expect(coco("rgb(abc, 0, 0)")).toBeUndefined(); // Non-numeric
    });

    it("should handle out-of-range values", () => {
      expect(coco("rgb(300, -50, 1000)")).toBe("#ff00ff"); // Clamped to 255, 0, 255
    });
  });

  describe("Extreme Values", () => {
    it("clamps negative RGB values to 0", () => {
      expect(coco("rgb(-1, -1, -1)", "hex")).toBe("#000000");
    });

    it("clamps RGB values > 255 to 255", () => {
      expect(coco("rgb(256, 256, 256)", "hex")).toBe("#ffffff");
    });

    it("clamps negative HSL values", () => {
      expect(coco("hsl(-1, -1%, -1%)", "hex")).toBe("#000000");
    });

    it("clamps HSL values > 100%", () => {
      expect(coco("hsl(361, 101%, 101%)", "hex")).toBe("#ffffff");
    });

    it("normalizes negative hue", () => {
      expect(coco("hsl(-1, 100%, 50%)", "hex")).toBe("#ff0004");
    });

    it("normalizes hue > 360", () => {
      expect(coco("hsl(361, 100%, 50%)", "hex")).toBe("#ff0400");
    });

    it("clamps saturation > 100%", () => {
      expect(coco("hsv(0, 150%, 100%)", "hsv")).toBe("hsv(0, 100%, 100%)");
    });

    it("clamps value > 100%", () => {
      expect(coco("hsv(0, 100%, 150%)", "hsv")).toBe("hsv(0, 100%, 100%)");
    });

    it("wraps hue > 360", () => {
      expect(coco("hsv(370, 100%, 100%)", "hsv")).toBe("hsv(10, 100%, 100%)");
    });

    it("wraps LCH hue", () => {
      expect(coco("lch(50 50 400)", "lch")).toBe("lch(50 50 40)");
    });

    it("wraps OKLCH hue", () => {
      expect(coco("oklch(0.5 0.1 400)", "oklch")).toBe("oklch(0.5 0.1 40)");
    });

    it("hsl(0°) → rgb → hsl", () => {
      const original = "hsl(0, 100%, 50%)";
      const rgb = coco(original, "rgb");
      const backToHsl = coco(rgb!, "hsl");
      expect(coco.isEqual(original, backToHsl!)).toBe(true);
    });

    it("hsl with 0% saturation should be achromatic", () => {
      const gray = coco("hsl(180, 0%, 50%)", "rgb");
      const grayRgb = coco("rgb(128, 128, 128)", "rgb");
      expect(coco.isEqual(gray, grayRgb)).toBe(true);
    });

    it("oklch(0.9 0.4 180) clamps to valid RGB", () => {
      expect(coco("oklch(0.9 0.4 180)", "rgb")).toBe("rgb(0, 255, 232)");
    });

    it("compares different colors", () => {
      expect(coco.isEqual("red", "blue")).toBe(false);
    });

    it("respects alpha in equality", () => {
      expect(coco.isEqual("#ff0000", "#ff000080")).toBe(false);
    });
  });

  describe("OKLCH Round Trip", () => {
    const testColors = [
      "rgb(255, 0, 0)",
      "rgb(0, 255, 0)",
      "rgb(0, 0, 255)",
      "rgb(128, 128, 128)",
      "rgb(123, 45, 67)",
    ];

    testColors.forEach((color) => {
      it(`${color} survives OKLCH round-trip`, () => {
        const oklch = coco(color, "oklch");
        const back = coco(oklch!, "rgb");
        expect(coco.isEqual(color, back!)).toBe(true);
      });
    });
  });

  describe("Alpha Precision", () => {
    it("rounds alpha to 3 decimal places from hex", () => {
      // #80 is approx 0.50196...
      expect(coco.getAlpha("#ff000080")).toBe(0.502);
    });

    it("rounds alpha to 3 decimal places from rgba", () => {
      expect(coco.getAlpha("rgba(0, 0, 0, 0.12345)")).toBe(0.123);
    });

    it("rounds alpha to 3 decimal places from hsla", () => {
      expect(coco.getAlpha("hsla(0, 0%, 0%, 0.12345)")).toBe(0.123);
    });

    it("rounds alpha to 3 decimal places from lch", () => {
      expect(coco.getAlpha("lch(50 50 50 / 0.9876)")).toBe(0.988);
    });

    it("rounds alpha to 3 decimal places from oklab", () => {
      expect(coco.getAlpha("oklab(0.5 0.1 0.1 / 0.12345)")).toBe(0.123);
    });

    it("handles alpha > 1 in input", () =>
      expect(coco("rgba(0, 0, 0, 1.5)", "hex")).toBe("#000000"));

    it("handles negative alpha", () =>
      expect(coco("rgba(0,0,0,-0.5)", "hex")).toBe("#00000000"));

    it("set alpha ", () =>
      expect(coco.setAlpha("rgba(0, 0, 0, 0.5)", 0.8)).toBe(
        "rgba(0, 0, 0, 0.8)"
      ));
  });
});
