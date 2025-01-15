const { getLocalData } = require("./getLocalData");
const fs = require("fs");
const { writeLocalData } = require("./writeLocalData");

const readLocalData = async () => {
  try {
    const filePath = await getLocalData();
    if (!fs.existsSync(filePath)) {
      console.log("\n\nFile Controller : Local file does not exist");
      await writeLocalData({
        ip_address: "",
      });
      return false;
    }
    return new Promise((resolve, reject) =>
      fs.readFile(filePath, async (err, fileData) => {
        if (err) {
          reject(err);
        } else {
          try {
            const localJsonData = JSON.parse(fileData);
            console.log("localJsonData", localJsonData);
            resolve(localJsonData);
          } catch (e) {
            console.log("Error in readLocalData", e);
          }
        }
      })
    );
  } catch (e) {
    console.log("Error in readLocalData", e);
  }
};

module.exports = { readLocalData };
