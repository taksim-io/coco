# Contributing

Please don't edit `/dist/taksim-coco.js` and `/dist/taksim-coco.min.js` files. You'll find source code in the `src` folder.

1. Fork and clone the repo.
2. Run `npm install`.
3. Create a new branch, please don't work in your `master` branch directly.
4. Open the file `/src/index.js`.
5. Make your changes.
6. Update the tests, check console output. Tests should run automatically whenever you save a file. If this is not the case, use `gulp test` command to run manually.
7. Update the documentation to reflect any changes.
8. Push to your fork and submit a pull request.


## Code style
Please follow [airbnb conventions](https://github.com/airbnb/javascript). Here is a quick reference;

* Use semicolons;
* Commas last,
* 2 spaces for indentation (no tabs)
* Prefer `'` over `"`
* `'use strict';`
* 80 characters line length
* No trailing spaces.