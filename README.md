# coco

coco is a fast and lightweight javascript library that focuses on color conversions between hex, rgb, hsl and hsv formats. It has no dependencies and you can use it both client and server side to handle different color syntaxes easily. It's also ready for 8 digit hex notation of CSS4, but the requirements and definition of this feature is in [editor's draft](https://github.com/airbnb/javascript) status which will be updated frequently. So don't use hex8/hex4 notation in production until things get more clear.

## Installation

### Server

Install it as a [node](http://nodejs.org/) module via [npm](https://www.npmjs.com/).

    npm install taksim-coco

and include in a file;

```js
var coco = require('taksim-coco');
```

### Client

You can pull down coco using [Bower](http://bower.io/)

    bower install taksim-coco

or just download the latest minified version [here](https://raw.githubusercontent.com/taksim-io/coco/master/dist/taksim-coco.min.js) and include it your document.

```html
<script type='text/javascript' src='taksim-coco.min.js'></script>
```

## Usage

### <a name="coco"></a>coco(color:string, format:string)

* color should have a valid syntax. 
  * `#f00` or `#ff0000`
  * `rgb(255, 0, 0)`
  * `hsl(0, 100%, 50%)`
  * `hsv(0, 100%, 100%)`
* format should be one of the supported types; `name, hex, hex3, hex6, hex4, hex8, rgb, hsl, hsv`
  * `name` refers to the [x11 colors](http://www.w3.org/TR/css3-color/#svg-color).
  * `hex4, hex8` is only available if you call [coco.supportCss4(#supportCss4)]() explicitly. 

```js
coco('#f00', 'name') //red
coco('#f00', 'hex6') //#ff0000
coco('#ff0000", 'hex3') //#f00
coco('#ff0000", 'rgb') //rgb(255, 0, 0)
coco('rgba(255, 0, 0, 0.5)', 'hsl') //hsla(0, 100%, 50%, 0.5)

// Hex format returns hex3 representation if available.
coco('rgba(255, 0, 0, 0.5)', 'hex') //#f00
coco('rgba(255, 10, 50, 0.5)', 'hex') //#ff6432

// If input color is not defined in x11 colors, it will be converted to hex.
coco('rgba(255, 10, 50, 0.5)', 'name') //#ff6432

// Alpha is removed automatically when it is equal to 1
coco('hsla(0, 100%, 50%, 1)', 'hsv') //hsv(0, 100%, 100%)

// Any invalid color string returns the representation of black in the requested format.
coco('f00', 'hsl') //hsl(0, 0%, 0%)
coco('(255, 0, 0)', 'hex') //#000

// If the format is unknown, input color string will return as it is.
coco('rgb(255, 0, 0)', 'rgba') //rgb(255, 0, 0)
coco('red', 'cmyk') //red
```
### Conversion Methods

There are plenty of specific conversion methods attached to [coco()](#coco) function and they don't require a valid syntax unlike [coco()](#coco). The naming of these methods follow a simple convention: inputFormat2outputFormat, e.g. `coco.rgb2hsl` or `coco.name2hex`. So, we can commonize some of the rules;

* All 2rgb (except [percentage2rgb()](#percentage2rgb)), 2hsl and 2hsv methods return a color array like `[255, 0, 0, 1]`
```js
coco.hex2rgb('#f00') //[255, 0, 0, 1]
coco.rgb2hsl('rgba(255, 0, 0, 0.5)') //[0, 100, 50, 0.5]
```
* All rgb2, hsl2 and hsv2 methods accept a string or an array.
```js
coco.rgb2hex([255, 0, 0, 1]) //#f00
coco.rgb2hex('rgba(255, 0, 0, 0.5)') //#f00
```
* All 2hex and 2name methods return a string.
```js
coco.hsv2hex([0, 100, 100) //#f00
coco.rgb2name('rgb(255, 0, 0)') //red
```
* All hex2 and name2 methods accept a string.
```js
coco.hex2name('#f00') //red
coco.name2rgb('red') //[255, 0, 0, 1]

// Because hex2hex6 and hex2hex3 are misleading method names, 
// I prefer to use hex2Short and hex2Long.
coco.hex2Long('#f00') //#ff0000
coco.hex2Short('#ff0000') //#f00
```
* These methods don't expect a valid color string, which means that they should return the correct result even if the input string has a typo.
```js
coco.hex2name('f00') //red
coco.rgb2hsl('rg(255, 0, 0, 0.5)') //[0, 100, 50, 0.5]
coco.rgb2hsl('255,0,0,.5') //[0, 100, 50, 0.5]
coco.rgb2hex('255') //#f00
coco.rgb2hex('255, 255') //#ff0
```

All conversion methods are as follows;
* `rgb2hex, hsl2hex, hsv2hex, name2hex, hex2Short, hex2Long`
* `hex2rgb, hsl2rgb, hsv2rgb, name2rgb`
* `hex2hsl, rgb2hsl, hsv2hsl, name2hsl`
* `hex2hsv, hsl2hsv, rgb2hsv, name2hsv`
* `hex2name, rgb2name, hsl2name, hsv2name`

<a name="percentage2rgb"></a> `percentage2rgb()` is a helper method that allows coco to cover percentage based rgb colors.

```js
// If we directly pass a percentage based rgb color to a conversion method,
// it will be evaluated as it contains reqular rgb values.
coco.rgb2hex('rgb(100%, 0%, 0%)') //#640000

// To get the correct result first convert it to regular rgb syntax.
var rgbStr = coco.percentage2rgb('rgb(100%, 0%, 0%)'); //rgb(255, 0, 0)
coco.rgb2hex(rgbStr) //red
```

### Hue Conversions

By supplying a hue number between [0-360], you can get the color of hue space.

```js
coco.hue2name(120) //lime
coco.hue2hex(120) //#0f0
coco.hue2rgb(120) //[0, 255, 0, 1]
coco.hue2hsl(120) //[120, 100, 50, 1]
coco.hue2hsv(120) //[120, 100, 100, 1]

// To extract the hue value from a color, just convert it
// to hsl or hsv and select first item of the returned array.
coco.hex2hsl('#0f0')[0] //120
```

### Color String and Array Conversions

```js
coco.rgbStr([255, 0, 0, 1]) //rgb(255, 0, 0)
coco.rgbStr([255, 0, 0, 0.5]) //rgba(255, 0, 0, 0.5)
coco.hslStr([0, 100, 50]) //hsl(0, 100%, 50%)
coco.hsvStr([0, 100, 100]) //hsv(0, 100%, 100%)

coco.toString([255, 0, 0, 1], 'rgb') //rgb(255, 0, 0)

coco.toArray('rgb(255, 0, 0)') //[255, 0, 0, 1]
coco.toArray('255') //[255, 0, 0, 1]
```

## License

MIT Copyright (c) 2015 taksim.io