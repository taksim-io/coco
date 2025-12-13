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
} from "../src/coco";

describe("Utilities", () => {
  describe("Hue Helpers", () => {
    it("hue2hex", () => expect(hue2hex(120)).toBe("#00ff00"));
    it("hue2rgb", () => expect(hue2rgb(120)).toBe("rgb(0, 255, 0)"));
    it("hue2hsl", () => expect(hue2hsl(240)).toBe("hsl(240, 100%, 50%)"));
    it("hue2hsv", () => expect(hue2hsv(300)).toBe("hsv(300, 100%, 100%)"));
    it("hue2oklch", () => expect(hue2oklch(180)).toBe("oklch(0.7 0.2 180)"));
    it("hue2lab", () => expect(hue2lab(90)).toBe("lab(53 0 104)"));
    it("hue2lch", () => expect(hue2lch(40)).toBe("lch(53 104 40)"));
    it("hue2oklab", () => expect(hue2oklab(0)).toBe("oklab(0.7 0.2 0)"));
    it("hue2xyz", () =>
      expect(hue2xyz(120)).toBe("color(xyz 0.3576 0.7152 0.1192)"));

    it("normalizes hue (wraps around)", () => {
      // 370 % 360 = 10
      // hue2hsl(10) -> hsl(10, 100%, 50%) -> #ff2a00
      expect(hue2hex(370)).toBe("#ff2a00");
      expect(hue2hex(10)).toBe("#ff2a00");
      expect(hue2hex(360)).toBe("#ff0000"); // 0 degrees
      expect(hue2hex(0)).toBe("#ff0000");

      // -10 % 360 = 350
      // hue2hsl(350) -> #ff002b (B=42.5 rounds to 43)
      expect(hue2hex(-10)).toBe("#ff002b");
    });
  });
});
