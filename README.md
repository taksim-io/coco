# coco

coco is a fast and lightweight javascript library that focuses on color conversions between hex, rgb, hsl and hsv formats. It has no dependencies and you can use it both client and server side to handle different color syntaxes easily. It's also ready for 8 digit hex notation of CSS4, but the requirements and definition of this feature are in [editor's draft](https://github.com/airbnb/javascript) status which will be updated frequently. So don't use hex8/hex4 notation in production until things get more clear.

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

or just [download](https://raw.githubusercontent.com/taksim-io/coco/master/dist/taksim-coco.min.js) the latest minified version and include in your document.

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
  * `hex4, hex8` is only available if you call [coco.supportHex8()](#supportHex8) explicitly. 

```js
coco('#f00', 'name')
=> 'red'

coco('#f00', 'hex6')
=> '#ff0000'

coco('#ff0000', 'hex3')
=> '#f00'

coco('#ff0000', 'rgb')
=> 'rgb(255, 0, 0)'

coco('rgba(255, 0, 0, 0.5)', 'hsl')
=> 'hsla(0, 100%, 50%, 0.5)'

// Hex format returns hex3 representation if available.
coco('rgba(255, 0, 0, 0.5)', 'hex')
=> '#f00'

coco('rgba(255, 10, 50, 0.5)', 'hex')
=> '#ff6432'

// If input color is not defined in x11 colors, it will be converted to hex.
coco('rgba(255, 10, 50, 0.5)', 'name')
=> '#ff6432'

// Alpha is removed automatically when it is equal to 1
coco('hsla(0, 100%, 50%, 1)', 'hsv')
=> 'hsv(0, 100%, 100%)'

// Any invalid color string returns the representation of black in the requested format.
coco('f00', 'hsl')
=> 'hsl(0, 0%, 0%)'

coco('(255, 0, 0)', 'hex')
=> '#000'

// If the format is unknown, input color string will return as it is.
coco('rgb(255, 0, 0)', 'rgba')
=> 'rgb(255, 0, 0)'

coco('red', 'cmyk')
=> 'red'
```
### Conversion Methods

There are plenty of specific conversion methods attached to [coco()](#coco) function and they don't require a valid syntax unlike [coco()](#coco). The naming of these methods follows a simple convention: inputFormat2outputFormat, e.g. `coco.rgb2hsl` or `coco.name2hex`. So, we can commonize some of the rules;

* All 2rgb (except [percentage2rgb()](#percentage2rgb)), 2hsl and 2hsv methods return a color array like `[255, 0, 0, 1]`
```js
coco.hex2rgb('#f00')
=> [255, 0, 0, 1]

coco.rgb2hsl('rgba(255, 0, 0, 0.5)')
=> [0, 100, 50, 0.5]
```
* All rgb2, hsl2 and hsv2 methods accept a string or an array.
```js
coco.rgb2hex([255, 0, 0, 1])
=> '#f00'

coco.rgb2hex('rgba(255, 0, 0, 0.5)')
=> '#f00'
```
* All 2hex and 2name methods return a string.
```js
coco.hsv2hex([0, 100, 100)
=> '#f00'

coco.rgb2name('rgb(255, 0, 0)')
=> 'red'
```
* All hex2 and name2 methods accept a string.
```js
coco.hex2name('#f00')
=> 'red'

coco.name2rgb('red')
=> [255, 0, 0, 1]

// Because hex2hex6 and hex2hex3 are misleading method names, 
// I prefer to use hex2Short and hex2Long.
coco.hex2Long('#f00')
=> '#ff0000'

coco.hex2Short('#ff0000')
=> '#f00'
```
* The conversion methods don't expect a valid color string, which means that they should return (most of the time) the correct result even if the input string has a typo.
```js
coco.hex2name('f00')
=> 'red'

coco.rgb2hsl('rg(255, 0, 0, 0.5)')
=> [0, 100, 50, 0.5]

coco.rgb2hsl('255,0,0,.5')
=> [0, 100, 50, 0.5]

coco.rgb2hex('255')
=> '#f00'

coco.rgb2hex('255, 255')
=> '#ff0'
```
* <a name="percentage2rgb"></a>`coco.percentage2rgb()` is a helper method that allows coco to cover percentage based rgb colors.
```js
// If we directly pass a percentage based rgb color to a conversion method,
// it will be evaluated as it contains reqular rgb values.
coco.rgb2hex('rgb(100%, 0%, 0%)')
=> '#640000'

// To get the correct result, first convert it to regular rgb string.
var rgbStr = coco.percentage2rgb('rgb(100%, 0%, 0%)');
=> 'rgb(255, 0, 0)'

coco.rgb2hex(rgbStr)
=> '#ff0'
```

All conversion methods are as follows;
* `rgb2hex, hsl2hex, hsv2hex, name2hex, hex2Short, hex2Long`
* `hex2rgb, hsl2rgb, hsv2rgb, name2rgb`
* `hex2hsl, rgb2hsl, hsv2hsl, name2hsl`
* `hex2hsv, hsl2hsv, rgb2hsv, name2hsv`
* `hex2name, rgb2name, hsl2name, hsv2name`

### Hue Conversions

By passing a hue angle between 0 and 360 to one the following converters, you can get the hue color.

```js
coco.hue2name(120)
=> 'lime'

coco.hue2hex(120)
=> '#0f0'

coco.hue2rgb(120)
=> [0, 255, 0, 1]

coco.hue2hsl(120)
=> [120, 100, 50, 1]

coco.hue2hsv(120)
=>[120, 100, 100, 1]

// To extract the hue value from a color, just use a 2hsl or 2hsv converter
// and select first item of the returned array.
coco.hex2hsl('#0f0')[0]
=> 120
```

### Conversions Between Color Strings and Arrays

#### coco.toString(color:array, format:string)

```js
coco.toString([255, 0, 0, 1], 'rgb')
=> 'rgb(255, 0, 0)'

// Or you can use following format specific stringifiers.
coco.rgbStr([255, 0, 0, 0.5])
=> 'rgba(255, 0, 0, 0.5)'

coco.hslStr([0, 100, 50])
=> 'hsl(0, 100%, 50%)'

coco.hsvStr([0, 100, 100])
=> 'hsv(0, 100%, 100%)'
```

#### coco.toArray(color:string)

```js
coco.toArray('rgb(255, 0, 0)')
=> [255, 0, 0, 1]

coco.toArray('255')
=> [255, 0, 0, 1]
```

### Format Checks

Following methods test whether the input string is a valid color syntax or not. For more examples you can see [equality unit tests](https://github.com/taksim-io/coco/blob/master/test/test-equality.js).

```js
coco.isHexShort('#f00')
=> true

coco.isHexLong('#ff0000')
=> true

coco.isHex('#ff0000')
=> true

coco.isRgb('rgb(255, 0, 0)')
=> true

// Color strings with alpha parameter can be tested as well.
coco.isRgb('rgba(255, 0, 0, 1)')
=> true

coco.isHsl('hsl(0, 100%, 50%)')
=> true

coco.isHsv('hsv(0, 100%, 50%)')
=> true

coco.isName('red')
=> true

// If you don't know input format, use isColor method.
coco.isColor('rgba(255, 0, 0, 0.5)')
=> true

// Check alpha support
coco.isAlpha('rgba(255, 0, 0, 0.5)')
=> true
```

#### <a name="isequal"></a>coco.isEqual(color:string, color:string)

Compares two color strings.

```js
coco.isEqual('red', 'rgb(255, 0, 0)')
=> true
```

#### <a name="format"></a>coco.format(color:string)

Returns format of the input string.

```js
coco.format('#f00')
=> 'hex'

coco.format('#ff0000')
=> 'hex'

coco.format('rgb(255, 0, 0)')
=> 'rgb'

// Color strings with alpha parameter return base format.
coco.format('rgba(255, 0, 0, 0.5)')
=> 'rgb'

coco.format('hsl(0, 100%, 50%)')
=> 'hsl'

coco.format('hsv(0, 100%, 100%)')
=> 'hsv'

// If the input string cannot be parsed, undefined is returned.
coco.format('(0, 0, 100%)')
=> undefined
```

#### <a name="replace"></a>coco.replace(text:string, callback:function)

Finds all color strings in a given text and passes them to the replacer callback function. This method is useful to unify different color syntaxes.

```js
var cssText = 'background-color: rgb(255, 255, 255); color: hsl(0, 100%, 50%);'
coco.replace(cssText, function(color) {
  return coco(color, 'hex');
});
=> 'background-color: #fff; color: #f00;'
```

### Alpha Manipulation

#### <a name="getalpha"></a>coco.getAlpha(color:string)

```js
coco.getAlpha('rgba(255, 0, 0, 0.5)');
=> 0.5
```

#### <a name="setalpha"></a>coco.setAlpha(color:string, alpha:number)

```js
coco.setAlpha('red', 0.5);
=> 'rgba(255, 0, 0, 0.5)'

coco.setAlpha('rgb(255, 0, 0)', 0.5);
=> 'rgba(255, 0, 0, 0.5)'

coco.setAlpha('rgba(255, 0, 0, .5)', 0.8);
=> 'rgba(255, 0, 0, 0.8)'
```

#### <a name="removealpha"></a>coco.removeAlpha(color:string)

Removes alpha from a color string if there is one.

```js
coco.removeAlpha('rgba(255, 0, 0, 0.5)');
=> 'rgb(255, 0, 0)'
```

### <a name="supporthex8"></a>CSS4 Hex8 Notation Support

The latest W3C color module [draft](http://dev.w3.org/csswg/css-color-4/#hex-notation) describes that a hexadecimal notation can have 4 or 8 digits. The first 6 digits (or 3 digits in shorter version) of this notation are interpreted as regular red, green and blue channels, but the last pair specifies alpha channel, where `00` represents a transparent color and `ff` represent a opaque color. To support this type of notation, there is `coco.supportHex8()` method but using this feature in production is not recommended because the W3C draft is in early stage. For those, who want to experiment hex8 notation, here are some examples;

```js
// Use it at your own risk
coco.supportHex8();

// Now, 2hex or hex2 converters take into account
// the alpha channel if it is lower than 1.
coco.rgb2hex('rgba(255, 0, 0, 0.8)')
=> '#f00c'

coco.rgb2hex('rgba(255, 0, 0, 0.5)')
=> '#ff000080'

coco.rgb2hex('rgba(255, 0, 0, 1)')
=> '#f00'

coco.hex2rgb('#ff000080')
=> 'rgba(255, 0, 0, 0.5)'

coco.hex2rgb('#f00c')
=> 'rgba(255, 0, 0, 0.8)'

coco.hex2rgb('#f00f')
=> 'rgb(255, 0, 0)'

// Alpha manipulation
coco.setAlpha('red', 0.5);
=> '#ff000080'

coco.getAlpha('#ff000080');
=> 0.5

coco.removeAlpha('ff000080');
=> '#f00'

// Format checks
coco.isHex('#ff000080')
=> true

coco.isHexLong('#ff000080')
=> true

coco.isHexShort('#f00c')
=> true

// To rollback to regular hex6 notation
coco.unsupportHex8();
```

## License

MIT Copyright (c) 2015 taksim.io