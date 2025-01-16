import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./index.module.css";
import NotConnect from "../../assets/icons/NotConnect.svg";

const MasterNotConnect = () => {
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {
      const res = await window.apiKey.request("find-master");
      console.log("res", res);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChnageIp = async () => {
    navigate("/ip-config");
    // const billerDetail = { name: null, password: null };
    // await window.apiKey.request("updateLoginUser", billerDetail);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className={Style.mainDiv}>
        <img src={NotConnect} width="150px" />
        <h2 className="fs20">Server Connection Failed</h2>
        <p className="fs16 dark_gray_text mb-4">
          Unable to connect to the server. Please check your network or server
          status.
        </p>
        <div className="d-flex justify-content-center align-items-center gap-3">
          {/* <button className={Style.saveBtn} onClick={handleRefresh}> */}
          <button className={Style.saveBtn} onClick={handleRefresh}>
            Retry
          </button>
          {/* <button className={Style.saveBtn} onClick={handleChnageIp}> */}
          <button className={Style.saveBtn} onClick={handleChnageIp}>
            Change IP Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterNotConnect;
