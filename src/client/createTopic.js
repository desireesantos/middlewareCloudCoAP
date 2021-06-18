const coap = require("coap");
const {
  build_COAP_Topics,
  requestOptions,
} = require("../config/configuration");

exports.createCoaPTopics = function () {
  build_COAP_Topics.map(function (pathname) {
    request = coap.request(buildOptions(pathname));
    request.write(JSON.stringify(`message to ${pathname}`));
    request.on("response", (resp) => {
      console.log("Got response:", resp.code, resp.payload.toString());
    });
    request.end();
  });
};

function buildOptions(pathname) {
  return Object.assign(requestOptions, { pathname });
}
