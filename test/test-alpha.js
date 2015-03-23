var expect = require('chai').expect;
var coco = require('../build');

describe('test-alpha.js >>', function() {

  describe('removeAlpha()', function() {
    it('should return #123456', function() {
      expect(coco.removeAlpha('#123456')).to.equal('#123456');
    });
    it('should return rgb(0, 0, 0)', function() {
      expect(coco.removeAlpha('rgba(0, 0, 0, 0.5)')).to.equal('rgb(0, 0, 0)');
    });
    it('should return hsl(0, 0, 0)', function() {
      expect(coco.removeAlpha('hsla(0, 0%, 0%, 0.5)')).to.equal('hsl(0, 0%, 0%)');
    });
    it('should return hsv(0, 0, 0)', function() {
      expect(coco.removeAlpha('hsva(0, 0%, 0%, 0.5)')).to.equal('hsv(0, 0%, 0%)');
    });
  });

  describe('css4 supported', function() {
    before(function() {
      coco.supportCss4();
    });
    after(function() {
      coco.unsupportCss4();
    });
    describe('removeAlpha()', function() {
      it('should return #123456', function() {
        expect(coco.removeAlpha('#123456')).to.equal('#123456');
      });
      it('should return #123456', function() {
        expect(coco.removeAlpha('#12345678')).to.equal('#123456');
      });
      it('should return #123', function() {
        expect(coco.removeAlpha('#123')).to.equal('#123');
      });
      it('should return #123', function() {
        expect(coco.removeAlpha('#1234')).to.equal('#123');
      });
    });
  });
});
