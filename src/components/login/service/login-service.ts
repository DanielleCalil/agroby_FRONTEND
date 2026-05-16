import { LoginFormData } from "../resolver";
import { LoginResponse, ApiError } from "../../../types/api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export const loginService = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    const err = body as ApiError;
    throw new Error(err.error ?? "Erro ao realizar login");
  }

  const result = body as LoginResponse;
  localStorage.setItem("authToken", result.token);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result;
};
