import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainNav from "./components/MainNav";
import ProtectedRoute from "./components/ProtectedRoute";
import IpConfig from "./pages/IpConfig";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="ip-config" element={<IpConfig />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainNav />
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  </HashRouter>
);

export default App;
