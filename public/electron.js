const { default: Bonjour } = require("bonjour-service");
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

let mainWindow;

const isDevelopment = !app.isPackaged;

// Define the path to `localData.json`
const jsonPath = app.isPackaged
  ? path.join(path.dirname(process.execPath), "localData.json")
  : path.join(__dirname, "..", "localData.json");

// Function to create the main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false, // Security best practice
    },
  });

  // Load the appropriate URL or file
  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools(); // Open dev tools in development
  } else {
    const indexPath = path.join(__dirname, "../dist/index.html");
    mainWindow
      .loadFile(indexPath)
      .catch("\n\nElectron index path : ", console.error);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// App event listeners
app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// IPC handlers
ipcMain.handle("getLocalJsonData", async () => {
  try {
    if (!fs.existsSync(jsonPath)) {
      console.warn("localData.json does not exist.");
      return null;
    }
    const jsonContent = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error("Error reading localData.json:", error);
    return null;
  }
});

// Expose the function to the renderer process
ipcMain.handle("update-localjson-data", (event, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, jsonData);
    console.log("localjson updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating beforeload.json:", error);
    return false;
  }
});

ipcMain.handle("find-master", async () => {
  try {
    const serverData = await findMaster(jsonPath);
    const masterIpAddress = serverData?.referer?.address;
    console.log("Master IP Address:", masterIpAddress);

    const localData = await readJSONFileFromData(jsonPath);
    if (localData && localData.ip_address !== "localhost") {
      localData.ip_address = masterIpAddress;
      await writeLocalData(localData);
    }

    return masterIpAddress;
  } catch (error) {
    console.error("Error in find-master:", error);
    return null;
  }
});

// Utility functions (ensure these are defined in your project)
async function findMaster(filePath) {
  const { server_name } = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  return new Promise((resolve) => {
    const bonjour = new Bonjour();
    let found = false;

    bonjour.find({ type: "http" }, (service) => {
      if (service.name.toLowerCase() === server_name.toLowerCase()) {
        found = true;
        resolve(service);
        bonjour.destroy();
      }
    });

    setTimeout(() => {
      if (!found) {
        resolve(null);
        bonjour.destroy();
      }
    }, 5000);
  });
}

async function readJSONFileFromData(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

async function writeLocalData(data) {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
}
