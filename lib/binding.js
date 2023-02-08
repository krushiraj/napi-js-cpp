const { getMD5String, sum } = require("../build/Release/native-code");
const sumJs = require("./sum");
const getMD5StringJs = require("./md5");

module.exports = { getMD5String, sum, sumJs, getMD5StringJs };
