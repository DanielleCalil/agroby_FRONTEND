import {
  ApiError,
  PasswordRecoveryRequest,
  PasswordRecoveryResponse,
  PasswordResetRequest,
} from "../types/api";
import { HttpError } from "./http-error";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export const forgotPasswordService = async (
  data: PasswordRecoveryRequest,
): Promise<PasswordRecoveryResponse> => {
  const response = await fetch(`${API_URL}/api/esqueci-senha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = (await response.json().catch(() => null)) as
    | PasswordRecoveryResponse
    | ApiError
    | null;

  if (!response.ok) {
    throw new HttpError(
      response.status,
      (body as ApiError | null)?.error ??
        "Erro ao enviar instruções de recuperação de senha",
    );
  }

  return (body ?? {}) as PasswordRecoveryResponse;
};

export const resetPasswordService = async (
  data: PasswordResetRequest,
): Promise<void> => {
  const response = await fetch(`${API_URL}/api/resetar-senha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiError | null;

    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 404
    ) {
      throw new HttpError(
        response.status,
        body?.error ?? "Token inválido ou expirado",
      );
    }

    throw new HttpError(
      response.status,
      body?.error ?? "Erro ao redefinir senha",
    );
  }
};
