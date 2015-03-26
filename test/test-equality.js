var expect = require('chai').expect;
var coco = require('../build');

describe('test-equality.js >>', function() {

  describe('isHexShort()', function() {
    isHexShort();
    it('should return false for #1234', function() {
      expect(coco.isHexShort('#1234')).to.be.false;
    });
  });

  describe('isHexLong()', function() {
    isHexLong();
    it('should return false for #12345678', function() {
      expect(coco.isHexShort('#12345678')).to.be.false;
    });
  });

  describe('isHex()', function() {
    isHex();
    it('should return false for #1234', function() {
      expect(coco.isHex('#1234')).to.be.false;
    });
    it('should return false for #12345678', function() {
      expect(coco.isHex('#12345678')).to.be.false;
    });
  });

  describe('isRgb()', function() {

    // RGB
    it('should return true for rgb(0,0,0)', function() {
      expect(coco.isRgb('rgb(0,0,0)')).to.be.true;
    });
    it('should return true for rgb( 0, 0, 0 )', function() {
      expect(coco.isRgb('rgb( 0, 0, 0 )')).to.be.true;
    });

    // RGBA
    it('should return true for rgba(0,0,0,1)', function() {
      expect(coco.isRgb('rgba(0,0,0,1)')).to.be.true;
    });
    it('should return true for rgba(0, 0, 0, .5)', function() {
      expect(coco.isRgb('rgba(0, 0, 0, .5)')).to.be.true;
    });
    it('should return true for rgba( 0, 0, 0, 1 )', function() {
      expect(coco.isRgb('rgba( 0, 0, 0, 1 )')).to.be.true;
    });

    // Missing parameter
    it('should return false for rgb(0, 0)', function() {
      expect(coco.isRgb('rgb(0, 0)')).to.be.false;
    });
    it('should return false for rgba(0, 0, 0)', function() {
      expect(coco.isRgb('rgba(0, 0, 0)')).to.be.false;
    });
    // Extra parameter
    it('should return false for rgb(0, 0%, 0%, 1)', function() {
      expect(coco.isHsv('rgb(0, 0%, 0%, 1)')).to.be.false;
    });
    it('should return false for rgba(0, 0%, 0%, 1, 1)', function() {
      expect(coco.isHsv('rgba(0, 0%, 0%, 1, 1)')).to.be.false;
    });
    // Unknown color format
    it('should return false for rg(0, 0, 0)', function() {
      expect(coco.isRgb('rg(0, 0, 0)')).to.be.false;
    });
    // NaN inputs
    it('should return false for rgb(a, b, c)', function() {
      expect(coco.isRgb('rgb(a, b, c)')).to.be.false;
    });
    it('should return false for rgb(0%,0%,0%)', function() {
      expect(coco.isRgb('rgb(0%,0%,0%)')).to.be.false;
    });
    // Do not test validity of input ranges.
  });

  describe('isHsl()', function() {

    //HSL
    it('should return true for hsl(0,0%,0%)', function() {
      expect(coco.isHsl('hsl(0,0%,0%)')).to.be.true;
    });
    it('should return true for hsl( 0, 0%, 0% )', function() {
      expect(coco.isHsl('hsl( 0, 0%, 0% )')).to.be.true;
    });

    // HSLA
    it('should return true for hsla(0,0%,0%,1)', function() {
      expect(coco.isHsl('hsla(0,0%,0%,1)')).to.be.true;
    });
    it('should return true for hsla(0, 0%, 0%, .5)', function() {
      expect(coco.isHsl('hsla(0, 0%, 0%, .5)')).to.be.true;
    });
    it('should return true for hsla(0, 0%, 0%, 1)', function() {
      expect(coco.isHsl('hsla( 0, 0%, 0%, 1 )')).to.be.true;
    });

    // Missing percentage sign
    it('should return false for hsl(0, 0, 0)', function() {
      expect(coco.isHsl('hsl(0, 0, 0)')).to.be.false;
    });
    // Missing parameter
    it('should return false for hsl(0, 0%)', function() {
      expect(coco.isHsl('hsl(0, 0)')).to.be.false;
    });
    it('should return false for hsla(0, 0%, 0%)', function() {
      expect(coco.isHsl('hsla(0, 0%, 0%)')).to.be.false;
    });
    // Extra parameter
    it('should return false for hsl(0, 0%, 0%, 1)', function() {
      expect(coco.isHsv('hsl(0, 0%, 0%, 1)')).to.be.false;
    });
    it('should return false for hsla(0, 0%, 0%, 1, 1)', function() {
      expect(coco.isHsv('hsla(0, 0%, 0%, 1, 1)')).to.be.false;
    });
    // Unknown color format
    it('should return false for hs(0, 0%, 0%)', function() {
      expect(coco.isHsl('hs(0, 0%, 0%)')).to.be.false;
    });
    // NaN inputs
    it('should return false for hsl(a, b%, c%)', function() {
      expect(coco.isHsl('hsv(a, b%, c%)')).to.be.false;
    });
    // Do not test validity of input ranges.
  });

  describe('isHsv()', function() {

    //HSV
    it('should return true for hsv(0,0%,0%)', function() {
      expect(coco.isHsv('hsv(0,0%,0%)')).to.be.true;
    });
    it('should return true for hsv( 0, 0%, 0% )', function() {
      expect(coco.isHsv('hsv( 0, 0%, 0% )')).to.be.true;
    });

    // HSVA
    it('should return true for hsva(0,0%,0%,1)', function() {
      expect(coco.isHsv('hsva(0,0%,0%,1)')).to.be.true;
    });
    it('should return true for hsva(0, 0%, 0%, .5)', function() {
      expect(coco.isHsv('hsva(0, 0%, 0%, .5)')).to.be.true;
    });
    it('should return true for hsva(0, 0%, 0%, 1)', function() {
      expect(coco.isHsv('hsva( 0, 0%, 0%, 1 )')).to.be.true;
    });

    // Missing percentage sign
    it('should return false for hsv(0, 0, 0)', function() {
      expect(coco.isHsv('hsv(0, 0, 0)')).to.be.false;
    });
    // Missing parameter
    it('should return false for hsv(0, 0%)', function() {
      expect(coco.isHsv('hsv(0, 0)')).to.be.false;
    });
    it('should return false for hsva(0, 0%, 0%)', function() {
      expect(coco.isHsv('hsva(0, 0%, 0%)')).to.be.false;
    });
    // Extra parameter
    it('should return false for hsv(0, 0%, 0%, 1)', function() {
      expect(coco.isHsv('hsv(0, 0%, 0%, 1)')).to.be.false;
    });
    it('should return false for hsva(0, 0%, 0%, 1, 1)', function() {
      expect(coco.isHsv('hsva(0, 0%, 0%, 1, 1)')).to.be.false;
    });
    // Unknown color format
    it('should return false for hs(0, 0%, 0%)', function() {
      expect(coco.isHsv('hs(0, 0%, 0%)')).to.be.false;
    });
    // NaN inputs
    it('should return false for hsv(a, b%, c%)', function() {
      expect(coco.isHsv('hsv(a, b%, c%)')).to.be.false;
    });
    // Do not test validity of input ranges.
  });

  describe('isName()', function() {
    it('should return true for black', function() {
      expect(coco.isName('black')).to.be.true;
    });
    it('should return true for rebeccapurple', function() {
      expect(coco.isName('rebeccapurple')).to.be.true;
    });
    it('should return true for orange', function() {
      expect(coco.isName('orange')).to.be.true;
    });
    it('should return false for bblack', function() {
      expect(coco.isName('bblack')).to.be.false;
    });
  });

  describe('isAlpha()', function() {
    isAlpha();
    it('should return false for #12345678', function() {
      expect(coco.isAlpha('#12345678')).to.be.false;
    });
  });

  describe('isEqual()', function() {
    it('should return true for #ffa500 === hsl(39, 100%, 50%)', function() {
      expect(coco.isEqual('#ffa500', 'hsl(39, 100%, 50%)')).to.be.true;
    });
    it('should return true for #ffa600 === hsl(39, 100%, 50%)', function() {
      expect(coco.isEqual('#ffa600', 'hsl(39, 100%, 50%)')).to.be.true;
    });
    it('should return false for #ffa600 === #ffa500', function() {
      expect(coco.isEqual('#ffa600', '#ffa500')).to.be.false;
    });
  });

  describe('format()', function() {
    it('should return hex for #000000', function() {
      expect(coco.format('#000000')).to.equal('hex');
    });
    it('should return hex for #000', function() {
      expect(coco.format('#000')).to.equal('hex');
    });
    it('should return rgb for rgb(0, 0, 0)', function() {
      expect(coco.format('rgb(0, 0, 0)')).to.equal('rgb');
    });
    it('should return hsl for hsl(0, 0% 0%)', function() {
      expect(coco.format('hsl(0, 0%, 0%)')).to.equal('hsl');
    });
    it('should return hsv for hsv(0, 0%, 0%)', function() {
      expect(coco.format('hsv(0, 0%, 0%)')).to.equal('hsv');
    });
    it('should return name for black', function() {
      expect(coco.format('black')).to.equal('name');
    });
    it('should return undefined for bblack', function() {
      expect(coco.format('bblack')).to.be.undefined;
    });
  });

  describe('replace()', function() {
    var strIn = ['.selector {',
      'box-shadow: 0px 10px 14px -7px #276873;',
      'background:linear-gradient(to bottom, #599bb3 5%, hsva(241, 100%, 50%, 0.40) 100%);',
      'filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#599bb3\', endColorstr=\'#408c99\',GradientType=0);',
      'background-color: red;',
      'border-bottom: 20px solid rgba(0, 0, 0, 0.35);',
      'color: #000 !important;',
      'color: hsl(241, 100%, 50%);',
      'color: redfish;',
      'color: #12;',
      'color: #123456789;',
      'color: rgba(0, 0, 0);',
    '}'].join('');

    var strOut = ['.selector {',
      'box-shadow: 0px 10px 14px -7px rgb(39, 104, 115);',
      'background:linear-gradient(to bottom, rgb(89, 155, 179) 5%, rgba(2, 0, 128, 0.40) 100%);',
      'filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'rgb(89, 155, 179)\', endColorstr=\'rgb(64, 140, 153)\',GradientType=0);',
      'background-color: rgb(255, 0, 0);',
      'border-bottom: 20px solid rgba(0, 0, 0, 0.35);',
      'color: rgb(0, 0, 0) !important;',
      'color: rgb(4, 0, 255);',
      'color: redfish;',
      'color: #12;',
      'color: #123456789;',
      'color: rgba(0, 0, 0);',
    '}'].join('');

    it('should replace each color in a given string with their rgb represetation', function() {
      expect(coco.replace(strIn, function(match) {
        return coco(match, 'rgb');
      })).to.equal(strOut);
    });
  });

  describe('css4 supported', function() {
    before(function() {
      coco.supportCss4();
    });
    after(function() {
      coco.unsupportCss4();
    });
    describe('isHexShort()', function() {
      isHexShort();
      it('should return true for #1234', function() {
        expect(coco.isHexShort('#1234')).to.be.true;
      });
    });
    describe('isHexLong()', function() {
      isHexLong();
      it('should return true for #12345678', function() {
        expect(coco.isHexLong('#12345678')).to.be.true;
      });
    });
    describe('isHex()', function() {
      isHex();
      it('should return true for #1234', function() {
        expect(coco.isHex('#1234')).to.be.true;
      });
      it('should return true for #12345678', function() {
        expect(coco.isHex('#12345678')).to.be.true;
      });
    });
    describe('isAlpha()', function() {
      isAlpha();
      it('should return true for #1234', function() {
        expect(coco.isAlpha('#1234')).to.be.true;
      });
      it('should return true for #12345678', function() {
        expect(coco.isAlpha('#12345678')).to.be.true;
      });
    });
  });
});

function isHexShort() {
  it('should return true for #ABC', function() {
    expect(coco.isHexShort('#ABC')).to.be.true;
  });
  it('should return true for #DEF', function() {
    expect(coco.isHexShort('#DEF')).to.be.true;
  });
  it('should return true for #abc', function() {
    expect(coco.isHexShort('#abc')).to.be.true;
  });
  it('should return true for #def', function() {
    expect(coco.isHexShort('#def')).to.be.true;
  });
  it('should return true for #123', function() {
    expect(coco.isHexShort('#123')).to.be.true;
  });
  it('should return true for #456', function() {
    expect(coco.isHexShort('#456')).to.be.true;
  });
  it('should return true for #789', function() {
    expect(coco.isHexShort('#789')).to.be.true;
  });
  it('should return true for #000', function() {
    expect(coco.isHexShort('#000')).to.be.true;
  });
  it('should return false for #12', function() {
    expect(coco.isHexShort('#12')).to.be.false;
  });
}

function isHexLong() {
  it('should return true for #ABCDFE', function() {
    expect(coco.isHexLong('#ABCDFE')).to.be.true;
  });
  it('should return true for #abcdef', function() {
    expect(coco.isHexLong('#abcdef')).to.be.true;
  });
  it('should return true for #132456', function() {
    expect(coco.isHexLong('#123465')).to.be.true;
  });
  it('should return true for #456789', function() {
    expect(coco.isHexLong('#456789')).to.be.true;
  });
  it('should return true for #000000', function() {
    expect(coco.isHexLong('#000000')).to.be.true;
  });
  it('should return false for #12345', function() {
    expect(coco.isHexLong('#12345')).to.be.false;
  });
  it('should return false for #1234567', function() {
    expect(coco.isHexLong('#1234567')).to.be.false;
  });
}

function isHex() {
  // hex6
  it('should return true for #ABCDFE', function() {
    expect(coco.isHex('#ABCDFE')).to.be.true;
  });
  it('should return true for #abcdef', function() {
    expect(coco.isHex('#abcdef')).to.be.true;
  });
  it('should return true for #000000', function() {
    expect(coco.isHex('#000000')).to.be.true;
  });
  it('should return true for #123456', function() {
    expect(coco.isHex('#123456')).to.be.true;
  });
  it('should return true for #456789', function() {
    expect(coco.isHex('#456789')).to.be.true;
  });
  // hex3
  it('should return true for #123', function() {
    expect(coco.isHex('#123')).to.be.true;
  });
  // 2 digits
  it('should return false for #12', function() {
    expect(coco.isHex('#12')).to.be.false;
  });
  // 5 digits
  it('should return false for #12345', function() {
    expect(coco.isHex('#12345')).to.be.false;
  });
  // 7 digits
  it('should return false for #1234567', function() {
    expect(coco.isHex('#1234567')).to.be.false;
  });
  // 9 digits
  it('should return false for #123456789', function() {
    expect(coco.isHex('#123456789')).to.be.false;
  });
  // without sharp
  it('should return false for 123456', function() {
    expect(coco.isHex('123456')).to.be.false;
  });
  // out of range
  it('should return false for #12345g', function() {
    expect(coco.isHex('#12345g')).to.be.false;
  });
  it('should return false for #g12345', function() {
    expect(coco.isHex('#g12345')).to.be.false;
  });
}

function isAlpha() {
  it('should return true for rgba(0, 0, 0, 1)', function() {
    expect(coco.isAlpha('rgba(0, 0, 0, 1)')).to.be.true;
  });
  it('should return true for hsla(0, 0%, 0%, 0.5)', function() {
    expect(coco.isAlpha('hsla(0, 0%, 0%, 0.5)')).to.be.true;
  });
  it('should return true for hsva(0, 0%, 0%, .5)', function() {
    expect(coco.isAlpha('hsva(0, 0%, 0%, .5)')).to.be.true;
  });
  it('should return false for rgb(0, 0, 0, 1)', function() {
    expect(coco.isAlpha('rgb(0, 0, 0, 1)')).to.be.false;
  });
  it('should return false for rgba(0, 0, 0)', function() {
    expect(coco.isAlpha('rgba(0, 0, 0)')).to.be.false;
  });
  it('should return false for #123456', function() {
    expect(coco.isAlpha('#123456')).to.be.false;
  });
}
