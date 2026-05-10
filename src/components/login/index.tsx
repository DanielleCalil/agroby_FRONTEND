'use client'

export function Login() {
    return (
       <div className="login-wrapper">
       <div className="logo">
        <img src="logo-AgroBy.png" alt="" />
        <h3>AgroBy</h3>
       </div>
       <div className="container-login">
        <div className="title">
        <h3>Login</h3>
        <p>Digite seu e-mail e senha para logar no AgroBy.</p>
        </div>
        <div className="inputs">
            <div className="input">
            <label htmlFor="email">E-mail</label>
            <input type="text" placeholder="Digite seu email"/>
            </div>
            <div className="input">
            <label htmlFor="senha">Senha</label>
            <input type="text" placeholder="Digite sua senha"/>
            </div>
        </div>
        <button
                className="button-orange-login"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Entrar
              </button>
       </div>
       </div>
    )
}