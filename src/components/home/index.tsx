"use client";
import { Sprout, Building2, Van, ShieldCheck } from "lucide-react";
export function Home() {
  return (
    <>
      <div className="header">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
        <div className="container-button">
          <button
            className="button-white"
            onClick={() => (window.location.href = "/login")}
          >
            Entrar
          </button>
          <button
            className="button-orange"
            onClick={() => (window.location.href = "/cadastro")}
          >
            Cadastre-se
          </button>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="itens-esquerda">
            <button className="button-title">
              <Building2 size={15} />
              <p>Industrial-Tech para o campo</p>
            </button>
            <div className="text-conteiner">
              <h1 className="black">
                Do campo á sua mesa,{" "}
                <span className="h1-green">sem intermediários.</span>{" "}
              </h1>
              <p className="text">
                AgroBy conecta agricultores familiares diretamente a consumidores
                conscientes. Plataforma robusta, segura e moderna para gerenciar
                safras, vendas e entregas.
              </p>
            </div>
            <div className="button-container">
              <button
                className="button-orange"
                onClick={() => (window.location.href = "/cadastro")}
              >
                Começar agora
              </button>
              <button
                className="button-green"
                onClick={() => (window.location.href = "/login")}
              >
                Já sou cadastrado
              </button>
            </div>
          </div>
          <img className="image-home" src="imagem-home.png" alt="Imagem da Home" />
        </div>
        <div className="container-cards">
          <div className="card">
            <Sprout color="#2da92a" size="30px" className="icon-bg" />
            <h3>Gestão de Safras</h3>
            <p>
              Produtores controlam quantidade, previsão e status de cada
              plantação.
            </p>
          </div>
          <div className="card">
            <Van size="30px" className="icon-bg" />
            <h3>Marketplace Direto</h3>
            <p>
              Clientes reservam produtos frescos e acompanham a entrega em tempo
              real.
            </p>
          </div>
          <div className="card">
            <ShieldCheck size="30px" className="icon-bg" />
            <h3>Segurança Industrial</h3>
            <p>
              Senhas com hashing bcrypt+salt, sessões protegidas e dados
              criptografados.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
