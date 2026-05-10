"use client";
import { useState } from "react";

export function Cadastro() {
  const [tipoConta, setTipoConta] = useState("cliente");

  return (
    <div className="login-wrapper">
      <div className="logo">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <div className="container-login">
        <div className="title">
          <h3>Cadastro</h3>
          <p>Faça o cadastro para criar sua conta no AgroBy.</p>
        </div>
        <div className="inputs">
          <div className="input">
            <label>Eu sou</label>
            <div className="tipo-conta">
              <button
                className={`btn-tipo-conta ${tipoConta === "cliente" ? "selected" : ""}`}
                onClick={() => setTipoConta("cliente")}
              >
                <div className="bolinha"></div> Cliente
              </button>
              <button
                className={`btn-tipo-conta ${tipoConta === "produtor" ? "selected" : ""}`}
                onClick={() => setTipoConta("produtor")}
              >
                <div className="bolinha"></div> Produtor
              </button>
            </div>
          </div>
          <div className="input">
            <label htmlFor="nome">Nome</label>
            <input type="text" placeholder="Digite seu nome completo" />
          </div>
          <div className="input">
            <label htmlFor="email">E-mail</label>
            <input type="text" placeholder="Digite seu email" />
          </div>
          <div className="input">
            <label htmlFor="senha">Senha</label>
            <input type="text" placeholder="Digite sua senha" />
          </div>
          <div className="input">
            <label htmlFor="telefone">WhatsApp</label>
            <input type="tel" placeholder="(00) 00000-0000" />
          </div>
        </div>
        <button
          className="button-orange-login"
          onClick={() => (window.location.href = "/login")}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
