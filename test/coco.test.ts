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

const coco = createCoco({ namedColors });

describe("coco", () => {
  it("parses and serializes hex", () => {
    expect(coco("#ff0000", "hex")).toBe("#ff0000");
    expect(coco("#f00", "hex")).toBe("#ff0000"); // canonical
  });

  it("converts hex to rgb", () =>
    expect(coco("#ff0000", "rgb")).toBe("rgb(255, 0, 0)"));

  it("converts rgb to hex", () =>
    expect(coco("rgb(255, 0, 0)", "hex")).toBe("#ff0000"));

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
    it("converts hue to xyz", () => {
      // 120 -> green-ish in XYZ
      expect(hue2xyz(120)).toMatch(/^color\(xyz/);
    });
    it("converts hue to lab", () => {
      // 0 -> red-ish
      expect(hue2lab(0)).toMatch(/^lab\(53/);
    });
    it("converts hue to lch", () => {
      // 40 -> orange-ish default
      expect(hue2lch(40)).toBe("lch(53 104 40)");
    });
    it("converts hue to oklab", () => {
      expect(hue2oklab(0)).toMatch(/^oklab\(0.7/);
    });
  });

  describe("setAlpha / removeAlpha", () => {
    it("sets alpha on named color (rgb)", () => {
      // red -> rgb(255,0,0) -> setAlpha(0.5) -> rgba(255, 0, 0, 0.5)
      expect(coco.setAlpha("red", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
    });
    it("sets alpha on hex (returns hex8)", () => {
      // #f00 -> #ff0000 -> setAlpha(0.5) -> #ff000080
      expect(coco.setAlpha("#f00", 0.5)).toBe("#ff000080");
    });
    it("sets alpha on rgb", () => {
      expect(coco.setAlpha("rgb(0, 0, 0)", 0.5)).toBe("rgba(0, 0, 0, 0.5)");
    });
    it("updates existing alpha", () => {
      expect(coco.setAlpha("rgba(0, 0, 0, 0.5)", 0.8)).toBe(
        "rgba(0, 0, 0, 0.8)"
      );
    });
    it("removes alpha from rgba", () => {
      expect(coco.removeAlpha("rgba(0, 0, 0, 0.5)")).toBe("rgb(0, 0, 0)");
    });
    it("removes alpha from hex8", () => {
      expect(coco.removeAlpha("#ff000080")).toBe("#ff0000");
    });
    it("works with hsl", () => {
      expect(coco.setAlpha("hsl(0, 50%, 50%)", 0.2)).toBe(
        "hsla(0, 50%, 50%, 0.2)"
      );
      expect(coco.removeAlpha("hsla(0, 50%, 50%, 0.5)")).toBe(
        "hsl(0, 50%, 50%)"
      );
    });
    it("works with oklch", () => {
      // oklch doesn't have legacy syntax issues so just check output
      const res = coco.setAlpha("oklch(0.5 0.2 180)", 0.5);
      expect(res).toBe("oklch(0.5 0.2 180 / 0.5)");
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

  describe("Colors", () => {
    it("Colors", () => {
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

describe("factory configuration", () => {
  it("does not support x11 names", () => {
    const leanCoco = createCoco();
    expect(leanCoco("red")).toBe(undefined);
    expect(leanCoco("#fff")).toBe("#ffffff");
  });

  it("supports custom named colors", () => {
    const cocoWithNamedColors = createCoco({ namedColors });
    expect(cocoWithNamedColors("red")).toBe("#ff0000");
    expect(cocoWithNamedColors("#fff")).toBe("#ffffff");
  });

  it("supports custom resolver", () => {
    const cocoWithNameResolver = createCoco({
      nameResolver: (n: string) => (n === "mycolor" ? "fff" : undefined),
    });
    expect(cocoWithNameResolver("mycolor", "hex")).toBe("#ffffff");
  });
});

describe("Edge Cases", () => {
  describe("Out of range inputs (Clamping)", () => {
    it("clamps negative RGB values to 0", () => {
      // Legacy: expect(coco.rgb2hex([-1, -1, -1])).to.equal('#000');
      expect(coco("rgb(-1, -1, -1)", "hex")).toBe("#000000"); // hex6 default
    });

    it("clamps RGB values > 255 to 255", () => {
      // Legacy: expect(coco.rgb2hex([256, 256, 256])).to.equal('#fff');
      expect(coco("rgb(256, 256, 256)", "hex")).toBe("#ffffff");
    });

    it("clamps negative HSL values", () => {
      // Legacy: expect(coco.hsl2hex([-1, -1, -1])).to.equal('#000');
      // Implies s and l are clamped. Hue -1 wraps to 359 (or 360->0).
      // If s=-1 -> 0%, l=-1 -> 0%. HSL(359, 0%, 0%) -> Black.
      expect(coco("hsl(-1, -1%, -1%)", "hex")).toBe("#000000");
    });

    it("clamps HSL values > 100%", () => {
      // Legacy: expect(coco.hsl2hex([361, 101, 101])).to.equal('#fff');
      // Hue 361 -> 1. s=101->100, l=101->100. HSL(1, 100%, 100%) -> White.
      expect(coco("hsl(361, 101%, 101%)", "hex")).toBe("#ffffff");
    });

    it("parses negative values in xyz", () => {
      // Valid XYZ can be negative (though rare in display P3/sRGB gamut, mathematically valid)
      // color(xyz -0.1 0.2 0.3)
      const res = coco("color(xyz -0.1 0.2 0.3)", "xyz");
      expect(res).toBe("color(xyz -0.1 0.2 0.3)");
    });

    it("parses negative values in lab", () => {
      // lab(50 -20 -30) is valid
      expect(coco("lab(50 -20 -30)", "lab")).toBe("lab(50 -20 -30)");
      // Test regex with signs
      expect(coco.isColor("lab(50 +20 -30)")).toBe(true);
    });

    it("normalizes negative hue in lch", () => {
      // lch(50 50 -90) -> hue 270
      const res = coco("lch(50 50 -90)", "lch");
      expect(res).toBe("lch(50 50 270)");
    });

    it("parses negative values in oklab", () => {
      expect(coco("oklab(0.5 -0.1 -0.1)", "oklab")).toBe(
        "oklab(0.5 -0.1 -0.1)"
      );
    });

    it("parses signed values in oklch", () => {
      // oklch(0.5 0.1 -90) -> hue 270
      const res = coco("oklch(0.5 0.1 -90)", "oklch");
      expect(res).toBe("oklch(0.5 0.1 270)");
    });

    it("parses signed values in hsv", () => {
      // hsv(0, 0, 0)
      expect(coco.isColor("hsv(-120, 100%, 50%)")).toBe(true);
      // Normalized: -120 -> 240
      expect(coco("hsv(-120, 100%, 50%)", "hsv")).toBe("hsv(240, 100%, 50%)");
    });
  });

  describe("Hue Rotation & Normalization", () => {
    it("normalizes negative hue", () => {
      // expect(coco.hue2rgb(-1)).to.deep.equal([255, 0, 0, 1]);
      // hsl(-1, 100%, 50%)
      const res = coco("hsl(-1, 100%, 50%)", "hex");
      // -1 wraps to 359. HSL(359, 100%, 50%) is Red (ff000x).
      expect(res).toMatch(/^#ff[0-9a-f]{4}$/);
    });

    it("normalizes hue > 360", () => {
      // 361 % 360 = 1.
      const res = coco("hsl(361, 100%, 50%)", "hex");
      expect(res).toMatch(/^#ff[0-9a-f]{4}$/); // Red-ish
    });
  });

  describe("Invalid/Malformed Inputs", () => {
    it("returns undefined for totally invalid input", () =>
      expect(coco("invalid_color")).toBe(undefined));

    it("returns undefined for garbage rgb string", () =>
      expect(coco("rgb(foo, bar, baz)")).toBe(undefined));

    it("does not support raw comma numbers by default", () =>
      expect(coco("75, 79, 33")).toBe(undefined));
  });

  describe("Alpha Edge Cases", () => {
    it("handles alpha > 1 in input", () =>
      expect(coco("rgba(0, 0, 0, 1.5)", "hex8")).toBe("#000000ff"));

    it("handles negative alpha", () =>
      expect(coco("rgba(0,0,0,-0.5)", "hex8")).toBe("#00000000"));
  });
});
