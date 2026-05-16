"use client";

import { useState, useEffect } from "react";
import { BookText, Sprout, User, LogOut, House } from "lucide-react";

export function Menu() {

  const [activeSection, setActiveSection] = useState("home");
  const [userData, setUserData] = useState({ nome: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="menu-container">
      <div className="logo-menu">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <div className="secoes-container">
        <div className="secao">
          <button
            className={`btn-icon-menu ${activeSection === "home" ? "selected" : ""}`}
            onClick={() => setActiveSection("home")}
          >
            <House size="20px" />
            <p>Home</p>
          </button>
        </div>
        <div className="secao">
          <button
            className={`btn-icon-menu ${activeSection === "safras" ? "selected" : ""}`}
            onClick={() => setActiveSection("safras")}
          >
            <Sprout size="20px" />
            <p>Safras</p>
          </button>
        </div>
        <div className="secao">
          <button
            className={`btn-icon-menu ${activeSection === "vendas" ? "selected" : ""}`}
            onClick={() => setActiveSection("vendas")}
          >
            <BookText size="20px"/>
            <p>Vendas</p>
          </button>
        </div>
        <div className="secao">
          <button
           className={`btn-icon-menu ${activeSection === "propriedade" ? "selected" : ""}`}
           onClick={() => setActiveSection("propriedade")}
           >
            <User size="20px"/>
            <p>Propriedade</p>
          </button>
        </div>
      </div>
      <div className="footer">
        <div className="conta">
            <h4>{userData.nome || "Usuário"}</h4>
            <p>{userData.email || "Carregando..."}</p>
        </div>
        <div className="sair">
            <button onClick={handleLogout}>
                <LogOut size="15px"/>
                <p>Sair</p>
            </button>
        </div>
      </div>
    </div>
  );
}
