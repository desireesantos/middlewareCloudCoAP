var build_COAP_Topics = ["middlewareToCloud", "middlewareToFog"];

var requestOptions = {
  host: "localhost",
  port: 5683,
  method: "put",
  observe: false,
};

var fogToCloud = {
  hostname: "localhost",
  port: 5683,
  pathname: "/middlewareToCloud",
  method: "get",
  observe: true,
};

var cloudToFog = Object.assign(requestOptions, {
  pathname: `/${build_COAP_Topics[1]}`,
  host: "localhost",
  port: 5683,
  method: "put",
  observe: false,
});

module.exports = {
  cloudToFog,
  fogToCloud,
  requestOptions,
  build_COAP_Topics,
};
