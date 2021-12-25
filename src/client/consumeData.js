const coap = require("coap");
const coapClient = require("node-coap-client").CoapClient;
const { fogToCloud, cloudToFog } = require("../config/configuration");
const RESOURCE_URL = 'coap://54.94.174.102:5683/middlewareToCloud';

exports.consumeDataFromTopic = function () {
  coapClient.observe(
    RESOURCE_URL,  
    'get',
    (res) => {
      hasPayloadError(res) ? getValue() : sendToFog(Buffer.from(res.payload).toString('utf-8'))
    }
  )
  .then(() => { console.log("SUCESS")})
  .catch(err => { console.error("Subscribe Call Error - Observer", err)});
};

const hasPayloadError = (res) => {return res.code?.major >= 4 && res.code?.minor == 0 }

function sendToFog(data) {
  
  var req = coap.request(cloudToFog);
  req.setOption('Block1', Buffer.alloc(0x6))

  const builPayload = buildPayload(JSON.stringify(data))
  req.write(builPayload);

  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP publish ", data);
    });
    res.on("end", function () {
      console.log("Finish Coap Publish");
    });
  });
  req.end();
}

function buildPayload(data) {
  const json = JSON.parse(data)
  const payload = {
    'message': json.message ? Buffer.from(json.message).toString(): Buffer.from(data).toString(),
    'date': json.date ? json.date.concat(`, ${new Date().toISOString()}`) : new Date().toISOString()
  }
  return JSON.stringify(payload);
}

async function getValue() {
  coap
     .request(
      RESOURCE_URL,
      'get',
     )
     .then(response => {
      sendToFog(Buffer.from(response.payload).toString())
     })
     .catch(err => { console.error("Subscribe Call Error - GET", err)})
     ;
}