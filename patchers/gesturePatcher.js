const fs = require('fs');

console.log('Fix - react-native-swipe-gestures');

const filePath = "./node_modules/react-native-swipe-gestures/index.js";
const fixedFilePath = './patchers/fixedGestureRecognizer.js';

const fixedFile = fs.readFileSync(fixedFilePath).toString();

fs.writeFile(filePath, fixedFile, function (err) {
  if (err) return console.log(err);
  console.log('overwritten!')
});