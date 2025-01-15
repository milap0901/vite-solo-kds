const { app } = require("electron");
const path = require("path");

const getLocalData = async () => {
  return app.isPackaged
    ? path.join(path.dirname(process.execPath), "localData.json")
    : path.join(__dirname, "..", "localData.json");
};

module.exports = { getLocalData };
