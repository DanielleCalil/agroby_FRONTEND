"use client";

import { useLogin } from "./hook/login-hook";

export function Login() {
  const { register, handleSubmit, errors, handleLogin, loading, apiError } = useLogin();

  return (
    <div className="login-wrapper">
      <div className="logo">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <form className="container-login" onSubmit={handleSubmit(handleLogin)}>
        <div className="title">
          <h3>Login</h3>
          <p>Digite seu e-mail e senha para logar no AgroBy.</p>
        </div>
        
        {apiError && <p className="error-message">{apiError}</p>}

        <div className="inputs">
          <div className="input">
            <label>E-mail</label>
            <input {...register("email")} type="email" placeholder="Digite seu email" />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>
          <div className="input">
            <label>Senha</label>
            <input {...register("password")} type="password" placeholder="Digite sua senha" />
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </div>
        </div>

        <button className="button-orange-login" type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
