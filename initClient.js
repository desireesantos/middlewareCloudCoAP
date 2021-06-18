const { consumeDataFromTopic } = require("./src/consumeData");
const { createCoaPTopics } = require("./src/createTopic");

createCoaPTopics();
consumeDataFromTopic();
