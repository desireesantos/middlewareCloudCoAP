const coap = require("coap");
const coapClient = require("node-coap-client").CoapClient;

const { fogToCloud, cloudToFog } = require("../config/configuration");
const { protocol ,hostname, port, pathname, method } = fogToCloud;
const URL_RESOURCE = `${protocol}://${hostname}:${port}/${pathname}`;

exports.consumeDataFromTopic = function () {
  coapClient.observe(
    URL_RESOURCE,  
    method,
    (response) => {
      console.log("PAYLOAD FROM FOG:", Buffer.from(response.payload).toString('utf-8'))
      hasPayloadError(response) ? getValue() : sendToFog(Buffer.from(response.payload).toString('utf-8'))
    })
  .then(() => { console.log("SUCCESS")})
  .catch(err => { console.error("ConsumeDataFromTopic - Observe Error", err)});
};

const hasPayloadError = (res) => {return res.code.major >= 4 && res.code.minor == 0 }

const sendToFog = (data) => {
  var req = coap.request(cloudToFog);
  req.setOption('Block1', Buffer.alloc(0x6))

  const payload = buildPayload(data)

  console.log("SEND TO FOG: ", payload)

  req.write(payload);

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
  const json = sanitezeTextIntoObject(data)

  const payload = {
    'message': json.message ? Buffer.from(json.message).toString(): Buffer.from(data).toString(),
    'date': json.date ? json.date.concat(`, ${new Date().toISOString()}`) : new Date().toISOString()
  }
  return JSON.stringify(payload);
}

async function getValue() {
    coapClient.request( URL_RESOURCE, method)
     .then(response => { sendToFog(Buffer.from(response.payload).toString('utf-8')) })
     .catch(err => { console.error("ConsumeDataFromTopic - GetValue - Get Error", err)});
}

const sanitezeTextIntoObject = (textToSinetize) => {
  const convertToObject = JSON.parse(JSON.stringify(textToSinetize));
  const textFormated = convertToObject.replace('""}', '"}');
  return JSON.parse(textFormated);
}