var expect = require('chai').expect;
var coco = require('../build');

describe('test-hue-conversion.js >>', function() {

  describe('hue to rgb', function() {
    it('sample1', function() {
      expect(coco.hue2rgb(0)).to.deep.equal([255, 0, 0, 1]);
    });
    it('sample2', function() {
      expect(coco.hue2rgb(40)).to.deep.equal([255, 170, 0, 1]);
    });
    it('sample3', function() {
      expect(coco.hue2rgb(120)).to.deep.equal([0, 255, 0, 1]);
    });
    it('sample4', function() {
      expect(coco.hue2rgb(160)).to.deep.equal([0, 255, 170, 1]);
    });
    it('sample5', function() {
      expect(coco.hue2rgb(240)).to.deep.equal([0, 0, 255, 1]);
    });
    it('sample6', function() {
      expect(coco.hue2rgb(360)).to.deep.equal([255, 0, 0, 1]);
    });
  });

  describe('hue to hsl', function() {
    it('sample1', function() {
      expect(coco.hue2hsl(120)).to.deep.equal([120, 100, 50, 1]);
    });
  });

  describe('hue to hsv', function() {
    it('sample1', function() {
      expect(coco.hue2hsv(120)).to.deep.equal([120, 100, 100, 1]);
    });
  });
});
