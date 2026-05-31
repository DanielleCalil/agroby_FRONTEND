"use client";

import { Menu } from "../menu/index";
import { useState, useEffect } from "react";
import { BookText, MapPin, Sprout, TrendingUp } from "lucide-react";

export function Dashboard() {
  const [userData, setUserData] = useState({ nome: "" });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const [userItens] = useState({
    safrasAtivas: 0,
    produtosCadastrados: 0,
    vendasRealizadas: 0,
  });

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content">
        <div className="card-header">
          <img
            src="logo-AgroBy.png"
            alt="Logo AgroBy"
            className="logo-agroby"
          />
          <div className="titulo">
            <h2>Bem-vindo de volta, {userData.nome || "Usuário"}!</h2>
            <p>
              Aqui está o resumo da sua propriedade. Gerencie suas safras,
              produtos e acompanhe suas vendas
            </p>
          </div>
        </div>
        <div className="container-cards">
          <div className="card-content">
            <Sprout size="30px" className="icon-card" />
            <div className="card-text">
              <h3>{userItens.safrasAtivas}</h3>
              <p>Safras Ativas</p>
            </div>
          </div>
          <div className="card-content">
            <TrendingUp size="30px" className="icon-card" />
            <div className="card-text">
              <h3>{userItens.produtosCadastrados}</h3>
              <p>Produtos Cadastrados</p>
            </div>
          </div>
          <div className="card-content">
            <BookText size="30px" className="icon-card" />
            <div className="card-text">
              <h3>{userItens.vendasRealizadas}</h3>
              <p>Vendas Realizadas</p>
            </div>
          </div>
        </div>
        <div className="title">
          <h3>Ações Rápidas</h3>
        </div>
        <div className="acoes-rapidas">
          <div
            className="card-acao-rapida"
            onClick={() => (window.location.href = "/safras")}
          >
            <Sprout size="25px" className="icon-acao-rapida" />
            <div className="descricao">
              <h3>Gerenciar safras</h3>
              <p>Cadastre e acompanhe suas plantações.</p>
            </div>
          </div>
          <div
            className="card-acao-rapida"
            onClick={() => (window.location.href = "/vendas")}
          >
            <TrendingUp size="25px" className="icon-acao-rapida" />
            <div className="descricao">
              <h3>Ver vendas</h3>
              <p>Confira os pedidos dos clientes.</p>
            </div>
          </div>
          <div
            className="card-acao-rapida"
            onClick={() => (window.location.href = "/propriedade")}
          >
            <MapPin size="25px" className="icon-acao-rapida" />
            <div className="descricao">
              <h3>Minha propriedade</h3>
              <p>Atualize seus dados e contato.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
