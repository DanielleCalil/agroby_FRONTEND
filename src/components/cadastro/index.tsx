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
    handleTipoContaChange,
  } = useRegister();

  return (
    <div className="login-wrapper">
      <div className="logo">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
      </div>
      <form
        className="container-login cadastro-container"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="title">
          <h3>Cadastro</h3>
          <p>Faça o cadastro para criar sua conta no AgroBy.</p>
        </div>

        {apiError && <p className="error-message-global">{apiError}</p>}

        <div className="inputs cadastro-inputs">
          <input type="hidden" {...register("tipo_conta")} value={tipoConta} />
          <div className="input">
            <div className="tipo-conta">
              <label className="label-tipo-conta">Eu sou</label>
              <button
                type="button"
                className={`btn-tipo-conta ${tipoConta === "cliente" ? "selected" : ""}`}
                onClick={() => handleTipoContaChange("cliente")}
              >
                <div className="bolinha"></div> Cliente
              </button>
              <button
                type="button"
                className={`btn-tipo-conta ${tipoConta === "produtor" ? "selected" : ""}`}
                onClick={() => handleTipoContaChange("produtor")}
              >
                <div className="bolinha"></div> Produtor
              </button>
            </div>
          </div>

          <div className="input">
            <label htmlFor="nome">Nome Completo</label>
            <input
              {...register("nome", {
                setValueAs: (value) =>
                  typeof value === "string" ? value.toUpperCase() : value,
              })}
              type="text"
              placeholder="Nome completo"
            />
            {errors.nome && (
              <span className="error-text">{errors.nome.message}</span>
            )}
          </div>

          {tipoConta === "produtor" && (
            <>
              <div className="input">
                <label htmlFor="nome_propriedade">Nome da propriedade</label>
                <input
                  {...register("nome_propriedade", {
                    setValueAs: (value) =>
                      typeof value === "string"
                        ? value.toUpperCase()
                        : value,
                  })}
                  type="text"
                  placeholder="Nome da propriedade"
                />
                {errors.nome_propriedade && (
                  <span className="error-text">
                    {errors.nome_propriedade.message}
                  </span>
                )}
              </div>

              <div className="input">
                <label htmlFor="endereco_rural">Endereço rural</label>
                <input
                  {...register("endereco_rural")}
                  type="text"
                  placeholder="Endereço rural"
                />
                {errors.endereco_rural && (
                  <span className="error-text">
                    {errors.endereco_rural.message}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="input-row">
            <div className="input">
              <label htmlFor="email">E-mail</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Digite seu email"
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            <div className="input">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                {...register("whatsapp")}
                type="tel"
                placeholder="(00) 00000-0000"
              />
              {errors.whatsapp && (
                <span className="error-text">{errors.whatsapp.message}</span>
              )}
            </div>
          </div>

          <div className="input-row">
            <div className="input">
              <label htmlFor="password">Senha</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Mínimo 8 caracteres, números e símbolos"
              />
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </div>

            <div className="input">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Repita a senha"
              />
              {errors.confirmPassword && (
                <span className="error-text">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          className="button-orange-login cadastro-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "A processar..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
