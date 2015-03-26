/**
 * @license MIT
 * taksim.io/coco // @echo VERSION
 * https://github.com/taksim-io/coco
 * Copyright (c) 2015 taksim.io
*/

;(function(root, factory) {
  var coco = factory(root);
  if (typeof define === 'function' && define.amd) {
    define(coco);
  } else if (typeof exports === 'object') {
    module.exports = coco;
  } else {
    root.coco = coco;
  }
})(this, function() {

  'use strict';

  var rHex = '#(:?[0-9a-fA-F]{3}){1,2}\\b';
  var rAlpha = [];
  var rRgb = r('rgb');
  var rHsl = r('hsl');
  var rHsv = r('hsv');
  var rNonDigit = /[^\d\.\-\,]/g;
  var hexShort = {3: true};
  var hexLong = {6: true};
  var isCss4Supported = false;
  var name2hexMap = {};
  var hex2nameMap = {};
  var exportsMap = {};
  var rColor;

  function r(format) {
    var xyz = [];
    var xyza = [];
    xyz[0] = xyza[0] = '\\s*\\d+\\s*';
    xyz[1] = xyza[1] = '\\s*\\d+' + (format === 'rgb' ? '' : '%') + '\\s*';
    xyz[2] = xyza[2] = xyz[1];
    xyza[3] = '\\s*(\\d+|(\\d+)?\\.\\d+)\\s*';
    xyz = format + '\\(' + xyz.join(',') + '\\)';
    xyza = format + 'a\\(' + xyza.join(',') + '\\)';
    rAlpha.push(xyza);
    return xyz + '|' + xyza;
  }

  function init() {
    var colorNames = [];
    for (var name in name2hexMap) {
      if (name2hexMap.hasOwnProperty(name)) {
        var base = _hexOut(name2hexMap[name]);
        hex2nameMap[base] = name;
        name2hexMap[name] = base;
        colorNames.push(name);
      }
    }
    rColor = new RegExp([rHex, rRgb, rHsl, rHsv,
      '\\b(' + colorNames.join('|') + ')\\b'].join('|'), 'gi');
    rHex = new RegExp(rHex);
    rHsl = new RegExp(rHsl);
    rHsv = new RegExp(rHsv);
    rRgb = new RegExp(rRgb);
    rAlpha = new RegExp(rAlpha.join('|'));

    for (var key in exportsMap) {
      if (exportsMap.hasOwnProperty(key)) {
        coco[key] = exportsMap[key];
      }
    }
  }

  function supportCss4() {
    rAlpha = new RegExp(rAlpha.source + '|' + rHex.source.replace('3', '4'));
    rHex = new RegExp(rHex.source.replace('3', '3,4'));
    rColor = new RegExp(rColor.source.replace('3', '3,4'), 'gi');
    hexShort[4] = true;
    hexLong[8] = true;
    isCss4Supported = true;
  }

  function unsupportCss4() {
    rAlpha = new RegExp(rAlpha.source.replace('|' + rHex.source.replace('3,4', '4'), ''));
    rHex = new RegExp(rHex.source.replace('3,4', '3'));
    rColor = new RegExp(rColor.source.replace('3,4', '3'), 'gi');
    hexShort[4] = false;
    hexLong[8] = false;
    isCss4Supported = false;
  }

  function coco(clr, format2) {
    var format1 = format(clr);
    if (format1) {
      if (isHexShort(clr)) {
        clr = hex2Long(clr);
      }
    }
    else {
      format1 = 'hex';
      clr = '#000';
    }
    if (format2 === 'hex3' || format2 === 'hex4') {
      clr = hex2Short(coco(clr, 'hex'));
    }
    else if (format2 === 'hex6' || format2 === 'hex8') {
      clr = hex2Long(coco(clr, 'hex'));
    }
    else if (format1 === format2) {
      if (format1 === 'hex') {
        clr = hex2Short(clr);
      }
    }
    else {
      var method = exportsMap[format1 + '2' + format2];
      if (method) {
        clr = toString(method(clr), format2);
      }
    }
    return clr;
  }

  // 2HEX
  //http://stackoverflow.com/a/5624139/1219553
  function rgb2hex(rgb) {
    rgb = _rgbIn(rgb);
    var rrggbb = ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16).slice(1);
    return hex2Short(rrggbb + _alpha2hex(rgb[3]));
  }

  function hsl2hex(hsl) {
    return rgb2hex(hsl2rgb(hsl));
  }

  function hsv2hex(hsv) {
    return rgb2hex(hsv2rgb(hsv));
  }

  function name2hex(name) {
    return name2hexMap[name] || name;
  }

  function hue2hex(h) {
    return rgb2hex(hue2rgb(h));
  }

  function hex2Short(hex) {
    hex = _hexIn(hex);
    if (hexLong[hex.length]) {
      hex = hex.split('');
      hex =
          hex[0] === hex[1] &&
          hex[2] === hex[3] &&
          hex[4] === hex[5] &&
          hex[6] === hex[7] ? hex[0] + hex[2] + hex[4] + (hex[6] || '') : hex.join('');
    }
    return _hexOut(hex);
  }

  function hex2Long(hex) {
    hex = _hexIn(hex);
    hexShort[hex.length] && (hex = hex.replace(/([0-9a-fA-F])/g, '$1$1'));
    return _hexOut(hex);
  }

  // 2RGB
  //http://stackoverflow.com/a/11508164/1219553
  function hex2rgb(hex) {
    hex = _hexIn(hex2Long(hex));
    var shift = isCss4Supported && hex.length === 8 ? 24 : 16;
    var bi = parseInt(hex, 16);
    var r = (bi >> shift) & 255;
    var g = (bi >> shift - 8) & 255;
    var b = (bi >> shift - 16) & 255;
    var a = shift - 24 < 0 ? 1 : (bi >> shift - 24 & 255) / 255;
    return [r, g, b, a];
  }

  function hsl2rgb(hsl) {
    hsl = _hslvIn(hsl);
    var s = hsl[1];
    var l = hsl[2];
    var a = hsl[3];
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    var rgb;
    _hslvOut(hsl);
    rgb = hue2rgb(hsl[0], p, q);
    rgb[3] = a;
    return _rgbOut(rgb);
  }

  function hsv2rgb(hsv) {
    return hsl2rgb(hsv2hsl(hsv));
  }

  function name2rgb(name) {
    return hex2rgb(name2hex(name));
  }

  function hue2rgb(hue, p, q) {
    hue = _clip(hue / 360, 0, 1) || 0;
    var rh = hue + 1 / 3;
    var gh = hue;
    var bh = hue - 1 / 3;
    bh < 0 && (bh += 1);
    rh > 1 && (rh -= 1);
    isNaN(parseFloat(p)) && (p = 0);
    isNaN(parseFloat(q)) && (q = 1);
    return _rgbOut([
      _hue2rgb1(rh, p, q), _hue2rgb1(gh, p, q), _hue2rgb1(bh, p, q), 1
    ]);
  }

  function _hue2rgb1(h, p, q) {
    return (
      h < 1 / 6 ? p + (q - p) * 6 * h :
      h < 1 / 2 ? q :
      h < 2 / 3 ? p + (q - p) * 6 * (2 / 3 - h) : p
    ) * 255;
  }

  function percentage2rgb(rgb) {
    if (typeof rgb === 'string') {
      rgb = rgb.replace(/(\-?\d+%)/g, function(match) {
        return _clip(_round(255 / 100 * parseFloat(match)), 0, 255);
      });
    }
    return rgb;
  }

  // 2HSL
  function hex2hsl(hex) {
    return rgb2hsl(hex2rgb(hex));
  }

  function rgb2hsl(rgb) {
    return hsv2hsl(rgb2hsv(rgb));
  }

  //http://ariya.blogspot.com.tr/2008/07/converting-between-hsl-and-hsv.html
  function hsv2hsl(hsv) {
    hsv = _hslvIn(hsv);
    var h = hsv[0];
    var l = (2 - hsv[1]) * hsv[2];
    var s = (hsv[1] * hsv[2]) / (l <= 1 ? l : 2 - l);
    var a = hsv[3];
    _hslvOut(hsv);
    return _hslvOut([h, s || 0, l / 2, a]);
  }

  function name2hsl(name) {
    return rgb2hsl(name2rgb(name));
  }

  function hue2hsl(hue) {
    return [_clip(hue, 0, 360) || 0, 100, 50, 1];
  }

  // 2HSV
  function hex2hsv(hex) {
    return rgb2hsv(hex2rgb(hex));
  }

  function rgb2hsv(rgb) {
    rgb = _rgbIn(rgb);
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var d = max - min;
    var h = (max === min ? 0 :
        max === r ? (g - b) / d + (g < b ? 6 : 0) :
        max === g ? (b - r) / d + 2 :
        max === b ? (r - g) / d + 4 : 0) / 6;
    var s = max === 0 ? 0 : d / max;
    var v = max / 255;
    return _hslvOut([h, s, v, rgb[3]]);
  }

  function hsl2hsv(hsl) {
    hsl = _hslvIn(hsl);
    var h = hsl[0];
    var l = hsl[2] * 2;
    var s = hsl[1] * (l <= 1 ? l : 2 - l);
    var a = hsl[3];
    _hslvOut(hsl);
    return _hslvOut([h, (2 * s) / (l + s), (l + s) / 2, a]);
  }

  function name2hsv(name) {
    return hex2hsv(name2hex(name));
  }

  function hue2hsv(hue) {
    return [_clip(hue, 0, 360) || 0, 100, 100, 1];
  }

  // 2Name
  function hex2name(hex) {
    return hex2nameMap[hex2Short(hex)] || hex;
  }

  function rgb2name(rgb) {
    return hex2name(rgb2hex(rgb));
  }

  function hsl2name(hsl) {
    return hex2name(hsl2hex(hsl));
  }

  function hsv2name(hsv) {
    return hex2name(hsv2hex(hsv));
  }

  function hue2name(hue) {
    return hsl2name(hue2hsl(hue));
  }

  // 2Str
  function rgbStr(rgb) {
    return toString(rgb, 'rgb');
  }

  function hslStr(hsl) {
    return toString(hsl, 'hsl');
  }

  function hsvStr(hsv) {
    return toString(hsv, 'hsv');
  }

  function toString(arr, format) {
    if (arr instanceof Array) {
      var c = ', ';
      var a = arr[3];
      var hasAlpha = a === 0 || (a && a !== 1);
      var p = format === 'rgb' ? '' : '%';
      return format + (hasAlpha ? 'a' : '') +
          '(' +
              _round(arr[0]) + c +
              _round(arr[1]) + p + c +
              _round(arr[2]) + p + (hasAlpha ? c + (+a.toFixed(2)) : '') +
          ')';
    }
    else if (typeof arr === 'string') {
      return arr;
    }
    else {
      return toString([0, 0, 0, 1], format);
    }
  }

  function toArray(str) {
    if (typeof str === 'string') {
      var arr = str.split(',');
      var i = 3;
      while (i--) {
        arr[i] = arr[i] ? parseFloat(arr[i].replace(rNonDigit, '')) : 0;
      }
      arr[3] = arr[3] ? _clip(parseFloat(arr[3].replace(rNonDigit, '')), 0, 1) : 1;
      return arr;
    }
    else if (str instanceof Array) {
      return str;
    }
    else {
      return [0, 0, 0, 1];
    }
  }

  // Test color type
  function isHex(clr) {
    return typeof clr === 'string' && rHex.test(clr) &&
        !!(hexShort[clr.length - 1] || hexLong[clr.length - 1]);
  }

  function isHexShort(clr) {
    return isHex(clr) && !!hexShort[clr.length - 1];
  }

  function isHexLong(clr) {
    return isHex(clr) && !!hexLong[clr.length - 1];
  }

  function isRgb(clr) {
    return rRgb.test(clr);
  }

  function isHsl(clr) {
    return rHsl.test(clr);
  }

  function isHsv(clr) {
    return rHsv.test(clr);
  }

  function isName(clr) {
    return !!name2hexMap[clr];
  }

  function isColor(clr) {
    return isHex(clr) || isRgb(clr) || isHsl(clr) || isHsv(clr) || isName(clr);
  }

  function isAlpha(clr) {
    return rAlpha.test(clr);
  }

  function isEqual(clr1, clr2) {
    var format1 = format(clr1);
    var format2 = format(clr2);
    var method1 = coco[format1 + '2' + format2];
    var method2 = coco[format2 + '2' + format1];
    var result = false;
    if (method1 && method2) {
      result = toString(method1(clr1), format2) === clr2 ||
          toString(method2(clr2), format1) === clr1;
    }
    return result;
  }

  function format(clr) {
    return isHex(clr) && 'hex' ||
        isRgb(clr) && 'rgb' ||
        isHsl(clr) && 'hsl' ||
        isHsv(clr) && 'hsv' ||
        isName(clr) && 'name' || undefined;
  }

  function getAlpha(clr) {
    var alpha = 1;
    if (isAlpha(clr)) {
      if (isHex(clr)) {
        clr = _hexIn(clr);
        var len = clr.length;
        var hex2 = clr.slice(len - len / 4);
        len === 8 || (hex2 += hex2);
        alpha = +(parseInt(hex2, 16) / 255).toFixed(2);
      }
      else {
        alpha = toArray(clr)[3];
      }
    }
    return alpha;
  }

  function setAlpha(clr, alpha) {
    alpha = _clip(parseFloat(alpha), 0, 1);
    isNaN(alpha) && (alpha = 1);
    clr = removeAlpha(clr);
    if (isHex(clr)) {
      if (isCss4Supported) {
        clr = hex2Short(hex2Long(clr) + _alpha2hex(alpha));
      }
      else {
        clr = setAlpha(rgbStr(hex2rgb(clr)), alpha);
      }
    }
    else if (isName(clr)) {
      clr = setAlpha(name2hex(clr), alpha);
    }
    else {
      var type = format(clr);
      if (type) {
        var arr = toArray(clr);
        arr[3] = alpha;
        clr = toString(arr, type);
      }
    }
    return clr;
  }

  function removeAlpha(clr) {
    if (isAlpha(clr)) {
      if (isHex(clr)) {
        clr = _hexIn(clr);
        clr = _hexOut(clr.slice(0, -1 * clr.length / 4));
      }
      else {
        var arr = toArray(clr);
        arr[3] = 1;
        clr = toString(arr, format(clr));
      }
    }
    return clr;
  }

  function replace(str, replacer) {
    return str.replace(rColor, function(match) {
      return replacer(match);
    });
  }

  // Private helpers
  function _clip(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function _round(val) {
    return Math.round(val);
  }

  function _hexIn(hex) {
    return String(hex).replace('#', '');
  }

  function _hexOut(hex) {
    return hex ? '#' + _hexIn(hex) : hex;
  }

  function _rgbIn(rgb) {
    rgb = toArray(rgb);
    rgb[0] = _clip(_round(rgb[0]), 0, 255);
    rgb[1] = _clip(_round(rgb[1]), 0, 255);
    rgb[2] = _clip(_round(rgb[2]), 0, 255);
    return rgb;
  }

  function _rgbOut(rgb) {
    return rgb;
  }

  function _hslvIn(hslv) {
    hslv = toArray(hslv);
    _2decimal(hslv, 0, 360);
    _2decimal(hslv, 1, 100);
    _2decimal(hslv, 2, 100);
    return hslv;
  }

  function _hslvOut(hslv) {
    _2percentage(hslv, 0, 360);
    _2percentage(hslv, 1, 100);
    _2percentage(hslv, 2, 100);
    return hslv;
  }

  function _2decimal(arr, i, fixer) {
    arr[i] = _clip(arr[i] / fixer, 0, 1) || 0;
  }

  function _2percentage(arr, i, fixer) {
    arr[i] = _clip(arr[i] * fixer, 0, fixer) || 0;
  }

  function _alpha2hex(alpha) {
    alpha = isCss4Supported ? ((1 << 8) + _round(parseFloat(alpha) * 255))
        .toString(16).slice(1) :  '';
    return alpha === 'ff' ? '' : alpha;
  }

  exportsMap = {
    supportCss4: supportCss4,
    unsupportCss4: unsupportCss4,
    // 2hex
    hex2Short: hex2Short,
    hex2Long: hex2Long,
    rgb2hex: rgb2hex,
    hsl2hex: hsl2hex,
    hsv2hex: hsv2hex,
    name2hex: name2hex,
    hue2hex: hue2hex,
    // 2rgb
    hex2rgb: hex2rgb,
    hsl2rgb: hsl2rgb,
    hsv2rgb: hsv2rgb,
    name2rgb: name2rgb,
    hue2rgb: hue2rgb,
    percentage2rgb: percentage2rgb,
    // 2hsl
    hex2hsl: hex2hsl,
    rgb2hsl: rgb2hsl,
    hsv2hsl: hsv2hsl,
    name2hsl: name2hsl,
    hue2hsl: hue2hsl,
    // 2hsv
    hex2hsv: hex2hsv,
    hsl2hsv: hsl2hsv,
    rgb2hsv: rgb2hsv,
    name2hsv: name2hsv,
    hue2hsv: hue2hsv,
    // 2name
    hex2name: hex2name,
    rgb2name: rgb2name,
    hsl2name: hsl2name,
    hsv2name: hsv2name,
    hue2name: hue2name,
    // 2Str
    rgbStr: rgbStr,
    hslStr: hslStr,
    hsvStr: hsvStr,
    toString: toString,
    toArray: toArray,
    // Type checks
    isHexShort: isHexShort,
    isHexLong: isHexLong,
    isHex: isHex,
    isRgb: isRgb,
    isHsl: isHsl,
    isHsv: isHsv,
    isName: isName,
    isColor: isColor,
    isAlpha: isAlpha,
    isEqual: isEqual,
    format: format,
    replace: replace,
    getAlpha: getAlpha,
    setAlpha: setAlpha,
    removeAlpha: removeAlpha
  };

  // @include x11.js
  init();

  return coco;
});
