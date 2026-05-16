import { RegisterFormData } from "../resolver";
import { ApiError } from "../../../types/api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

type RegisterRequestData = Omit<RegisterFormData, "confirmPassword">;

export const registerService = async (data: RegisterRequestData): Promise<void> => {
  const response = await fetch(`${API_URL}/api/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json() as ApiError;
    throw new Error(body.error ?? "Erro ao realizar cadastro");
  }
};
