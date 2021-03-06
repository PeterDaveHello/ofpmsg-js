(function(){
var expect = require('expect.js');
'use strict';

var ofp = require('../lib/index');
var view = ofp.view;
var Message = ofp.msg;

describe('No throw tests', function() {

  it('OFP 1.0', function() {
    var msg = ofp['1.0'];
    msg.Hello();
    msg.Error();
    msg.EchoReq();
    msg.Vendor();
    msg.Hello('aasdfsadf');
    msg.Error({
      type: 4,
      code: 6,
      data: 'aasdfasdf'
    });
    msg.EchoReq('yo');
    msg.EchoRes('bro');
    msg.Vendor({
      id: 1,
      data: 'secret stuff'
    });
    msg.FeatureReq();
    msg.FeatureRes();
  });

  it('OFP 1.1', function() {
    //FIXME
  });

  it('OFP 1.2', function() {
    //FIXME
  });

  it('OFP 1.3', function() {
    var msg = ofp['1.3'];
    msg.Hello();
    //FIXME
  });

  it('OFP 1.4', function() {
    //FIXME
  });

  it('OFP 1.5', function() {
    //FIXME
  });

});

/*describe('fromView tests', function() {
  
  it('OFP 1.0', function() {
    var b = new Buffer(32);
    b.fill(0);
    var v = new view.View(b);

    var msg = ofp["1.0"];
    var err = msg.Error({ type: 1, code: 2, data: 'blah blah blah' });
    err.toView(v);

    v.reset();
    // Version specific fromView
    var m1 = msg.fromView(v);
    expect(m1.payload.type.value()).to.equal(1);
    expect(m1.payload.code.value()).to.equal(2);

    v.reset();
    // General fromView
    var m2 = ofp.msg.fromView(v);
    v.reset();
    // General fromView with version called out
    var m3 = ofp.msg.fromView(v, msg.VERSION);

  });

  it('OFP 1.1', function() {
    //FIXME
  });

  it('OFP 1.2', function() {
    //FIXME
  });

  it('OFP 1.3', function() {
    var buf = new Buffer([4, 0, 0, 8, 0, 0, 0, 6]);
    var v = new view.View(buf);
    var msg = Message.fromView(v);
    //FIXME
  });

  it('OFP 1.4', function() {
    //FIXME
  });

  it('OFP 1.5', function() {
    //FIXME
  });

}); */

  describe('bytes tests', function(){
    it('OFP 1.0', function(){
      var msg = ofp['1.0'];
      var fr = msg.FeatureReq();
      expect(fr.header.bytes().value()).to.equal(8);
      expect(fr.payload.bytes().value()).to.equal(0);
      expect(fr.bytes().value()).to.equal(8);

      var he = msg.Hello();
      expect(he.header.bytes().value()).to.equal(8);
      expect(he.payload.bytes().value()).to.equal(0);
      expect(he.bytes().value()).to.equal(8);
      
      var er = msg.EchoRes();
      expect(er.header.bytes().value()).to.equal(8);
      expect(er.payload.bytes().value()).to.equal(0);
      expect(er.bytes().value()).to.equal(8);
    });
  });

  describe('Data tests', function(){
    it('OFP 1.0', function(){
      var msg = ofp['1.0'];
      var buf = new Buffer([1,1,0,16,0,0,0,1,0,1,0,1,7,7,7,7]);
      var v = new view.View(buf);
      var e = Message.fromView(v);
      var v2 = new view.View(buf);
      e.toView(v2);
    });
  });

})();
