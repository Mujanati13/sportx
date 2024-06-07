import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entry from "./pages/Entry";
import '../src/style/output.css'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import TryingApp from "./pages/DashBoradPrim";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Entry />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
