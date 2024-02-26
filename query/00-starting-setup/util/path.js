/*const path = require('path');

module.exports = path.dirname(process.mainModule.filename);*/
const path = require('path');

let mainModuleDirname;
if (process.mainModule) {
  mainModuleDirname = path.dirname(process.mainModule.filename);
} else {
  // Handle the case where process.mainModule is not defined
  console.error('Unable to determine main module directory.');
}

module.exports = mainModuleDirname;
