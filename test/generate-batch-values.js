import { coco } from "../dist/taksim-coco.js";

const x11 = ["black", "white", "gray", "red", "blue", "green", "yellow"];

const colors = {
  black: "rgb(0, 0, 0)",
  nearBlack: "rgb(1, 1, 1)",
  white: "rgb(255, 255, 255)",
  nearWhite: "rgb(254, 254, 254)",
  midGray: "rgb(128, 128, 128)",
  darkGray: "rgb(26, 26, 26)",
  red: "rgb(255, 0, 0)",
  green: "rgb(0, 255, 0)",
  blue: "rgb(0, 0, 255)",
  yellow: "rgb(255, 255, 0)",
  cyan: "rgb(0, 255, 255)",
  purple: "rgb(128, 0, 255)",
  lightPurple: "rgb(153, 102, 255)",
  magenta: "rgb(255, 0, 255)",
  neonGreen: "rgb(57, 255, 20)",
  neonPink: "rgb(255, 20, 147)",
  electricBlue: "rgb(0, 153, 255)",
  dustyRose: "rgb(201, 127, 140)",
  oliveDrab: "rgb(107, 142, 35)",
  midnightBlue: "rgb(25, 25, 112)",
  darkOliveGreen: "rgb(85, 107, 47)",
  saddleBrown: "rgb(139, 69, 19)",
};

const formats = [
  "x11",
  "hex3",
  "hex6",
  "hex4",
  "hex8",
  "rgb",
  "hsl",
  "hsv",
  "xyz",
  "lab",
  "lch",
  "oklab",
  "oklch",
];

console.log("const colors: Record<string, Record<string, string>> = {");
for (const [name, rgb] of Object.entries(colors)) {
  console.log(`  ${name}: {`);

  // Solid
  formats.forEach((f) => {
    if (f === "x11") {
      let val = x11.find((c) => c === name);

      if (val) {
        console.log(`    ${f}: "${val}",`);
      }

      return;
    }

    let val = coco(rgb, f);
    if (!val && f.startsWith("hex")) {
      if (f === "hex3") val = coco(rgb, "hex6");
      if (f === "hex4") val = coco(rgb, "hex8");
    }
    console.log(`    ${f}: "${val}",`);
  });

  // Alpha 0.8
  const rgb80 = rgb.replace(")", ", 0.8)").replace("rgb", "rgba");

  formats.forEach((f) => {
    if (f === "x11") {
      return;
    }

    const key = `${f}_80`;
    let val = coco(rgb80, f);

    if (f.startsWith("hex")) {
      if (f === "hex3") val = undefined;
      if (f === "hex6") val = undefined;

      if (!val) {
        if (f === "hex4") val = coco(rgb80, "hex8");
      }
    }

    if (val) {
      console.log(`    ${key}: "${val}",`);
    }
  });
  console.log("  },");
}
console.log("};");
