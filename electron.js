const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;

const { ipcMain } = require("electron");
ipcMain.on("minimize", () => {
  mainWindow.minimize()
});
ipcMain.on("maximize", () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
});
ipcMain.on("close", () => {
  mainWindow.close();
});
ipcMain.on("isDev", (event) => {
  event.returnValue = isDev;
});

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: `${__dirname}/public/img/TaleManager.png`,
    webPreferences: {
      nodeIntegration: true
    },
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );

  if (isDev) {
    //mainWindow.webContents.openDevTools();
    mainWindow.setIcon(path.join(__dirname, '/public/img/TaleManagerHomologacao.png'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});