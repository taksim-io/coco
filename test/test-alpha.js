var expect = require('chai').expect;
var coco = require('../build');

describe('test-alpha.js >>', function() {

  describe('getAlpha()', function() {
    it('should return 1 for red', function() {
      expect(coco.getAlpha('red')).to.equal(1);
    });
    it('should return 1 for #123456', function() {
      expect(coco.getAlpha('#123456')).to.equal(1);
    });
    it('should return 1 for #12345678', function() {
      expect(coco.getAlpha('#12345678')).to.equal(1);
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

  describe('setAlpha()', function() {
    it('should return rgba(255, 0, 0, 0.5)', function() {
      expect(coco.setAlpha('red', 0.5)).to.equal('rgba(255, 0, 0, 0.5)');
    });
    it('should return rgba(17, 34, 51, 0.5)', function() {
      expect(coco.setAlpha('#123', 0.5)).to.equal('rgba(17, 34, 51, 0.5)');
    });
    it('should return rgba(18, 52, 86, 0.5)', function() {
      expect(coco.setAlpha('#123456', 0.5)).to.equal('rgba(18, 52, 86, 0.5)');
    });
    it('should return rgba(0, 0, 0, 0.5)', function() {
      expect(coco.setAlpha('rgb(0, 0, 0)', 0.5)).to.equal('rgba(0, 0, 0, 0.5)');
    });
    it('should return rgba(0, 0, 0, 0.8)', function() {
      expect(coco.setAlpha('rgba(0, 0, 0, 0.5)', 0.8)).to.equal('rgba(0, 0, 0, 0.8)');
    });
    it('should return rgb(0, 0, 0)', function() {
      expect(coco.setAlpha('rgb(0, 0, 0)', 1)).to.equal('rgb(0, 0, 0)');
    });
    it('should return #12345678', function() {
      expect(coco.setAlpha('#12345678', 0.5)).to.equal('#12345678');
    });
  });

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

  describe('hex8 supported', function() {
    before(function() {
      coco.supportHex8();
    });
    after(function() {
      coco.unsupportHex8();
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

    describe('setAlpha()', function() {
    it('should return #f00c', function() {
      expect(coco.setAlpha('red', 0.8)).to.equal('#f00c');
    });
    it('should return #ff000080', function() {
      expect(coco.setAlpha('red', 0.5)).to.equal('#ff000080');
    });
    it('should return #123c', function() {
      expect(coco.setAlpha('#123', 0.8)).to.equal('#123c');
    });
    it('should return #11223380', function() {
      expect(coco.setAlpha('#123', 0.5)).to.equal('#11223380');
    });
    it('should return #12345600', function() {
      expect(coco.setAlpha('#123456', 0)).to.equal('#12345600');
    });
    it('should return #123456cc', function() {
      expect(coco.setAlpha('#12345600', 0.8)).to.equal('#123456cc');
    });
    it('should return #123456', function() {
      expect(coco.setAlpha('#12345600', 1)).to.equal('#123456');
    });
    it('should return #123', function() {
      expect(coco.setAlpha('#1230', 1)).to.equal('#123');
    });
    it('should return #123c', function() {
      expect(coco.setAlpha('#1230', 0.8)).to.equal('#123c');
    });
    it('should return #11223380', function() {
      expect(coco.setAlpha('#1230', 0.5)).to.equal('#11223380');
    });
    it('should return #12300', function() {
      expect(coco.setAlpha('#12300', 0.5)).to.equal('#12300');
    });
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
