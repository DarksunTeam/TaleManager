const path = require('path');
const fs = window.require('fs');

class FileController {
  constructor(props) {
    this.folders = ['Places', 'Chars'];
    this.state = {
      Places: [],
      Chars: []
    };

    const taleManagerFolder = (window.require("electron").app || window.require("electron").remote.app).getPath('documents') + '\\TaleManager';

    if (!fs.existsSync(taleManagerFolder)) {
      fs.mkdirSync(taleManagerFolder);
    }

    this.folders.forEach(function (folder) {
      const folderPath = taleManagerFolder + '\\' + folder;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // this.path = path.join(folderPath, props.configName + '.json');

      // this.data = parseDataFile(this.path, props.defaults);

      // this.set(props.defaults.key, props.defaults.val);

    });
  }

  readFolder(path) {
    fs.readdir(path, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
        console.log(JSON.parse(fs.readFileSync(path + '/' + file)));
      });
    });
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return defaults;
  }
}

module.exports = FileController;