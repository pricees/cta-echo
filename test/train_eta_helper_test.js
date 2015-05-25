var expect = require("expect.js")
    , trainEtaHelper  = require("../lib/train_eta_helper.js");

describe("TrainEtaHelper", function(){
  var data = [];
  before(function(){
    data = [
      { staId: [ '4q080' ],
        stpId: [ '30017' ],
        staNm: [ 'Sheridan' ],
        stpDe: [ 'Service toward 95th/Dan Ryan' ],
        rn: [ '932' ],
        rt: [ 'Red' ],
        destSt: [ '0' ],
        destNm: [ '95th/Dan Ryan' ],
        trDr: [ '5' ],
        prdt: [ '20150525 01:46:01' ],
        arrT: [ '20150525 02:17:01' ],
        isApp: [ '0' ],
        isSch: [ '1' ],
        isDly: [ '0' ],
        isFlt: [ '0' ],
        flags: [ '' ],
        lat: [ '' ],
        lon: [ '' ],
        heading: [ '' ] },
      { staId: [ '40080' ],
        stpId: [ '30016' ],
        staNm: [ 'Sheridan' ],
        stpDe: [ 'Service toward Howard' ],
        rn: [ '836' ],
        rt: [ 'Red' ],
        destSt: [ '0' ],
        destNm: [ 'Howard' ],
        trDr: [ '1' ],
        prdt: [ '20150525 01:46:00' ],
        arrT: [ '20150525 02:18:00' ],
        isApp: [ '0' ],
        isSch: [ '1' ],
        isDly: [ '0' ],
        isFlt: [ '0' ],
        flags: [ '' ],
        lat: [ '' ],
        lon: [ '' ],
        heading: [ '' ] } ];

  });

  describe("#parseEta()", function() {
      it ("returns an array SS", function() {
        var exp = [
          [ 'Red', 'Sheridan', 'Service toward 95th/Dan Ryan', '20150525 02:17:01' ],
          [ 'Red', 'Sheridan', 'Service toward Howard', '20150525 02:18:00' ]
        
        ];
        var res = trainEtaHelper.parseEtas(data);
        expect(res).to.eql(exp)
     });
  })
});

