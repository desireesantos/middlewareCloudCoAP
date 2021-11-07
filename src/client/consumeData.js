const coap = require("coap");
const { fogToCloud, cloudToFog } = require("../config/configuration");

exports.consumeDataFromTopic = function () {
  cloud = coap.request(fogToCloud);
  cloud.on("response", function (cloud) {
    cloud.on("data", function (data) {
      payload = Buffer.from(data).toString();
      sendToFog( buildPayload(payload) );

    });

    cloud.on("end", function () {
      console.log("Success");
    });
  });
  cloud.end();
};

function sendToFog(data) {
  fog = coap.request(cloudToFog);

  console.log("Send to Fog -->", data);

  fog.write(data);
  fog.end();
}

function buildPayload(data) {
  const json = JSON.parse(data)
  const payload = {
    'message': json.message ? Buffer.from(json.message).toString(): Buffer.from(data).toString(),
    'date': json.date ? json.date.concat(`, ${new Date().toISOString()}`) : new Date().toISOString()
  }
  return JSON.stringify(payload);
}