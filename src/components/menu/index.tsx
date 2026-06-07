"use client";

import { useState, useEffect } from "react";
import {
  BookText,
  House,
  LogOut,
  ShoppingBasket,
  Sprout,
  Store,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    tipo_conta: "",
  });
  const isCliente = userData.tipo_conta === "C";

  const menuItems = isCliente
    ? [
        { 
          id: "home", 
          label: "Início", 
          path: "/dashboard", 
          icon: House 
        },
        { 
          id: "vitrine", 
          label: "Vitrine", 
          path: "/vitrine", 
          icon: Store 
        },
        {
          id: "pedidos",
          label: "Pedidos",
          path: "/pedidos",
          icon: ShoppingBasket,
        },
        { 
          id: "perfil", 
          label: "Perfil", 
          path: "/perfil", 
          icon: User 
        },
      ]
    : [
        { 
          id: "home", 
          label: "Início", 
          path: "/dashboard", 
          icon: House 
        },
        { 
          id: "safras", 
          label: "Safras", 
          path: "/safras", 
          icon: Sprout 
        },
        { 
          id: "vendas", 
          label: "Vendas", 
          path: "/vendas", 
          icon: BookText 
        },
        {
          id: "propriedade",
          label: "Propriedade",
          path: "/propriedade",
          icon: User,
        },
      ];

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("dashboard")) setActiveSection("home");
    else if (path.includes("safras")) setActiveSection("safras");
    else if (path.includes("vendas")) setActiveSection("vendas");
    else if (path.includes("propriedade")) setActiveSection("propriedade");
  }, [location.pathname]);

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

  const userTypeLabel =
    userData.tipo_conta === "P"
      ? "PRODUTOR"
      : userData.tipo_conta === "C"
        ? "CLIENTE"
        : "";

  return (
    <div className="menu-container">
      <div className="logo-menu">
        <img src="logo-AgroBy.png" alt="" />
        <div className="logo-menu-text">
          <h3>AgroBy</h3>
          {userTypeLabel ? <p>{userTypeLabel}</p> : null}
        </div>
      </div>
      <div className="secoes-container">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="secao" key={item.id}>
              <button
                className={`btn-icon-menu ${activeSection === item.id ? "selected" : ""}`}
                onClick={() => navigate(item.path)}
              >
                <Icon size="17px" />
                <p>{item.label}</p>
              </button>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <div className="conta">
          <h4>{userData.nome || "Usuário"}</h4>
          <p>{userData.email || "Carregando..."}</p>
        </div>
        <div className="sair">
          <button onClick={handleLogout}>
            <LogOut size="16px" />
            <p>Sair</p>
          </button>
        </div>
      </div>
    </div>
  );
}
