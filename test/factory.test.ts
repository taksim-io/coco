import { describe, expect, it } from "vitest";
import { createCoco } from "../src";

describe("Factory Configuration", () => {
  it("does not support named colors by default", () => {
    const leanCoco = createCoco();
    expect(leanCoco("red")).toBe(undefined);
  });

  it("supports custom name resolvers", () => {
    const cocoWithResolver = createCoco({
      nameResolver: (name) => (name === "mycolor" ? "#f00" : undefined),
      valueResolver: (color) => {
        return cocoWithResolver(color.meta?.originalInput, "hex3") === "#f00"
          ? "mycolor"
          : undefined;
      },
    });
    expect(cocoWithResolver("mycolor", "hex")).toBe("#ff0000");
    expect(cocoWithResolver("#ff0000", "name")).toBe("mycolor");
    expect(cocoWithResolver("rgb(255, 0, 0)", "name")).toBe("mycolor");
    expect(cocoWithResolver("rgb(255, 255, 255)", "name")).toBeUndefined();
    expect(cocoWithResolver("rgb(0, 255, 0)", "name")).toBeUndefined();
  });
});
