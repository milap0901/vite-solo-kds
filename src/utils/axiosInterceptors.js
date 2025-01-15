import axios from "axios";
import { checkMasterConnection } from "./checkMasterConnection";

const axiosInterceptors = async (navigate) => {
  try {
    const ip_address = await checkMasterConnection(navigate);
    // console.log("ip_addressip_addressip_address", ip_address);

    const baseURL = `http://${ip_address}:3001/`;
    const instance = axios.create({
      baseURL,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.code === "ERR_NETWORK") {
          if (ip_address !== "localhost") {
            navigate("/master-not-connect"); // Navigate to the desired route
          }
        } else if (error.response && error.response.status === 401) {
          console.log("Call the refresh token API here");
        }

        if (!error.response || error.code === "ECONNABORTED") {
          try {
            const ip_address = await checkMasterConnection();
            if (instance && ip_address) {
              // Update baseURL with new IP
              instance.defaults.baseURL = `http://${ip_address}:5173/api/v1/`;
              // Retry the original request
              return instance(error.config);
            }
          } catch (reconnectError) {
            // CheckMasterConnection will handle navigation
            console.log("Error reconnecting:", reconnectError);
            return Promise.reject(reconnectError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  } catch (err) {
    console.log("Error during Axios interceptor setup:", err);
  }
};

export default axiosInterceptors;
