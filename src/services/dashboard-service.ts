import {
  ApiError,
  DashboardMetrics,
  DashboardResponse,
  User,
} from "../types/api";
import { HttpError } from "./http-error";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

const toNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeMetrics = (
  raw: Record<string, unknown> | undefined,
): DashboardMetrics => {
  return {
    safrasAtivas: toNumber(raw?.safrasAtivas ?? raw?.safras_ativas),
    produtosCadastrados: toNumber(
      raw?.produtosCadastrados ?? raw?.produtos_cadastrados,
    ),
    vendasRecebidas: toNumber(raw?.vendasRecebidas ?? raw?.vendas_recebidas),
    meusPedidos: toNumber(raw?.meusPedidos ?? raw?.meus_pedidos),
    produtosDisponiveis: toNumber(
      raw?.produtosDisponiveis ?? raw?.produtos_disponiveis,
    ),
  };
};

const normalizeUser = (raw: Record<string, unknown> | undefined): User => {
  return {
    id: toNumber(raw?.id),
    nome: String(raw?.nome ?? ""),
    email: String(raw?.email ?? ""),
    whatsapp: String(raw?.whatsapp ?? ""),
    tipo_conta: String(raw?.tipo_conta ?? raw?.tipoConta ?? ""),
    nome_propriedade: String(
      raw?.nome_propriedade ?? raw?.nomePropriedade ?? "",
    ),
    endereco_rural: String(raw?.endereco_rural ?? raw?.enderecoRural ?? ""),
  };
};

export const dashboardService = async (): Promise<DashboardResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/api/dashboard/resumo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiError | null;

    if (response.status === 401) {
      throw new HttpError(401, body?.error ?? "Sessão inválida ou expirada");
    }

    throw new HttpError(
      response.status,
      body?.error ?? "Não foi possível carregar os dados da dashboard",
    );
  }

  const body = (await response.json()) as Record<string, unknown>;

  const userRaw =
    (body.user as Record<string, unknown> | undefined) ??
    (body.usuario as Record<string, unknown> | undefined);
  const metricsRaw =
    (body.resumo as Record<string, unknown> | undefined) ??
    (body.metrics as Record<string, unknown> | undefined) ??
    body;

  return {
    user: normalizeUser(userRaw),
    metrics: normalizeMetrics(metricsRaw),
  };
};
