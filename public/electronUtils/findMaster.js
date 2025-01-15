const { Bonjour } = require("bonjour-service");
const { readLocalData } = require("./readLocalData");

const findMaster = async () => {
  const { serverName } = await readLocalData();
  return new Promise((resolve) => {
    const bonjour = new Bonjour();
    let found = false;

    bonjour.find({ type: "http" }, (service) => {
      console.log("\n\n\n SERVICE", service.name, serverName);
      if (service.name.toLowerCase() === serverName.toLowerCase()) {
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
};

module.exports = { findMaster };
