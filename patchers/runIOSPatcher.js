const fs = require('fs');

console.log('Fix - react-native-cli');

const filePath = "./node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js";
const fixedFilePath = './patchers/fixedFindMatchingSimulator.js';

const fixedFile = fs.readFileSync(fixedFilePath).toString();

fs.writeFile(filePath, fixedFile, function (err) {
  if (err) return console.log(err);
  console.log('overwritten!')
});