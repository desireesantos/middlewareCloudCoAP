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
  observe: true,
  options: {
    Accept: 'application/json'
  }
};

var cloudToFog = Object.assign(requestOptions, {
  pathname: "middlewareToFog",
  host: "localhost",
  port: 5683,
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
