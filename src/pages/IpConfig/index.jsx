import React from "react";
import { Alert } from "react-bootstrap";
import styles from "./index.module.css";

const IpConfig = () => {
  return (
    <div className={styles.congfigBody}>
      <section className={styles.configContainer}>
        <div className={styles.logoDiv}>
          {/* <img src={logo} className={styles.logo} /> */}
          <div>SOLO</div>
        </div>
        <div className={styles.configControlsContainer}>
          <div className={styles.mainDiv}>
            <div className={styles.alertDiv}>
              <Alert variant="warning" style={{ position: "unset" }}>
                Enter local IP address of the master billing station. You find
                that open Configuration page on Master Billing Station › Click
                on Captaion Connet › Copy the IP address displayed and enter in
                below input box and click Next.
              </Alert>
            </div>
            <div className="d-flex">
              <div>
                {/* <img
                  style={{
                    height: "250px",
                    width: "300px",
                    objectFit: "scale-down",
                  }}
                  src={configImage}
                  alt="configImage"
                /> */}
              </div>
              <div>
                <form className={styles.syncCodeControl}>
                  <div className={styles.inputContainer}>
                    <label>Ip Address</label>
                    <input
                      type="text"
                      className={styles.ipAddress}
                      name="IPAddress"
                      autoFocus
                      placeholder="Enter ip address"
                      //   onChange={handleChange}
                    />
                  </div>
                  <button>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IpConfig;
