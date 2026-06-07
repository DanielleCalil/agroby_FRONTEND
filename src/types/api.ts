export interface User {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  tipo_conta: string;
  nome_propriedade: string;
  endereco_rural: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface DashboardMetrics {
  safrasAtivas: number;
  produtosCadastrados: number;
  vendasRecebidas: number;
  meusPedidos: number;
  produtosDisponiveis: number;
}

export interface DashboardResponse {
  user: User;
  metrics: DashboardMetrics;
}

export interface DashboardResumoResponse {
  resumo: DashboardMetrics;
  user?: User;
}

export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordResetRequest {
  token: string;
  new_password: string;
}

export interface PasswordRecoveryResponse {
  message?: string;
  reset_token?: string;
}

export interface ApiError {
  error: string;
}
