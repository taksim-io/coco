import { describe, expect, it } from "vitest";
import { createCoco } from "../src";

describe("Factory Configuration", () => {
  it("does not support named colors by default", () => {
    const leanCoco = createCoco();
    expect(leanCoco("red")).toBe(undefined);
  });

  it("supports custom resolver", () => {
    const cocoWithNameResolver = createCoco({
      nameResolver: (n: string) => (n === "mycolor" ? "f00" : undefined),
    });
    expect(cocoWithNameResolver("mycolor", "hex")).toBe("#ff0000");
  });
});
