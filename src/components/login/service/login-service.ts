import { LoginFormData } from "../resolver";
import { LoginResponse, ApiError } from "../../../types/api";
import { HttpError } from "../../../services/http-error";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export const loginService = async (
  data: LoginFormData,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = (await response.json()) as Partial<ApiError>;

  if (!response.ok) {
    if (response.status === 401) {
      throw new HttpError(
        401,
        "Credenciais inválidas. Verifique seu e-mail e senha.",
      );
    }

    if (response.status === 403) {
      throw new HttpError(
        403,
        "Sua conta está bloqueada. Redirecionando para recuperação de senha.",
      );
    }

    throw new HttpError(
      response.status,
      body.error ?? "Erro ao realizar login",
    );
  }

  const result = body as LoginResponse;
  localStorage.setItem("authToken", result.token);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result;
};
