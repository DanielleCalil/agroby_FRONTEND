import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./components/home/index.tsx";
import { Dashboard } from "./components/dashboard/index.tsx";
import { Login } from "./components/login/index.tsx";
import { Cadastro } from "./components/cadastro/index.tsx";
import { Safras } from "./components/safras/index.tsx";
import { EsqueciSenha } from "./components/esqueci-senha/index.tsx";
import { RedefinirSenha } from "./components/redefinir-senha/index.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";
import { NotFound } from "./components/not-found/index.tsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/safras"
          element={
            <PrivateRoute>
              <Safras />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
