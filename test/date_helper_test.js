var expect = require("expect.js")
    , dateHelper = require("../lib/date_helper.js");

describe("DateHelper", function(){
  before(function(){
  });

  describe("#parse()", function() {
      it ("parse a date from YYYYMMDD HH:MM:SS", function() {
        var str = '20150525 01:32:31';
        var expDate = new Date(2015, 04, 25, 1, 32, 31);
        expect(dateHelper.parse(str)).to.eql(expDate);
     });
  })
 
  describe("#secondsTill()", function() {
      it ("returns the number of seconds", function() {
        var startDate = new Date(2015, 01, 01, 12, 0, 0);
        var endDate = new Date(2015, 01, 01, 12, 5, 30);
        expect(dateHelper.secondsTill(endDate, startDate)).to.eql(330);
     });
  })
 
  describe("secondsToHuman", function() { 
    it("displays minutes and seconds", function() {
      var exp = '1 minutes and 0 seconds';
      expect(dateHelper.secondsToHuman("60")).to.equal(exp)
    });

    it("displays no minutes but seconds", function() {
      var exp = '59 seconds';
      expect(dateHelper.secondsToHuman("59")).to.equal(exp)
    });
  })
});
