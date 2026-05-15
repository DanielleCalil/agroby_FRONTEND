import { RegisterFormData } from "../resolver";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

type RegisterRequestData = Omit<RegisterFormData, "confirmPassword">;

export const registerService = async (data: RegisterRequestData) => {
  try {
    const response = await fetch(`${API_URL}/api/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao realizar cadastro");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Falha na conexão com o servidor");
  }
};
