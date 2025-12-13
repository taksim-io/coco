import { describe, it, expect } from "vitest";
import { createCoco, coco } from "../src/coco";

describe("Edge Cases", () => {
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

  describe("Alpha Manipulation (get/set)", () => {
    it("gets alpha from hex8", () =>
      expect(coco.getAlpha("#ff000080")).toBeCloseTo(0.5019, 2));

    it("handles alpha > 1 in input", () =>
      expect(coco("rgba(0, 0, 0, 1.5)", "hex8")).toBe("#000000ff"));

    it("handles negative alpha", () =>
      expect(coco("rgba(0,0,0,-0.5)", "hex8")).toBe("#00000000"));

    it("set alpha ", () =>
      expect(coco.setAlpha("rgba(0, 0, 0, 0.5)", 0.8)).toBe(
        "rgba(0, 0, 0, 0.8)"
      ));
  });
});
