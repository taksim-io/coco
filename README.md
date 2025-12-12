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
coco("blue", "rgb"); // 'rgb(0, 0, 255)'
coco("#f00", "hsl"); // 'hsl(0, 100%, 50%)'
coco("red", "oklch"); // 'oklch(0.628 0.258 29.234)'

// Any-to-Any Conversion
// You can convert from any supported format to any other.
coco("oklch(60% 0.1 180)", "hex"); // '#009a7b'
coco("hsl(120, 100%, 50%)", "oklch"); // 'oklch(0.866 0.29 142.5)'
```

### Supported Formats

- **Hex** (3, 4, 6, and 8 digits): `#f00`, `#ff0000`, `#f00c` (with alpha)
- **RGB**: `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)`
- **HSL**: `hsl(0, 100%, 50%)`, `hsla(...)`
- **HSV**: `hsv(0, 100%, 100%)`
- **OKLCH**: `oklch(0.5 0.2 250)`, `oklch(50% 0.2 250)`
- **X11 Names**: `red`, `blue`, `papayawhip`, etc.

### Validation Helpers

Coco exposes static methods for validation.

```ts
// Check if a string is a valid color
isColor("#ff0000"); // true
isColor("invalid"); // false

// Get the format of a color string
getSpace("rgba(0,0,0,1)"); // 'rgb'
getSpace("oklch(0.5 0.1 100)"); // 'oklch'
```

### Advanced Usage: Tree Shaking & Custom Config

By default, `coco` includes the X11 named color map. If you want a smaller bundle or custom color names, use `createCoco`.

```ts
import { createCoco } from "taksim-coco";

// Lean instance (no named colors)
const cocoLean = createCoco({});
cocoLean("red"); // undefined
cocoLean("#f00"); // '#ff0000'

// Custom configuration
const myCoco = createCoco({
  nameResolver: (name) => (name === "brand" ? "#00AEEF" : undefined),
});
myCoco("brand"); // '#00aeef'
```

## License

MIT Copyright (c) 2015-2025 taksim.io
