import { LoginFormData } from "../resolver";

export const loginService = async (data: LoginFormData) => {
  try {
    const response = await fetch(" ", {
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