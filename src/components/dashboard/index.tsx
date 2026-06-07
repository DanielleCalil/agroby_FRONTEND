"use client";

import { Menu } from "../menu/index";
import { useState, useEffect } from "react";
import { dashboardService } from "../../services/dashboard-service";
import { DashboardMetrics } from "../../types/api";
import { HttpError } from "../../services/http-error";
import {
  ClipboardList,
  MapPin,
  Phone,
  ShoppingBasket,
  Sprout,
  Store,
  TrendingUp,
} from "lucide-react";

const EMPTY_METRICS: DashboardMetrics = {
  safrasAtivas: 0,
  produtosCadastrados: 0,
  vendasRecebidas: 0,
  meusPedidos: 0,
  produtosDisponiveis: 0,
};

export function Dashboard() {
  const [userData, setUserData] = useState({ nome: "", tipo_conta: "" });
  const [userItens, setUserItens] = useState<DashboardMetrics>(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as {
        nome?: string;
        tipo_conta?: string;
      };

      setUserData({
        nome: parsedUser.nome ?? "",
        tipo_conta: parsedUser.tipo_conta ?? "",
      });
    }

    dashboardService()
      .then((response) => {
        if (response.user?.nome || response.user?.tipo_conta) {
          setUserData({
            nome: response.user.nome ?? "",
            tipo_conta: response.user.tipo_conta ?? "",
          });
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        setUserItens(response.metrics);
      })
      .catch((error) => {
        if (error instanceof HttpError && error.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          sessionStorage.setItem(
            "authToast",
            "Sessão expirada. Faça login novamente.",
          );
          window.location.href = "/login";
          return;
        }

        if (error instanceof HttpError) {
          setToastMessage(error.message);
        } else {
          setToastMessage("Erro de rede ao carregar a dashboard.");
        }

        setUserItens(EMPTY_METRICS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isCliente = userData.tipo_conta === "C";

  const firstName = userData.nome.trim().split(/\s+/)[0] || "Usuario";

  const headerTitle = `Bem-vindo(a), ${firstName}!`;

  const headerDescription = isCliente
    ? "Explore produtos frescos direto dos produtores e acompanhe seus pedidos em um só lugar."
    : "Aqui está o resumo da sua propriedade. Gerencie suas safras, produtos e acompanhe suas vendas.";

  const summaryCards = isCliente
    ? [
        {
          icon: ShoppingBasket,
          value: userItens.meusPedidos,
          label: "Meus pedidos",
        },
        {
          icon: Store,
          value: userItens.produtosDisponiveis,
          label: "Produtos disponíveis",
        },
      ]
    : [
        {
          icon: Sprout,
          value: userItens.safrasAtivas,
          label: "Safras ativas",
        },
        {
          icon: TrendingUp,
          value: userItens.produtosCadastrados,
          label: "Produtos cadastrados",
        },
        {
          icon: ClipboardList,
          value: userItens.vendasRecebidas,
          label: "Vendas recebidas",
        },
      ];

  const quickActions = isCliente
    ? [
        {
          icon: Store,
          title: "Explorar vitrine",
          description: "Descubra produtos frescos perto de você.",
          path: "/vitrine",
        },
        {
          icon: ShoppingBasket,
          title: "Meus pedidos",
          description: "Acompanhe o status das suas reservas.",
          path: "/pedidos",
        },
        {
          icon: Phone,
          title: "Meu perfil",
          description: "Atualize seus dados de contato.",
          path: "/perfil",
        },
      ]
    : [
        {
          icon: Sprout,
          title: "Gerenciar safras",
          description: "Cadastre e acompanhe suas plantações.",
          path: "/safras",
        },
        {
          icon: ClipboardList,
          title: "Ver vendas",
          description: "Confira os pedidos dos clientes.",
          path: "/vendas",
        },
        {
          icon: MapPin,
          title: "Minha propriedade",
          description: "Atualize seus dados e contato.",
          path: "/propriedade",
        },
      ];

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content">
        {toastMessage && (
          <p className="toast-message toast-inline">{toastMessage}</p>
        )}
        <div className="card-header">
          <img
            src="logo-AgroBy.png"
            alt="Logo AgroBy"
            className="logo-agroby-dashboard"
          />
          <div className="titulo">
            <h2>{headerTitle}</h2>
            <p>{headerDescription}</p>
          </div>
        </div>
        {loading ? (
          <div className="dashboard-state-card">
            <h3>Carregando resumo...</h3>
            <p>
              Aguarde enquanto buscamos os dados mais recentes da sua conta.
            </p>
          </div>
        ) : (
          <div className="container-cards">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div className="card-content" key={card.label}>
                  <Icon size="30px" className="icon-card" />
                  <div className="card-text">
                    <h3>{card.value}</h3>
                    <p>{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="title">
          <h3>Ações Rápidas</h3>
        </div>
        <div className="acoes-rapidas">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <div
                className="card-acao-rapida"
                key={action.title}
                onClick={() => (window.location.href = action.path)}
              >
                <Icon size="25px" className="icon-acao-rapida" />
                <div className="descricao">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
