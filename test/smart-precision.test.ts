import { describe, it, expect } from "vitest";
import { createCoco } from "../src/coco";

const coco = createCoco();

describe("Smart Precision", () => {
  it("preserves high precision input for HSL", () => {
    // Default is 2 decimals
    expect(coco("hsl(0, 0%, 50.12345%)", "hsl")).toBe("hsl(0, 0%, 50.12345%)");
    expect(coco("hsl(120.123, 50%, 50%)", "hsl")).toBe(
      "hsl(120.123, 50%, 50%)"
    );
  });

  it("preserves high precision input for OKLCH", () => {
    // Default is 3 decimals
    expect(coco("oklch(0.5 0.2 30.123456)", "oklch")).toBe(
      "oklch(0.5 0.2 30.123456)"
    );
  });

  it("preserves high precision input for Lab", () => {
    // Default is 3 decimals
    expect(coco("lab(50.1234 10.5 20.12345)", "lab")).toBe(
      "lab(50.1234 10.5 20.12345)"
    );
  });

  it("falls back to default precision for low precision inputs", () => {
    // hex inputs have 0 decimals detected
    expect(coco("#808080", "hsl")).toBe("hsl(0, 0%, 50.196%)"); // Default 2
    expect(coco("#808080", "lab")).toBe("lab(53.585 0 0)"); // Default 3
  });
});
