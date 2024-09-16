import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage";
import PrintPage from "./Pages/PrintPage/PrintPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/print" element={<PrintPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
