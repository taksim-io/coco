# coco

Coco is a fast, lightweight, and modern JavaScript color manipulation library. It supports conversion between various formats including Hex, RGB, HSL, HSV, and modern color spaces like OKLCH. It is written in TypeScript and has zero dependencies.

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

// For named colors (e.g. "red", "blue"), see "Named Colors" section below.
```

### Supported Formats

- **Hex** (3, 4, 6, and 8 digits): `#f00`, `#ff0000`, `#f00c` (with alpha)
- **RGB**: `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)`
- **HSL**: `hsl(0, 100%, 50%)`, `hsla(...)`
- **HSV**: `hsv(0, 100%, 100%)`
- **OKLCH**: `oklch(0.5 0.2 250)`, `oklch(50% 0.2 250)`
- **OKLab**: `oklab(0.63 0.22 0.12)`
- **Lab**: `lab(53 80 67)`
- **LCH**: `lch(53 104 40)`
- **XYZ**: `color(xyz 0.41 0.21 0.02)`
- **X11 Names**: `red`, `blue`, etc. (Requires opt-in configuration)

### Utility Methods

- `coco.isColor(input)`: Check if a string is a valid color.
- `coco.getType(input)`: Get the format type (e.g. `'rgb'`, `'hex'`, `'x11'`).
- `coco.getAlpha(input)`: Get the alpha channel value (0-1).
- `coco.setAlpha(input, alpha)`: Set the alpha channel (0-1). returns updated string.
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
coco.getAlpha("#ff000080"); // 0.5 (approx)
coco.getAlpha("red"); // 1

// Compare colors (converts to RGB for comparison)
coco.isEqual("#f00", "#ff0000"); // true
coco.isEqual("rgb(0,0,0)", "hsl(0,0%,0%)"); // true
coco.isEqual("rgba(0,0,0,0.5)", "rgba(0,0,0,1)"); // false
```

### Hue Helpers

Coco includes utilities to convert a hue angle (0-360) directly to other formats using saturation=100%, lightness=50% (for HSL) or value=100% (for HSV).

```ts
import {
  hue2hex,
  hue2rgb,
  hue2hsl,
  hue2hsv,
  hue2oklch,
  hue2lch,
  hue2lab,
  hue2xyz,
  hue2oklab,
} from "taksim-coco";

hue2hex(0); // '#ff0000' (Red)
hue2rgb(120); // 'rgb(0, 255, 0)' (Green)
hue2hsl(240); // 'hsl(240, 100%, 50%)' (Blue)
hue2hsv(300); // 'hsv(300, 100%, 100%)' (Magenta)
hue2oklch(180); // 'oklch(0.7 0.2 180)' (Cyan-ish)
hue2lch(40); // 'lch(53 104 40)' (Orange-ish)
hue2lab(0); // 'lab(53 80 67)' (Red-ish)
hue2xyz(120); // 'color(xyz 0.41 0.21 0.02)'
hue2oklab(0); // 'oklab(0.7 0.2 0.12)'
```

### Advanced Usage: Tree Shaking & Custom Config

By default, `coco` does not include the X11 named color map to keep bundle size smaller. If you want to include named colors, a custom color map or a custom name resolver, use `createCoco` factory function.

```ts
import { createCoco, namedColors } from "taksim-coco";

// Default instance (without named colors)
coco("red"); // undefined
coco("#f00"); // '#ff0000'

// Custom instance with named color map
const cocoNamed = createCoco({ namedColors });
cocoNamed("red"); // '#ff0000'
cocoNamed("#f00"); // '#ff0000'

// Custom name resolver
const myCoco = createCoco({
  nameResolver: (name) => (name === "brand" ? "#00AEEF" : undefined),
});

myCoco("brand"); // '#00aeef'
```

If both `nameResolver` and `namedColors` are provided, `nameResolver` takes precedence.

## License

MIT Copyright (c) 2015-2025 taksim.io
