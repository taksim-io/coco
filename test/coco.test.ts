import { describe, it, expect } from "vitest";
import {
  coco,
  isColor,
  getSpace,
  getAlpha,
  isEqual,
  hue2hex,
  hue2rgb,
  hue2hsl,
  createCoco,
} from "../src/coco";

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
    expect(isColor("oklch(0.6 0.1 0)")).toBe(true);
  });

  it("converts oklch to hex (round trip check)", () => {
    const input = "oklch(0.6279 0.2576 29.2338)";
    const hex = coco(input, "hex");
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("validates isColor", () => {
    expect(isColor("rgb(0,0,0)")).toBe(true);
    expect(isColor("foo")).toBe(false);
  });

  it("identifies space", () => {
    expect(getSpace("rgb(0,0,0)")).toBe("rgb");
    expect(getSpace("#fff")).toBe("hex");
    expect(getSpace("oklch(0 0 0)")).toBe("oklch");
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
      expect(hue2rgb(120)).toEqual([0, 255, 0, 1]);
    });
    it("converts hue to hsl", () => {
      expect(hue2hsl(120)).toEqual([120, 100, 50, 1]);
    });
  });

  describe("isEqual", () => {
    it("compares same colors", () => {
      expect(isEqual("red", "#f00")).toBe(true);
      expect(isEqual("rgb(255, 0, 0)", "hsl(0, 100%, 50%)")).toBe(true);
    });
    it("compares different colors", () => {
      expect(isEqual("red", "blue")).toBe(false);
    });
  });

  describe("getAlpha", () => {
    it("gets alpha from rgba", () => {
      expect(getAlpha("rgba(0,0,0,0.5)")).toBe(0.5);
    });
    it("gets alpha from hex8", () => {
      // #ff000080 -> 128/255 ~= 0.5019
      const a = getAlpha("#ff000080");
      expect(a).toBeCloseTo(0.5019, 2);
    });
    it("gets alpha defaulting to 1", () => {
      expect(getAlpha("red")).toBe(1);
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
