const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //Load htm into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );
  //Close app on main window closed
  mainWindow.on("closed", function () {
    app.quit();
  });
}

//Handle add item menu option
function createAddWindow() {
  let addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add List Item",
  });

  // and load the index.html of the app.
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );
  //Garbage collection handle
  addWindow.on("close", function () {
    addWindow = null;
  });
}

app.whenReady().then(function() {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

//Menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Items",
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

//if mac add empty object to menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

//Add developer tools item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Toggle Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: 'reload'
      }
    ],
  });
}
