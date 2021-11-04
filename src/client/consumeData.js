const coap = require("coap");
const { fogToCloud, cloudToFog } = require("../config/configuration");

exports.consumeDataFromTopic = function () {
  cloud = coap.request(fogToCloud);
  cloud.on("response", function (cloud) {
    cloud.on("data", function (data) {
      console.log("Message from Fog device:", data.message.toString());

      sendToFog(buildPayload(data));
    });

    cloud.on("end", function () {
      console.log("Success");
    });
  });
  cloud.end();
};

function sendToFog(data) {
  fog = coap.request(cloudToFog);
  fog.write(buildPayload(data));
  fog.end();
}

function buildPayload(data) {
  return {
    message: Buffer.from(data.message).toString(),
    date: data.date.concat(`, ${new Date().toISOString()}`)
  }
}