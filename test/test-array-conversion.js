var expect = require('chai').expect;
var coco = require('../build');

//New samples should be checked in Photoshop.
describe('test-array-conversion.js >>', function() {

  // hex/hsl conversions
  describe('hex to hsl', function() {
    it('sample1', function() {
      expect(fix2(coco.hex2hsl('#cc4f4d'))).to.deep.equal([0.94, 55.46, 55.1, 1]);
    });
    it('sample2', function() {
      expect(fix2(coco.hex2hsl('#b2ffca'))).to.deep.equal([138.70, 100, 84.90, 1]);
    });
    it('sample3', function() {
      expect(fix2(coco.hex2hsl('#f7b08c'))).to.deep.equal([20.19, 86.99, 75.88, 1]);
    });
  });

  describe('hsl-decimal to hex', function() {
    it('sample1', function() {
      expect(fix2(coco.hsl2hex([0.94, 55.46, 55.1, 1]))).to.equal('#cc4f4d');
    });
    it('sample2', function() {
      expect(fix2(coco.hsl2hex([138.70, 100, 84.90, 1]))).to.equal('#b2ffca');
    });
    it('sample3', function() {
      expect(fix2(coco.hsl2hex([20.19, 86.99, 75.88, 1]))).to.equal('#f7b08c');
    });
  });

  describe('hsl to hex', function() {
    it('sample1', function() {
      expect(fix2(coco.hsl2hex([1, 55, 55, 1]))).to.equal('#cb4f4d');
    });
    it('sample2', function() {
      expect(fix2(coco.hsl2hex([139, 100, 85, 1]))).to.equal('#b3ffcb');
    });
    it('sample3', function() {
      expect(fix2(coco.hsl2hex([20, 87, 76, 1]))).to.equal('#f7b08d');
    });
  });

  describe('css4 supported', function() {
    before(function() {
      coco.supportCss4();
    });
    after(function() {
      coco.unsupportCss4();
    });
    describe('hex to hsl', function() {
    it('sample1', function() {
      expect(fix2(coco.hex2hsl('#cc4f4d00'))).to.deep.equal([0.94, 55.46, 55.1, 0]);
    });
    it('sample2', function() {
      expect(fix2(coco.hex2hsl('#cc4f4d59'))).to.deep.equal([0.94, 55.46, 55.1, 0.35]);
    });
    it('sample3', function() {
      expect(fix2(coco.hex2hsl('#b2ffca80'))).to.deep.equal([138.70, 100, 84.90, 0.5]);
    });
    it('sample4', function() {
      expect(fix2(coco.hex2hsl('#f7b08caa'))).to.deep.equal([20.19, 86.99, 75.88, 0.67]);
    });
    it('sample5', function() {
      expect(fix2(coco.hex2hsl('#f35f'))).to.deep.equal([350, 100, 60, 1]);
    });
    it('sample6', function() {
      expect(fix2(coco.hex2hsl('#f7b08c'))).to.deep.equal([20.19, 86.99, 75.88, 1]);
    });
  });
    describe('hsl to hex', function() {
      it('sample1', function() {
        expect(fix2(coco.hsl2hex([1, 55, 55, 0]))).to.equal('#cb4f4d00');
      });
      it('sample2', function() {
        expect(fix2(coco.hsl2hex([1, 55, 55, 0.35]))).to.equal('#cb4f4d59');
      });
      it('sample3', function() {
        expect(fix2(coco.hsl2hex([139, 100, 85, 0.5]))).to.equal('#b3ffcb80');
      });
      it('sample4', function() {
        expect(fix2(coco.hsl2hex([20, 87, 76, 0.666]))).to.equal('#f7b08daa');
      });
      it('sample5', function() {
        expect(fix2(coco.hsl2hex([350, 100, 60, 1]))).to.equal('#f35f');
      });
    });
  });

  // hex/hsv conversions
  describe('hex to hsv', function() {
    it('sample1', function() {
      expect(fix2(coco.hex2hsv('#65f75b'))).to.deep.equal([116.15, 63.16, 96.86, 1]);
    });
    it('sample2', function() {
      expect(fix2(coco.hex2hsv('#dd77d3'))).to.deep.equal([305.88, 46.15, 86.67, 1]);
    });
    it('sample3', function() {
      expect(fix2(coco.hex2hsv('#1b2fa0'))).to.deep.equal([230.98, 83.13, 62.75, 1]);
    });
  });

  describe('hsv-decimal to hex', function() {
    it('sample1', function() {
      expect(fix2(coco.hsv2hex([116.15, 63.16, 96.86, 1]))).to.equal('#65f75b');
    });
    it('sample2', function() {
      expect(fix2(coco.hsv2hex([305.88, 46.15, 86.67, 1]))).to.equal('#dd77d3');
    });
    it('sample3', function() {
      expect(fix2(coco.hsv2hex([230.98, 83.13, 62.75, 1]))).to.equal('#1b2fa0');
    });
  });

  describe('hsv to hex', function() {
    it('sample1', function() {
      expect(fix2(coco.hsv2hex([116, 63, 97, 1]))).to.equal('#66f75c');
    });
    it('sample2', function() {
      expect(fix2(coco.hsv2hex([306, 46, 87, 1]))).to.equal('#de78d4');
    });
    it('sample3', function() {
      expect(fix2(coco.hsv2hex([231, 83, 63, 1]))).to.equal('#1b2fa1');
    });
  });
});

function fix2(arr) {
  var i = arr.length;
  while (i--) {
    if (arr[i].toFixed) {
      arr[i] = +arr[i].toFixed(2);
    }
  }
  return arr;
}
