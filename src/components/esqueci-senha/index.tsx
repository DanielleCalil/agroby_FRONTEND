"use client";

import { FormEvent, useEffect, useState } from "react";
import { forgotPasswordService } from "../../services/password-recovery-service";
import { HttpError } from "../../services/http-error";

const NEUTRAL_SUCCESS_MESSAGE =
  "Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.";

export function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [integrationToken, setIntegrationToken] = useState<string | null>(null);

  useEffect(() => {
    const pendingToast = sessionStorage.getItem("authToast");

    if (pendingToast) {
      setSuccessMessage(pendingToast);
      sessionStorage.removeItem("authToast");
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Informe um e-mail válido.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIntegrationToken(null);

    try {
      const response = await forgotPasswordService({ email: email.trim() });
      setSuccessMessage(NEUTRAL_SUCCESS_MESSAGE);

      if (response.reset_token) {
        setIntegrationToken(response.reset_token);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        setSuccessMessage(NEUTRAL_SUCCESS_MESSAGE);
        return;
      }

      setErrorMessage("Erro de rede. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logo" onClick={() => (window.location.href = "/home")}>
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <form className="container-login" onSubmit={handleSubmit}>
        <div className="title-login">
          <h3>Esqueci minha senha</h3>
          <p>Informe seu e-mail para receber as instruções de recuperação.</p>
        </div>

        {successMessage && <p className="toast-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="inputs">
          <div className="input">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <button
          className="button-orange-login"
          type="submit"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {integrationToken && (
          <div className="integration-token-box">
            <p>Token de integração retornado pelo backend:</p>
            <strong>{integrationToken}</strong>
          </div>
        )}

        <button
          className="button-link"
          type="button"
          onClick={() => (window.location.href = "/redefinir-senha")}
        >
          Já possui token? Redefinir senha
        </button>

        <button
          className="button-link"
          type="button"
          onClick={() => (window.location.href = "/login")}
        >
          Voltar para login
        </button>
      </form>
    </div>
  );
}
