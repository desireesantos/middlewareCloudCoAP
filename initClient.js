const { consumeDataFromTopic } = require("./src/client/consumeData");
const { createCoaPTopics } = require("./src/createTopic");

createCoaPTopics();
consumeDataFromTopic();
