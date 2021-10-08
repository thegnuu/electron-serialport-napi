const { app, BrowserWindow, ipcMain } = require("electron");
const SerialPort = require("serialport");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(async () => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("serialport-list", async () => {
    const ports = await SerialPort.list();
    console.log("list serial ports", ports);
    return ports;
  });

  const connected = {};

  ipcMain.handle("serialport-connect", async (event, params) => {
    console.log("connect to serial port", params);
    if (connected[params.path]) {
      return connected[params.path];
    }
    const port = new SerialPort(params.path);
    port.on("data", (data) => {
      console.log(params.path + " data:", data.toString());
      event.sender.send('serialport-data-' + params.path, data.toString());
    });
    connected[params.path] = port;
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
