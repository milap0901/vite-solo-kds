import React, { memo } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./index.module.css";

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
        {/* <div>SOLO KDS</div> */}
        <div>
          {/* <FontAwesomeIcon
            role="button"
            style={{ height: "30px", color: "rgb(230, 230, 230)" }}
            icon={faXmark}
            onClick={handleClose}
          /> */}
        </div>
      </Offcanvas.Header>
    </Offcanvas>
  );
}

export default memo(ConfigSideBar);
