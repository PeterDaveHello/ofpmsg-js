(function(){
var expect = require('expect.js');
var ofp = require('../lib');
var uint = require('uint-js');
var view = ofp.view;
var ofp1_3 = ofp['1.3'];
var mat    = ofp1_3.MATCH; 

describe('match', function(){
  describe('1.3', function(){
    it('match struct zero OXM TLVs fromView', function(){
      var buf = new Buffer([
        0, 1, 0, 4,
        0, 0, 0, 0
        ]);
      var mt = new mat.Match();
      var v = new view.View(buf);
      mt.fromView(v);
      expect(mt.bytes().value()).to.equal(8);
    });
    it('match struct zero OXM TLVs toView', function(){
      var buf = new Buffer([
        0, 1, 0, 4,
        0, 0, 0, 0
        ]);
      var mt = new mat.Match();
      var v = new view.View(buf);
      mt.fromView(v);
      expect(mt.bytes().value()).to.equal(8);
      v.reset();
      mt.toView(v);
    });
    it('match struct single OXM TLVs fromView', function(){
      var mt = new mat.Match();
      var buf = new Buffer([
        0, 1, 0, 14,       // type, length
        128, 0, 6, 6,     // ofp tlv type, ethernet (no mask), length
        0, 1, 2, 3,       // eth[0-3]
        4, 5, 0, 0        // eth[4-5], padding,
        ]);
      var v = new view.View(buf);
      var d = mt.fromView(v);
      expect(d.length.value()).to.equal(14);
      expect(d.bytes().value()).to.equal(16);
      expect(d.oxms[0].bytes().value()).to.equal(10);
    });
    it('match struct multiple OXM TLVs fromView', function(){
      var mt = new mat.Match();
      var buf = new Buffer([
        0, 1, 0, 34,       // type, length
        128, 0, 6, 6,     // ofp tlv type, ethernet (no mask), length
        0, 1, 2, 3,       // eth[0-3]
        4, 5, 128, 0,
        6, 6, 0, 1,
        2, 3, 4, 5,
        128, 0, 6, 6,
        1, 2, 3, 4,
        5, 6, 0, 0,
        0, 0, 0, 0
        ]);
      var v = new view.View(buf);
      var d = mt.fromView(v);
      expect(d.length.value()).to.equal(34);
      expect(d.bytes().value()).to.equal(40);
      expect(d.oxms[0].bytes().value()).to.equal(10);
      expect(d.oxms[1].bytes().value()).to.equal(10);
    });
   it('match struct single OXM TLVs mask fromView', function(){
      var mt = new mat.Match();
      var buf = new Buffer([
        0, 1, 0, 20,       // type, length
        128, 0, 7, 12,     // ofp tlv type, ethernet (no mask), length
        0, 1, 2, 3,       // eth[0-3]
        4, 5, 1, 1,       // eth[4-5], mask[0-1]
        1, 1, 1, 1,
        0, 0, 0, 0
        ]);
      var v = new view.View(buf);
      var d = mt.fromView(v);
      expect(d.oxms[0].bytes().value()).to.equal(16);
      expect(d.length.value()).to.equal(20);
      expect(d.bytes().value()).to.equal(24);
    });
   it('single OXM TLV toView', function(){
      var mt = new mat.Match();
      var buf = new Buffer([
        0, 1, 0, 20,       // type, length
        128, 0, 7, 12,    // ofp tlv type, ethernet (no mask), length
        0, 1, 2, 3, 4, 5, // value
        1, 1, 1, 1, 1, 1,  // mask
        0, 0, 0, 0
        ]);
      var v = new view.View(buf);
      var d = mt.fromView(v);
      expect(d.bytes().value()).to.equal(24);
      var b2 = new Buffer(d.bytes().value());
      var v2 = new view.View(b2);
      d.toView(v2);
    });
   it('multiple OXM TLV toView', function(){
      var mt = new mat.Match();
      var buf = new Buffer([
        0, 1, 0, 30,       // type, length
        128, 0, 7, 12,    // ofp tlv type, ethernet (no mask), length
        0, 1, 2, 3,       // eth[0-3]
        4, 5, 1, 1,       // eth[4-5], mask[0-1] 
        1, 1, 1, 1,       // mask[2-5]
        128, 0, 6, 6,     // eth2
        1, 2, 3, 4,
        5, 6, 0, 0
        ]);
      var v = new view.View(buf);
      var d = mt.fromView(v);
      expect(d.bytes().value()).to.equal(32);
      expect(d.length.value()).to.equal(30);
      var b2 = new Buffer(d.bytes().value());
      var v2 = new view.View(b2);
      d.toView(v2);
    });
  });
});
})();
