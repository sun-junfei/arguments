import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Workspace from "./components/Workspace";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* this needs to be changed later*/}
        <Route path="workspace" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
