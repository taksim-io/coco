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

  describe('getAlpha()', function() {
    it('should return 1 for #123456', function() {
      expect(coco.getAlpha('#123456')).to.equal(1);
    });
    it('should return 1 for rgb(0, 0, 0)', function() {
      expect(coco.getAlpha('rgb(0, 0, 0)')).to.equal(1);
    });
    it('should return 1 for rgba(0, 0, 0)', function() {
      expect(coco.getAlpha('rgba(0, 0, 0)')).to.equal(1);
    });
    it('should return 0 for rgba(0, 0, 0, 0)', function() {
      expect(coco.getAlpha('rgba(0, 0, 0, 0)')).to.equal(0);
    });
    it('should return 0.5 for hsla(0, 0%, 0%, 0.5)', function() {
      expect(coco.getAlpha('hsla(0, 0%, 0%, 0.5)')).to.equal(0.5);
    });
    it('should return 0.75 for hsva(0, 0%, 0%, .75)', function() {
      expect(coco.getAlpha('hsva(0, 0%, 0%, .75)')).to.equal(0.75);
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

    describe('getAlpha()', function() {
      it('should return 1 for #123456', function() {
        expect(coco.getAlpha('#123456')).to.equal(1);
      });
      it('should return 1 for #123', function() {
        expect(coco.getAlpha('#123')).to.equal(1);
      });
      // hex8
      it('should return 1 for #123456ff', function() {
        expect(coco.getAlpha('#123456ff')).to.equal(1);
      });
      it('should return 0.75 for #123456c0', function() {
        expect(coco.getAlpha('#123456c0')).to.equal(0.75);
      });
      it('should return 0.47 for #12345678', function() {
        expect(coco.getAlpha('#12345678')).to.equal(0.47);
      });
      it('should return 0 for #12345600', function() {
        expect(coco.getAlpha('#12345600')).to.equal(0);
      });
      // hex4
      it('should return 1 for #123f', function() {
        expect(coco.getAlpha('#123f')).to.equal(1);
      });
      it('should return 0.8 for #123c', function() {
        expect(coco.getAlpha('#123c')).to.equal(0.8);
      });
      it('should return 0.27 for #1234', function() {
        expect(coco.getAlpha('#1234')).to.equal(0.27);
      });
      it('should return 0 for #1230', function() {
        expect(coco.getAlpha('#1230')).to.equal(0);
      });
    });
  });
});
