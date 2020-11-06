const path = window.require('path');
const fs = window.require('fs');

class FileController {
  constructor() {
    this.folders = ['Campaign', 'Chars', 'Places'];
    this.Campaign = [];
    this.Chars = [];
    this.Places = [];

    this.darksunFolder = (window.require("electron").app || window.require("electron").remote.app).getPath('documents') + '/Darksun';

    if (!fs.existsSync(this.darksunFolder)) {
      fs.mkdirSync(this.darksunFolder);
    }

    this.folders.forEach(folder => {
      const folderPath = this.darksunFolder + '/' + folder;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      let files = fs.readdirSync(folderPath);

      files.forEach(file => {
        this[folder].push(parseDataFile(path.join(folderPath, file)));
      });
    });
  }

  get(type, key) {
    return this[type][key];
  }

  getArray(type) {
    return this[type];
  }

  set(type, key, attribute, val) {
    this[type][key][attribute] = val;
    const path = this.darksunFolder + '/' + type + '/' + this.get(type, key).fileName;
    fs.writeFileSync(path, JSON.stringify(this[type][key], null, 2));
  }

  setObject(type, object) {
    const path = this.darksunFolder + '/' + type + '/' + object.fileName;
    fs.writeFileSync(path, JSON.stringify(object, null, 2));
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