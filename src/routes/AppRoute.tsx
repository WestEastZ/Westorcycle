import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/page/Home";
import Login from "@/page/Login";
import SignUp from "@/page/SignUp";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
