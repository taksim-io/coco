import { describe, it, expect } from "vitest";
import { createCoco, namedColors } from "../src/coco";

const coco = createCoco({ namedColors });

describe("Random Color Conversions", () => {
  it("Validates specific conversions", () => {
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
      "oklch(0.64 0.217 294.866)"
    );
  });
});
