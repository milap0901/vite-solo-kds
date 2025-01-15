import axios from "axios";

export const checkMasterConnection = async (navigate) => {
  try {
    const { ip_address } = await window.apiKey.request("getBeforeloadData");

    if (ip_address === "localhost") {
      return ip_address;
    }

    try {
      await axios.get(`http://${ip_address}:3001/ping`, {
        timeout: 3000,
      });
      return ip_address;
    } catch (pingError) {
      const newMasterIpAddress = await window.apiKey.request("find-master");
      if (newMasterIpAddress) {
        return newMasterIpAddress;
      }

      navigate("/master-not-connect");
      throw new Error("MASTER_CONNECTION_FAILED");
    }
  } catch (error) {
    if (!error.message.includes("MASTER_CONNECTION_FAILED")) {
      navigate("/master-not-connect");
    }
    throw error;
  }
};
