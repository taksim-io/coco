# Changelog

## [2.1.1] - 2025-12-15

### Updated

- Updated dependencies to latest versions.

### Fixed

- **Named Color Consistency**: Resolved ambiguity in reverse named color lookups. The library now deterministically returns the canonical name (e.g., `grey` instead of `gray`, `cyan` instead of `aqua`) when converting to "name".
- **Named Color Parsing**: "Name" target format is now correctly handled in the core conversion logic.

## [2.1.0] - 2025-12-15

### Added

- **Conversion to All Formats**: New `coco(color, "all")` signature returns an object containing all valid conversions for a given color.
- **Alpha Check**: New `coco.hasAlpha(value)` utility method to check for transparency.
- **Reverse Resolve Configuration**: Added `valueResolver` to configuration to allow custom logic when resolving colors back to names.
- **Improved Type Exports**: All core types are now exported from the root entry point.

### Fixed

- **Named Color Consistency**: Resolved ambiguity in reverse named color lookups. The library now deterministically returns the canonical name (e.g., `grey` instead of `gray`, `cyan` instead of `aqua`) when converting to "name".
- **Named Color Parsing**: "Name" target format is now correctly handled in the core conversion logic.

## [2.0.0] - 2025-12-13

### ⚠️ Breaking Changes

- **Alpha Precision**: Default serialization now enforces 3-decimal precision for alpha values (e.g., `#ff000080` -> `0.502`). API methods like `coco.getAlpha` now match this precision.
- **Hue Normalization**: `hue2*` helpers and internal converters now correctly wrap hue angles (e.g., `370°` -> `10°`) instead of clamping them.
- **Strict Validation**: Input strings are parsed more strictly. `rgba(0,0,0,1.5)` now clamps alpha to 1.
- **Build Artifacts**: Distribution files are now fully minified.

### Added

- **TypeScript Support**: Bundled type definitions (`.d.ts`) are now generated automatically. No more `no implicit any` errors!
- **Smart Precision**: Inputs with high precision (e.g., `hsl(0, 50.12345%, 50%)`) now preserve that precision in the output, while standard inputs fall back to clean defaults.

### Removed

- **Specific Converters**: Removed all `*2*` methods (e.g., `rgb2hex`, `hex2hsl`, `name2rgb`). Use `coco(value, targetFormat)` or the new `convert` function instead.
- **Validation Helpers**: Removed specific validators like `isHex`, `isRgb`, `isHsl`, `isHexShort`, `isHexLong`. Use `coco.isColor(value)` or check `coco.getType(value)`.
- **String/Array Helpers**: Removed `coco.toString(array, format)`, `coco.toArray(string)`, `coco.rgbStr`, etc.
- **Utilities**: Removed `coco.replace`, `coco.format` (replaced by `getType`), `coco.isAlpha`.
- **Configuration**: Removed `coco.supportHex8()` and `coco.unsupportHex8()`. Hex8 support is now enabled by default.
