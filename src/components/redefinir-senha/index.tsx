"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HttpError } from "../../services/http-error";
import { resetPasswordService } from "../../services/password-recovery-service";

const passwordIsValid = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password)
  );
};

export function RedefinirSenha() {
  const [searchParams] = useSearchParams();
  const initialToken = useMemo(
    () => searchParams.get("token") ?? "",
    [searchParams],
  );

  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!token.trim()) {
      setErrorMessage("Informe o token de redefinição.");
      return;
    }

    if (!passwordIsValid(newPassword)) {
      setErrorMessage(
        "A nova senha deve ter ao menos 8 caracteres, com maiúscula, minúscula, número e caractere especial.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await resetPasswordService({
        token: token.trim(),
        new_password: newPassword,
      });

      sessionStorage.setItem(
        "authToast",
        "Senha redefinida com sucesso. Faça login para continuar.",
      );
      window.location.href = "/login";
    } catch (error) {
      if (
        error instanceof HttpError &&
        (error.status === 400 || error.status === 401 || error.status === 404)
      ) {
        setErrorMessage("Token inválido ou expirado.");
      } else {
        setErrorMessage("Erro de rede. Tente novamente em alguns instantes.");
      }
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
          <h3>Redefinir senha</h3>
          <p>Informe o token recebido e cadastre uma nova senha.</p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="inputs">
          <div className="input">
            <label>Token</label>
            <input
              type="text"
              placeholder="Cole o token de redefinição aqui"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
          </div>
          <div className="input">
            <label>Nova senha</label>
            <input
              type="password"
              placeholder="Digite a nova senha"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="input">
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Repita a nova senha"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </div>

        <button
          className="button-orange-login"
          type="submit"
          disabled={loading}
        >
          {loading ? "Redefinindo..." : "Redefinir senha"}
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
