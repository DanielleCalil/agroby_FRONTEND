import { MeResponse } from "../../types/api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export const meService = async (): Promise<MeResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/api/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Sessão inválida ou expirada");
  }

  return response.json() as Promise<MeResponse>;
};
