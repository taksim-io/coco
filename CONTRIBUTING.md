# Contributing to Coco

First off, thanks for taking the time to contribute! 🎉

We want to make contributing to this project as easy and transparent as possible.

## Getting Started

1.  **Fork** the repo on GitHub.
2.  **Clone** the project to your own machine.
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development Workflow

1.  **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-new-color-space
    ```
2.  **Develop** in the `src` directory.
    - `src/data`: Named colors and static data.
    - `src/spaces`: Color space parsers and serializers (e.g., `hsl.ts`, `oklch.ts`).
    - `src/core`: Core conversion logic and types.
3.  **Test** your changes.
    - Run tests in watch mode while you work:
      ```bash
      npm test
      ```
    - Add new tests to `test/` for any new functionality.

## Testing & Verification

We use **Vitest** for testing.

- **Run all tests**: `npm test`
- **Run coverage**: `npm run coverage`

Please ensure all tests pass before submitting your PR. If you are fixing a bug, please include a regression test.

## Coding Style

This project uses **Prettier** and **ESLint** to ensure code consistency.

- **Format code**:
  ```bash
  npm run format
  ```
- **Lint code**:
  ```bash
  npm run lint
  ```

### Guidelines

- Use **TypeScript** for everything.
- Prefer functional implementations over classes where possible.
- Keep dependencies minimal (or zero, if possible).

## Building

To build the distribution files (including minified outputs and type definitions):

```bash
npm run build
```

This generates:

- `dist/f12io-coco.js` (ESM)
- `dist/f12io-coco.cjs` (CommonJS)
- `dist/f12io-coco.umd.cjs` (UMD)
- `dist/f12io-coco.d.ts` (TypeScript Declarations)

## Submitting a Pull Request

1.  Push to your fork.
2.  Submit a Pull Request against the `master` branch.
3.  Describe your changes in detail in the PR description.

Thank you for your contributions!
