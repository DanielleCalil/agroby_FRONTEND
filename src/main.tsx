import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home } from './components/home/index.tsx'
import { Dashboard } from './components/dashboard/index.tsx'
import { Login } from './components/login/index.tsx'
import { Cadastro } from './components/cadastro/index.tsx'
import { Safras } from './components/safras/index.tsx'
import { PrivateRoute } from './components/PrivateRoute.tsx'

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/safras" element={<PrivateRoute><Safras /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
