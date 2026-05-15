"use client";

import { useRegister } from "./hook/cadastro-hook";

export function Cadastro() {

  const {
    register,
    handleSubmit,
    errors,
    handleRegister,
    loading,
    apiError,
    tipoConta,
    setValue,
  } = useRegister();

  return (
    <div className="login-wrapper">
      <div className="logo">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <form className="container-login" onSubmit={handleSubmit(handleRegister)}>
        <div className="title">
          <h3>Cadastro</h3>
          <p>Faça o cadastro para criar sua conta no AgroBy.</p>
        </div>

        {apiError && <p className="error-message-global">{apiError}</p>}

        <div className="inputs">
          <input type="hidden" {...register("tipo_conta")} />
          <div className="input">
            <label>Eu sou</label>
            <div className="tipo-conta">
              {/* Usamos o setValue para atualizar o valor do Zod manualmente nos botões customizados */}
              <button
                type="button"
                className={`btn-tipo-conta ${tipoConta === "cliente" ? "selected" : ""}`}
                onClick={() => setValue("tipo_conta", "cliente")}
              >
                <div className="bolinha"></div> Cliente
              </button>
              <button
                type="button"
                className={`btn-tipo-conta ${tipoConta === "produtor" ? "selected" : ""}`}
                onClick={() => setValue("tipo_conta", "produtor")}
              >
                <div className="bolinha"></div> Produtor
              </button>
            </div>
          </div>

          <div className="input">
            <label htmlFor="nome">Nome</label>
            <input {...register("nome")} type="text" placeholder="Nome completo" />
            {errors.nome && <span className="error-text">{errors.nome.message}</span>}
          </div>

          <div className="input">
            <label htmlFor="email">E-mail</label>
            <input {...register("email")} type="email" placeholder="Digite seu email" />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>

          <div className="input">
            <label htmlFor="password">Senha</label>
            <input {...register("password")} type="password" placeholder="Mínimo 8 caracteres, números e símbolos" />
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </div>

          <div className="input">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input {...register("confirmPassword")} type="password" placeholder="Repita a senha" />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
          </div>

          <div className="input">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input {...register("whatsapp")} type="tel" placeholder="(00) 00000-0000" />
            {errors.whatsapp && <span className="error-text">{errors.whatsapp.message}</span>}
          </div>
        </div>

        <button
          className="button-orange-login"
          type="submit"
          disabled={loading}
        >
          {loading ? "A processar..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
