var express      = require('express')        // call express
    , app        = express()                 // define our app using express
    , bodyParser = require('body-parser')
    , cta        = require('cta-node')
    , trainEtaHelper = require('./lib/train_eta_helper.js')
    , dateHelper = require('./lib/date_helper.js');
cta.init(); 

app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

// =============================================================================
// The Alexa App Interface must accept 3 types of request
//
// https://developer.amazon.com/public/solutions/devices/echo/alexa-app-kit/docs/alexa-appkit-app-interface-reference#intent-object
//
// - LaunchRequest
// - IntentRequest
// - SessionEndedRequest
//

router.get('/', function(req, res) {
    
  res.json({
    "author": "Edward Price",
    "email": "ted.price@gmail.com",
    "github": "pricees.github.io",
    "name": "CTA-Echo",
    "version": "0.0.1",
    "description": "Amazon Echo app for retrieving CTA information",
    "respository": "https://github.com/pricees/cta-echo",
    "license": "MIT"
  });
});

router.post('/', function(req, res) {
    var type = req.body.type;
    var requestId = req.body.requestId;
    var payload = { };

    switch(req.body.request.type) {
      case "LaunchRequest":
        return res.json(launchRequest(req));
        break;
      case "IntentRequest":
        try {
        intentRequest(req.body.request.intent)
          .then(arrivalsToText)
          .then(function(text) { return buildResponse(text, true); })
          .then(function(payload) { return res.json(payload) })
          .then(null, console.log)
          .done();
        } catch (e) {
          return res.json(buildResponse("An error occurred. Sorry bro.", true)); 
        }
        break;
      case "SessionEndedRequest":
        return res.json(sessionEndedRequest(req));
        break;
      default:
        var name = req.query.name;
        if (!name) name = 'Dawg';
        return res.json({ message: 'Hello ' + name });   
    }
});

function launchRequest(req) {
  return buildResponse("What stop and route?", false);
}

function sessionEndedRequest(req) {
  return buildResponse("Pow pow zow!", true);
}

function arrivalsToText(arrivals) {
  var text = '';
  var adjArrivals = trainEtaHelper.parseEtas(arrivals);
  for (var i = 0; i < adjArrivals.length; i++) {
    var tmp = adjArrivals[i];
    var timeTill = dateHelper.secondsToHuman(
      dateHelper.secondsTill(dateHelper.parse(tmp[3])));
    text += tmp[0] + " line with " + tmp[2] + " arriving at station in " + timeTill + ". ";
  }
  return text;
}

var intents = {
  "TrainArrivals": function(slots) {
    var station = slots.Station.value
    var route; 
    if (slots.Route) route = slots.Route.value;

    return cta.train.arrivals.byStationNameAndColor(station, route);
  }
}

function intentRequest(intent) {
  return intents[intent.name](intent.slots)
}

function buildResponse(text, shouldEndSession) {
  var payload = {
    "version": "1.0",
    /*"sessionAttributes": {
      "string": object
    },*/
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": text
      },
      /*"card": {
        "type": "string",
        "title": "string",
        "subtitle": "string",
        "content": "string"
      },*/
      "shouldEndSession": shouldEndSession
    }
  }
  return payload;
}

app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);
