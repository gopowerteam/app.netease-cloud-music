const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  // 隐藏菜单栏
  const Menu = electron.Menu;
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
    minWidth: 1000,
    minHeight: 680,
    show: false,
    // 隐藏标题栏
    titleBarStyle: "hiddenInset"
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // 打开控制台
  electron.globalShortcut.register("CommandOrControl+O", () => {
    mainWindow.webContents.openDevTools();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
