var expect = require('chai').expect;
var coco = require('../build');

// Intentionally selected directly convertable colors to cover large
// amount of tests via logic. Lots of color formats in string form don't
// match with each other because of the decimal points. These colors should be
// tested by using color arrays. Named web color "orange" is just an example,
//  #ffa500 === hsl(39, 100%, 50%) but hsl(39, 100%, 50%) === #ffa600
// New samples should be checked in Photoshop.
var ref = {
  black:  {name: 'black',   hex3: '#000',     hex6: '#000000',  hex: '#000',     rgb: 'rgb(0, 0, 0)',        hsl: 'hsl(0, 0%, 0%)',       hsv: 'hsv(0, 0%, 0%)'},
  white:  {name: 'white',   hex3: '#fff',     hex6: '#ffffff',  hex: '#fff',     rgb: 'rgb(255, 255, 255)',  hsl: 'hsl(0, 0%, 100%)',     hsv: 'hsv(0, 0%, 100%)'},
  grey:   {name: 'grey',    hex3: '#808080',  hex6: '#808080',  hex: '#808080',  rgb: 'rgb(128, 128, 128)',  hsl: 'hsl(0, 0%, 50%)',      hsv: 'hsv(0, 0%, 50%)'},
  red:    {name: 'red',     hex3: '#f00',     hex6: '#ff0000',  hex: '#f00',     rgb: 'rgb(255, 0, 0)',      hsl: 'hsl(0, 100%, 50%)',    hsv: 'hsv(0, 100%, 100%)'},
  green:  {name: 'green',   hex3: '#008000',  hex6: '#008000',  hex: '#008000',  rgb: 'rgb(0, 128, 0)',      hsl: 'hsl(120, 100%, 25%)',  hsv: 'hsv(120, 100%, 50%)'},
  lime:   {name: 'lime',    hex3: '#0f0',     hex6: '#00ff00',  hex: '#0f0',     rgb: 'rgb(0, 255, 0)',      hsl: 'hsl(120, 100%, 50%)',  hsv: 'hsv(120, 100%, 100%)'},
  blue:   {name: 'blue',    hex3: '#00f',     hex6: '#0000ff',  hex: '#00f',     rgb: 'rgb(0, 0, 255)',      hsl: 'hsl(240, 100%, 50%)',  hsv: 'hsv(240, 100%, 100%)'},
  cyan:   {name: 'cyan',    hex3: '#0ff',     hex6: '#00ffff',  hex: '#0ff',     rgb: 'rgb(0, 255, 255)',    hsl: 'hsl(180, 100%, 50%)',  hsv: 'hsv(180, 100%, 100%)'},
  yellow: {name: 'yellow',  hex3: '#ff0',     hex6: '#ffff00',  hex: '#ff0',     rgb: 'rgb(255, 255, 0)',    hsl: 'hsl(60, 100%, 50%)',   hsv: 'hsv(60, 100%, 100%)'},
  magenta:{name: 'magenta', hex3: '#f0f',     hex6: '#ff00ff',  hex: '#f0f',     rgb: 'rgb(255, 0, 255)',    hsl: 'hsl(300, 100%, 50%)',  hsv: 'hsv(300, 100%, 100%)'},
  noname1:{name: '#9fa324', hex3: '#9fa324',  hex6: '#9fa324',  hex: '#9fa324',  rgb: 'rgb(159, 163, 36)',   hsl: 'hsl(62, 64%, 39%)',    hsv: 'hsv(62, 78%, 64%)'},
  noname2:{name: '#4b4f21', hex3: '#4b4f21',  hex6: '#4b4f21',  hex: '#4b4f21',  rgb: 'rgb(75, 79, 33)',     hsl: 'hsl(65, 41%, 22%)',    hsv: 'hsv(65, 58%, 31%)'},
  noname3:{name: '#a785a8', hex3: '#a785a8',  hex6: '#a785a8',  hex: '#a785a8',  rgb: 'rgb(167, 133, 168)',  hsl: 'hsl(298, 17%, 59%)',   hsv: 'hsv(298, 21%, 66%)'}
};

describe('test-string-conversion.js >>', function() {
  for (var colorName in ref) {
    if (ref.hasOwnProperty(colorName)) {
      for (var format in ref[colorName]) {
        if (ref[colorName].hasOwnProperty(format)) {
          conversion(colorName, format);
        }
      }
    }
  }
  describe('percentage2rgb()', function() {
    it('should return rgb(0, 168, 255)', function() {
      expect(coco.percentage2rgb('rgb(0%, 66%, 100%)')).to.equal('rgb(0, 168, 255)');
    });
    it('should return rgb(0, 168, 255)', function() {
      expect(coco.percentage2rgb('rgb(-1%, 66%, 101%)')).to.equal('rgb(0, 168, 255)');
    });
  });
});

function conversion(colorName, format) {
  var out = ref[colorName];
  var color = out[format];
  describe(colorName + '.' + format, function() {
    it('to hex3', function() {
      expect(coco(color, 'hex3')).to.equal(out.hex3);
    });
    it('to hex6', function() {
      expect(coco(color, 'hex6')).to.equal(out.hex6);
    });
    it('to hex', function() {
      expect(coco(color, 'hex')).to.equal(out.hex);
    });
    it('to name', function() {
      expect(coco(color, 'name')).to.equal(out.name);
    });
    it('to rgb', function() {
      expect(coco(color, 'rgb')).to.equal(out.rgb);
    });
    it('to hsl', function() {
      expect(coco(color, 'hsl')).to.equal(out.hsl);
    });
    it('to hsv', function() {
      expect(coco(color, 'hsv')).to.equal(out.hsv);
    });
  });
}
