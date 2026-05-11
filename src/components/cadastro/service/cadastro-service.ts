import { RegisterFormData } from "../resolver";

export const registerService = async (data: RegisterFormData) => {
  try {
    const response = await fetch(" ", {
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