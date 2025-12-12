import { describe, it, expect } from "vitest";
import {
  hue2hex,
  hue2rgb,
  hue2hsl,
  hue2hsv,
  hue2oklch,
  createCoco,
  namedColors,
} from "../src/coco";

const coco = createCoco({ namedColors });

describe("coco", () => {
  it("parses and serializes hex", () => {
    expect(coco("#ff0000", "hex")).toBe("#ff0000");
    expect(coco("#f00", "hex")).toBe("#ff0000"); // canonical
  });

  it("converts hex to rgb", () => {
    expect(coco("#ff0000", "rgb")).toBe("rgb(255, 0, 0)");
  });

  it("converts rgb to hex", () => {
    expect(coco("rgb(255, 0, 0)", "hex")).toBe("#ff0000");
  });

  it("converts names to hex", () => {
    expect(coco("red", "hex")).toBe("#ff0000");
    expect(coco("blue", "rgb")).toBe("rgb(0, 0, 255)");
  });

  it("handles alpha in hex", () => {
    const res = coco("#ff000080", "rgb");
    expect(res).toMatch(/rgba\(255, 0, 0, 0\.5\d*\)/);
  });

  it("supports oklch parsing", () => {
    expect(coco.isColor("oklch(0.6 0.1 0)")).toBe(true);
  });

  it("converts oklch to hex (round trip check)", () => {
    const input = "oklch(0.6279 0.2576 29.2338)";
    const hex = coco(input, "hex");
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("supports xyz parsing and conversion", () => {
    expect(coco.isColor("color(xyz 0.41 0.21 0.02)")).toBe(true);
    const hex = "#ff0000";
    const xyz = coco(hex, "xyz");
    const back = coco(xyz, "hex");
    expect(back).toBe(hex);
  });

  it("supports lab parsing and conversion", () => {
    expect(coco.isColor("lab(53 80 67)")).toBe(true);
    const hex = "#ff0000";
    const lab = coco(hex, "lab");
    const back = coco(lab, "hex");
    expect(back).toBe(hex);
  });

  it("supports lch parsing and conversion", () => {
    expect(coco.isColor("lch(53 104 40)")).toBe(true);
    const hex = "#ff0000";
    const lch = coco(hex, "lch");
    const back = coco(lch, "hex");
    expect(back).toBe(hex);
  });

  it("supports oklab parsing and conversion", () => {
    expect(coco.isColor("oklab(0.63 0.22 0.12)")).toBe(true);
    const hex = "#ff0000";
    const oklab = coco(hex, "oklab");
    const back = coco(oklab, "hex");
    expect(back).toBe(hex);
  });

  it("validates isColor", () => {
    expect(coco.isColor("rgb(0,0,0)")).toBe(true);
    expect(coco.isColor("foo")).toBe(false);
  });

  it("identifies space", () => {
    expect(coco.getType("rgb(0,0,0)")).toBe("rgb");
    expect(coco.getType("#fff")).toBe("hex");
    expect(coco.getType("oklch(0 0 0)")).toBe("oklch");
  });

  describe("granular hex formats", () => {
    it("supports hex3", () => {
      expect(coco("red", "hex3")).toBe("#f00");
      expect(coco("#ff0000", "hex3")).toBe("#f00");
    });
    it("supports hex4", () => {
      // Red with 80% alpha
      expect(coco("rgba(255, 0, 0, 0.8)", "hex4")).toBe("#f00c");
    });
    it("supports hex6", () => {
      expect(coco("red", "hex6")).toBe("#ff0000");
    });
    it("supports hex8", () => {
      expect(coco("red", "hex8")).toBe("#ff0000ff");
    });
  });

  describe("hue conversion", () => {
    it("converts hue to hex", () => {
      expect(hue2hex(120)).toBe("#00ff00");
      expect(hue2hex(0)).toBe("#ff0000");
    });
    it("converts hue to rgb", () => {
      // 120 -> green
      expect(hue2rgb(120)).toBe("rgb(0, 255, 0)");
    });
    it("converts hue to hsl", () => {
      // 240 -> blue
      const hsl = hue2hsl(240);
      expect(hsl).toBe("hsl(240, 100%, 50%)");
    });
    it("converts hue to hsv", () => {
      // 300 -> magenta
      const hsv = hue2hsv(300);
      expect(hsv).toBe("hsv(300, 100%, 100%)");
    });
    it("converts hue to oklch", () => {
      // 180 -> cyan-ish
      const oklch = hue2oklch(180);
      expect(oklch).toBe("oklch(0.7 0.2 180)");
    });
  });

  describe("isEqual", () => {
    it("compares same colors", () => {
      expect(coco.isEqual("red", "#f00")).toBe(true);
      expect(coco.isEqual("rgb(255, 0, 0)", "hsl(0, 100%, 50%)")).toBe(true);
      expect(coco.isEqual("#ff0000ff", "rgba(255, 0, 0, 1)")).toBe(true);
    });
    it("compares different colors", () => {
      expect(coco.isEqual("red", "blue")).toBe(false);
      expect(coco.isEqual("#000", "#fff")).toBe(false);
    });
    it("respects alpha in equality", () => {
      expect(coco.isEqual("rgba(0,0,0,1)", "rgba(0,0,0,0.5)")).toBe(false);
      expect(coco.isEqual("#ff0000", "#ff000080")).toBe(false);
    });
  });

  describe("getAlpha", () => {
    it("gets alpha from rgba", () => {
      expect(coco.getAlpha("rgba(0,0,0,0.5)")).toBe(0.5);
    });
    it("gets alpha from hex8", () => {
      // #ff000080 -> 128/255 ~= 0.5019
      const a = coco.getAlpha("#ff000080");
      expect(a).toBeCloseTo(0.5019, 2);
    });
    it("gets alpha defaulting to 1", () => {
      expect(coco.getAlpha("red")).toBe(1);
      expect(coco.getAlpha("rgb(0,0,0)")).toBe(1);
      expect(coco.getAlpha("hsl(0,0%,0%)")).toBe(1);
    });
    it("gets alpha from oklch", () => {
      expect(coco.getAlpha("oklch(0.5 0.1 100 / 0.5)")).toBe(0.5);
    });
  });
});

describe("factory configuration", () => {
  it("supports custom name resolver (or none)", () => {
    // Create lean instance
    const lean = createCoco({});
    expect(lean("red")).toBe(undefined); // Should fail to parse name
    expect(lean("#fff")).toBe("#ffffff"); // Should still parse hex
  });

  it("supports custom resolver", () => {
    const custom = createCoco({
      nameResolver: (n: string) => (n === "mycolor" ? "fff" : undefined),
    });
    expect(custom("mycolor", "hex")).toBe("#ffffff");
  });
});
