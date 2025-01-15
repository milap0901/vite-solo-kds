import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [localData, setLocalData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(localData);
  console.log(loading);

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const data = await window.apiKey.request("getLocalJsonData");
        setLocalData(data);
      } catch (error) {
        console.error("Error loading local data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLocalData();
  }, []);

  if (loading) {
    // Show a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }

  if (!localData || localData.ip_address === "") {
    // Redirect if no data or IP address is empty
    return <Navigate to="/ip-config" />;
  }

  // Render the children if localData is valid
  return children;
};

export default ProtectedRoute;
