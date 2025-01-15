const { getLocalData } = require("./getLocalData");
const fs = require("fs");

const writeLocalData = async (data) => {
  try {
    const filePath = await getLocalData();
    return new Promise((resolve, reject) =>
      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    );
  } catch (e) {
    console.log("Error in writeLocalData", e);
  }
};

module.exports = { writeLocalData };
