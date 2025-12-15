# coco

Coco is a fast, lightweight, and modern JavaScript color manipulation library. It supports conversion between various formats including Hex, RGB, HSL, HSV, and modern color spaces like OKLCH. It is written in TypeScript and has zero dependencies.

> [!IMPORTANT]
> **v2.0.0 Released**: This version introduces breaking changes including stricter alpha precision (3 decimals), improved hue normalization, and minified outputs. Please check the [Changelog](CHANGELOG.md).

## Installation

```bash
npm install taksim-coco
```

## Usage

Coco provides a simple, unified API for parsing and converting colors.

```ts
import { coco } from "taksim-coco";

// Basic conversion to Hex (default)
coco("rgb(255, 0, 0)"); // '#ff0000'

// Convert to specific formats
coco("#f00", "hsl"); // 'hsl(0, 100%, 50%)'
coco("oklch(60% 0.1 180)", "hex"); // '#009a7b'
coco("hsl(120, 100%, 50%)", "oklch"); // 'oklch(0.866 0.29 142.5)'

// Convert to all supported formats (returns an object)
coco("#f00", "all"); // { name: 'red', rgb: 'rgb(255, 0, 0)', ... }
```

### Supported Formats

Pass these format strings as the second argument to `coco(color, format)`:

- `'hex'`: Automatic Hex (defaults to 6 digits, or 8 with alpha)
- `'hex3'`: 3-digit Hex (e.g. `#f00`)
- `'hex4'`: 4-digit Hex with Alpha (e.g. `#f00c`)
- `'hex6'`: 6-digit Hex (e.g. `#ff0000`)
- `'hex8'`: 8-digit Hex with Alpha (e.g. `#ff0000cc`)
- `'rgb'`: RGB/RGBA (e.g. `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)`)
- `'hsl'`: HSL/HSLA (e.g. `hsl(0, 100%, 50%)`, `hsla(0, 100%, 50%, 0.5)`)
- `'hsv'`: HSV/HSVA (e.g. `hsv(0, 100%, 100%)`, `hsva(0, 100%, 100%, 0.5)`)
- `'oklch'`: OKLCH (e.g. `oklch(0.6 0.2 250)`, `oklch(60% 0.25 350 / 0.5)`)
- `'oklab'`: OKLab (e.g. `oklab(0.63 0.22 0.12)`, `oklab(0.6 0.2 0.1 / 0.5)`)
- `'lab'`: Lab (e.g. `lab(53 80 67)`, `lab(53 80 67 / 0.5)`)
- `'lch'`: LCH (e.g. `lch(53 104 40)`, `lch(53 104 40 / 0.5)`)
- `'xyz'`: XYZ (e.g. `color(xyz 0.41 0.21 0.02)`, `color(xyz 0.4 0.2 0.02 / 0.5)`)
- `'name'`: Named Color (e.g. `red`, `blue`). Requires `namedColors` configuration. Returns undefined if no name is found.
- `'all'`: Returns an object containing all valid conversions for a given color.

### Utility Methods

- `coco.isColor(input)`: Check if a string is a valid color.
- `coco.getType(input)`: Get the format type (e.g. `'rgb'`, `'hex'`, `'name'`).
- `coco.getAlpha(input)`: Get the alpha channel value (0-1).
- `coco.setAlpha(input, alpha)`: Set the alpha channel (0-1). returns updated string.
- `coco.hasAlpha(input)`: Check if the color has an alpha channel.
- `coco.removeAlpha(input)`: Remove the alpha channel (sets to 1).
- `coco.isEqual(c1, c2)`: Compare two colors for equality.

```ts
// Check if a string is a valid color
coco.isColor("#ff0000"); // true
coco.isColor("invalid"); // false

// Get the format of a color string
coco.getType("rgba(0,0,0,1)"); // 'rgb'
coco.getType("oklch(0.5 0.1 100)"); // 'oklch'

// Get alpha channel (0-1)
coco.getAlpha("rgba(0, 0, 0, 0.5)"); // 0.5
coco.getAlpha("#ff000080"); // 0.502
coco.getAlpha("red"); // 1

// Compare colors (converts to RGB for comparison)
coco.isEqual("#f00", "#ff0000"); // true
coco.isEqual("rgb(0,0,0)", "hsl(0,0%,0%)"); // true
coco.isEqual("rgba(0,0,0,0.5)", "rgba(0,0,0,1)"); // false
```

### Recipes

Coco is designed to be minimal. Instead of built-in helpers, you can easily create your own:

```ts
// Hue to Hex (Saturation 100%, Lightness 50%)
const hue2hex = (h) => coco(`hsl(${h}, 100%, 50%)`, "hex");

// Hue to RGB (Saturation 100%, Lightness 50%)
const hue2rgb = (h) => coco(`hsl(${h}, 100%, 50%)`, "rgb");
```

### Advanced Usage: Tree Shaking & Custom Config

By default, `coco` does not include the named color map to keep bundle size smaller. If you want to include named colors, a custom color map or a custom name resolver, use `createCoco` factory function.

```ts
import { coco, createCoco, namedColors } from "taksim-coco";

// Default instance (without named colors)
coco("red"); // undefined
coco("#f00"); // '#ff0000'

// Custom instance with named color map
const cocoNamed = createCoco({ namedColors });
cocoNamed("red"); // '#ff0000'
cocoNamed("#f00"); // '#ff0000'

// Custom name resolver
const cocoWithResolver = createCoco({
  nameResolver: (name) => (name === "brand" ? "#00AEEF" : undefined),
  valueResolver: (color) =>
    cocoWithResolver(color.meta?.originalInput, "hex3") === "#00AEEF"
      ? "brand"
      : undefined,
});

cocoWithResolver("brand"); // '#00aeef'
cocoWithResolver("#00aeef", "name"); // 'brand'
cocoWithResolver("rgb(0, 174, 239)", "name"); // 'brand'
cocoWithResolver("rgb(255, 255, 255)", "name"); // undefined
```

If both `nameResolver` and `namedColors` are provided, `nameResolver` takes precedence.

## License

MIT Copyright (c) 2015-2025
