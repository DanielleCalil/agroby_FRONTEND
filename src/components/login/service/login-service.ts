import { LoginFormData } from "../resolver";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const loginService = async (data: LoginFormData) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Usuário ou senha inválidos");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Usuário ou senha inválidos. Tente novamente mais tarde.");
  }
};
