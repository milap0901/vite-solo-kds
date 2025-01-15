import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./index.module.css";
import { useState } from "react";
import ConfigSideBar from "../ConfigSideBar";

function MainNav() {
  const [showConfigSideBar, setShowConfigSideBar] = useState(false);

  return (
    <>
      <Navbar expand="lg" className={`${styles.mainNav} py-1`}>
        <Container fluid className="d-flex flex-nowrap">
          <div className="d-flex justify-content-start flex-nowrap align-items-center">
            {/* <FontAwesomeIcon
              className={styles.bars}
              icon={faBars}
              onClick={() => setShowConfigSideBar(true)}
            /> */}
            <Navbar.Brand
              className="fw-bolder fs-4 ps-1"
              style={{ color: "#f04345" }}
            >
              SOLO KDS
            </Navbar.Brand>
          </div>
        </Container>
      </Navbar>

      <ConfigSideBar
        // handleLogout={() => setLogOutModal(true)}
        showConfigSideBar={showConfigSideBar}
        setShowConfigSideBar={setShowConfigSideBar}
      />
    </>
  );
}

export default MainNav;
