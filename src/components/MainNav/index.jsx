import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./index.module.css";
import { useState } from "react";
import ConfigSideBar from "../ConfigSideBar";
import bar from "../../assets/icons/bar.svg";
import { useNavigate } from "react-router-dom";

function MainNav() {
  const [showConfigSideBar, setShowConfigSideBar] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    console.log("ffhgdayhfgdashyfjkdabnfjkdsgbfhdsgfjfdsgfyhdsguihk");
    navigate("/kot-list"); // Relative path
  };

  return (
    <>
      <Navbar expand="lg" className={`${styles.mainNav} py-1`}>
        <Container fluid className="d-flex flex-nowrap">
          <div className="d-flex justify-content-start flex-nowrap align-items-center">
            {/* <img
              src={bar}
              className={styles.bars}
              onClick={() => setShowConfigSideBar(true)}
              alt=""
            /> */}
            <Navbar.Brand
              className="fw-bolder fs-4 ps-1"
              style={{ color: "#f04345" }}
              onClick={() => navigate("/")}
            >
              SOLO KDS
            </Navbar.Brand>
            <button onClick={() => navigate("/kot-list")}>Kot List</button>
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
