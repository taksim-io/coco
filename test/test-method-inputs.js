var expect = require('chai').expect;
var coco = require('../build');

describe('test-method-inputs.js >>', function() {

  describe('out of lower range', function() {
    it('rgb2hex()', function() {
      expect(coco.rgb2hex([-1, -1, -1])).to.equal('#000');
    });
    it('rgb2hex()', function() {
      expect(coco.rgb2hex([-1, -1, -1])).to.equal('#000');
    });
    it('hsl2hex()', function() {
      expect(coco.hsl2hex([-1, -1, -1])).to.equal('#000');
    });
    it('hsv2hex()', function() {
      expect(coco.hsv2hex([-1, -1, -1])).to.equal('#000');
    });
    it('hue2rgb()', function() {
      expect(coco.hue2rgb(-1)).to.deep.equal([255, 0, 0, 1]);
    });
    it('hue2hsl()', function() {
      expect(coco.hue2hsl(-1)).to.deep.equal([0, 100, 50, 1]);
    });
    it('hue2hsv() ', function() {
      expect(coco.hue2hsv(-1)).to.deep.equal([0, 100, 100, 1]);
    });
  });

  describe('out of upper range', function() {
    it('hex2rgb()', function() {
      expect(coco.hex2rgb('#ggg')).to.deep.equal([0, 0, 0, 1]);
    });
    it('rgb2hex()', function() {
      expect(coco.rgb2hex([256, 256, 256])).to.equal('#fff');
    });
    it('hsl2hex()', function() {
      expect(coco.hsl2hex([361, 101, 101])).to.equal('#fff');
    });
    it('hsv2hex()', function() {
      expect(coco.hsv2hex([361, 101, 101])).to.equal('#f00');
    });
    it('hue2rgb()', function() {
      expect(coco.hue2rgb(361)).to.deep.equal([255, 0, 0, 1]);
    });
    it('hue2hsl()', function() {
      expect(coco.hue2hsl(361)).to.deep.equal([360, 100, 50, 1]);
    });
    it('hue2hsv() ', function() {
      expect(coco.hue2hsv(361)).to.deep.equal([360, 100, 100, 1]);
    });
  });

  describe('string input instead of number', function() {
    it('hue2rgb()', function() {
      expect(coco.hue2rgb('360')).to.deep.equal([255, 0, 0, 1]);
    });
    it('hue2hsl()', function() {
      expect(coco.hue2hsl('360')).to.deep.equal([360, 100, 50, 1]);
    });
    it('hue2hsv() ', function() {
      expect(coco.hue2hsv('360')).to.deep.equal([360, 100, 100, 1]);
    });
  });

  describe('unexpected input format', function() {

    // Expected formats are
    //  "#4b4f21" or hex3 if available
    //  "rgb(75, 79, 33)"
    //  "hsl(65, 41%, 22%)"
    //  "hsv(65, 58%, 31%)"

    it('hex3 without sharp', function() {
      expect(coco.hex2rgb('0f0')).to.deep.equal([0, 255, 0, 1]);
    });
    it('hex6 without sharp', function() {
      expect(coco.hex2rgb('4b4f21')).to.deep.equal([75, 79, 33, 1]);
    });
    it('hex6 with missing 5 chars', function() {
      // #000004
      expect(coco.hex2rgb('#4')).to.deep.equal([0, 0, 4, 1]);
    });
    it('hex6 with missing 4 chars', function() {
      // #00004b
      expect(coco.hex2rgb('#4b')).to.deep.equal([0, 0, 75, 1]);
    });
    it('hex6 with missing 2 chars', function() {
      // #004b4f
      expect(coco.hex2rgb('#4b4f')).to.deep.equal([0, 75, 79, 1]);
    });
    it('hex6 with missing char', function() {
      // #04b4f2
      expect(coco.hex2rgb('#4b4f2')).to.deep.equal([4, 180, 242, 1]);
    });

    it('rgb color string without type', function() {
      expect(coco.rgb2hex('(75, 79, 33)')).to.equal('#4b4f21');
    });
    it('rgb color string without type and parens', function() {
      expect(coco.rgb2hex('75, 79, 33')).to.equal('#4b4f21');
    });
    it('rgb color string without type and with brackets instead of parens', function() {
      expect(coco.rgb2hex('[75, 79, 33]')).to.equal('#4b4f21');
    });
    it('rgb color string without type, parens and spaces', function() {
      expect(coco.rgb2hex('75,79,33')).to.equal('#4b4f21');
    });
    it('rgb color string with percentage', function() {
      expect(coco.rgb2hex('rgb(75, 79%, 33%')).to.equal('#4b4f21');
    });
    it('rgb color string with unknown type', function() {
      expect(coco.rgb2hex('abc(75, 79, 33')).to.equal('#4b4f21');
    });

    it('hsl color string without type', function() {
      expect(coco.hsl2hex('(65, 41, 22)')).to.equal('#4b4f21');
    });
    it('hsl color string without type and parens', function() {
      expect(coco.hsl2hex('65, 41, 22')).to.equal('#4b4f21');
    });
    it('hsl color string without type and with brackets instead of parens', function() {
      expect(coco.hsl2hex('[65, 41, 22]')).to.equal('#4b4f21');
    });
    it('hsl color string without type, parens and spaces', function() {
      expect(coco.hsl2hex('65,41,22')).to.equal('#4b4f21');
    });
    it('hsl color string with unknown type', function() {
      expect(coco.hsl2hex('abc(65, 41%, 22%)')).to.equal('#4b4f21');
    });

    it('hsv color string without type', function() {
      expect(coco.hsv2hex('(65, 58, 31)')).to.equal('#4b4f21');
    });
    it('hsv color string without type and parens', function() {
      expect(coco.hsv2hex('65, 58, 31')).to.equal('#4b4f21');
    });
    it('hsv color string without type and with brackets instead of parens', function() {
      expect(coco.hsv2hex('[65, 58, 31]')).to.equal('#4b4f21');
    });
    it('hsv color string without type, parens and spaces', function() {
      expect(coco.hsv2hex('65,58,31')).to.equal('#4b4f21');
    });
    it('hsv color string with unknown type', function() {
      expect(coco.hsv2hex('abc(65, 58, 31)')).to.equal('#4b4f21');
    });
  });
});
