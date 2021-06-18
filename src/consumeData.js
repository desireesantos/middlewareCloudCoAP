const coap = require("coap");
const { fogToCloud, cloudToFog } = require("../config/configuration");

exports.consumeDataFromTopic = function () {
  cloud = coap.request(fogToCloud);
  cloud.on("response", function (cloud) {
    cloud.on("data", function (message) {
      console.log("Message from Fog device:", message.toString());
      sendToFog(message);
    });

    cloud.on("end", function () {
      console.log("Success");
    });
  });
  cloud.end();
};

function sendToFog(message) {
  fog = coap.request(cloudToFog);
  fog.write(message.toString());
  fog.end();
}
