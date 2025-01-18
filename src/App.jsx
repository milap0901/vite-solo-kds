import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainNav from "./components/MainNav";
import ProtectedRoute from "./components/ProtectedRoute";
import IpConfig from "./pages/IpConfig";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import MasterNotConnect from "./pages/MasterNotConnect";
import AllKotList from "./pages/AllKotList";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="master-not-connect" element={<MasterNotConnect />} />
      <Route path="ip-config" element={<IpConfig />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="kot-list" element={<AllKotList />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
