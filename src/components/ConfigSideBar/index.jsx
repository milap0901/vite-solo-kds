import React, { memo } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./index.module.css";
import xmark from "../../assets/icons/xmark.svg";

function ConfigSideBar({
  showConfigSideBar,
  setShowConfigSideBar,
  handleLogout,
}) {
  const handleClose = () => {
    setShowConfigSideBar(false);
  };

  return (
    <Offcanvas
      className={styles.ConfigSideBarMain}
      show={showConfigSideBar}
      onHide={handleClose}
      placement="start"
    >
      <Offcanvas.Header className={styles.ConfigSideBarHeader}>
        <div>SOLO KDS</div>
        <div>
          <img
            src={xmark}
            style={{ height: "30px", color: "rgb(230, 230, 230)" }}
            onClick={handleClose}
            alt=""
          />
        </div>
      </Offcanvas.Header>
    </Offcanvas>
  );
}

export default memo(ConfigSideBar);
