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
  pathname: "middlewareToCloud",
  method: "get",
  protocol: 'coap',
  observe: true,
  options: {
    Accept: 'application/json'
  }
};

var cloudToFog = Object.assign(requestOptions, {
  hostname: "localhost",
  port: 5683,
  pathname: "middlewareToFog",
  method: "put",
  observe: false,
  options: {
    Accept: 'application/json'
  }
});

module.exports = {
  cloudToFog,
  fogToCloud,
  requestOptions,
  build_COAP_Topics,
};
