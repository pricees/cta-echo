var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

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
    "respository": "https://github.com/pricees/cta-echo"
    "license": "MIT"
  });
})

router.post('/', function(req, res) {
    var type = req.body.type;
    var requestId = req.body.requestId;
    var payload = { };

    switch(req.body.request.type) {
      case "LaunchRequest":
        payload = launchRequest(req);
        break;
      case "IntentRequest":
        payload = intentRequest(req.body.request.intent);
        break;
      case "SessionEndedRequest":
        payload = sessionEndedRequest(req);
        break;
      default:
        var name = req.query.name;
        if (!name) name = 'Dawg';
        payload = { message: 'Hello ' + name };   
    }

    res.json(payload);
});

function launchRequest(req) {
  return buildResponse("What stop and route?", false);
}

function sessionEndedRequest(req) {
  return buildResponse("Pow pow zow!", true);
}

var intents = {
  "TrainArrivals": function(slots) {
    var station = slots.Station.value
    var route = slots.Route.value
    var say = '';
    switch(relation) {
    }
    return buildResponse(say, true);
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
