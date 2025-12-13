import { describe, it, expect } from "vitest";
import { coco } from "../src/coco";

describe("Edge Cases", () => {
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

    // TODO: opacity precision
    it("gets alpha from hex8", () =>
      expect(coco.getAlpha("#ff000080")).toBe(0.502));

    it("handles alpha > 1 in input", () =>
      expect(coco("rgba(0, 0, 0, 1.5)", "hex")).toBe("#000000"));

    it("handles negative alpha", () =>
      expect(coco("rgba(0,0,0,-0.5)", "hex")).toBe("#00000000"));

    it("set alpha ", () =>
      expect(coco.setAlpha("rgba(0, 0, 0, 0.5)", 0.8)).toBe(
        "rgba(0, 0, 0, 0.8)"
      ));

    it("compares different colors", () => {
      expect(coco.isEqual("red", "blue")).toBe(false);
    });

    it("respects alpha in equality", () => {
      expect(coco.isEqual("#ff0000", "#ff000080")).toBe(false);
    });
  });
});
