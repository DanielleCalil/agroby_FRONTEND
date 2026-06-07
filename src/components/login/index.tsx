"use client";

import { useEffect, useState } from "react";
import { useLogin } from "./hook/login-hook";

export function Login() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { register, handleSubmit, errors, handleLogin, loading, apiError } =
    useLogin();

  useEffect(() => {
    const pendingToast = sessionStorage.getItem("authToast");

    if (pendingToast) {
      setToastMessage(pendingToast);
      sessionStorage.removeItem("authToast");
    }
  }, []);

  const handleLogoClick = () => {
    window.location.href = "/home";
  };

  return (
    <div className="login-wrapper">
      <div className="logo" onClick={handleLogoClick}>
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <form className="container-login" onSubmit={handleSubmit(handleLogin)}>
        <div className="title-login">
          <h3>Login</h3>
          <p>Digite seu e-mail e senha para logar no AgroBy.</p>
        </div>

        {toastMessage && <p className="toast-message">{toastMessage}</p>}

        {apiError && <p className="error-message">{apiError}</p>}

        <div className="inputs">
          <div className="input">
            <label>E-mail</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Digite seu e-mail"
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>
          <div className="input">
            <label>Senha</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>
        </div>

        <button
          className="button-orange-login"
          type="submit"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>

        <button
          className="button-link"
          type="button"
          onClick={() => (window.location.href = "/esqueci-senha")}
        >
          Esqueci minha senha
        </button>
      </form>
    </div>
  );
}
