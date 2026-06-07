# AgroBy Frontend

Frontend web da plataforma AgroBy, construído com React + Vite + TypeScript.

## Sobre o projeto

Este repositório contem a interface da aplicação AgroBy, com foco em:

- autenticação de usuários
- cadastro de novas contas
- recuperação e redefinição de senha
- dashboard com resumo de dados
- aréa protegida para rotas autenticadas

## Stack

- React 19
- TypeScript
- Vite 5
- React Router DOM 6
- React Hook Form
- Zod
- Lucide React

## Requisitos

- Node.js 18+
- npm 9+

## Como rodar o projeto

1. Instale as dependências:

	 ```bash
	 npm install
	 ```

2. Configure variáveis de ambiente criando um arquivo .env na raiz:

	 ```env
	 VITE_API_URL=http://localhost:8080
	 ```

	 Observação:
	 - Se não for definido, o frontend usa http://localhost:8080 por padrão.

3. Inicie o ambiente de desenvolvimento:

	 ```bash
	 npm run dev
	 ```

4. Gere build de produção:

	 ```bash
	 npm run build
	 ```

5. Visualize a build localmente:

	 ```bash
	 npm run preview
	 ```

## Scripts disponíveis

- npm run dev: inicia servidor Vite
- npm run build: compila TypeScript e gera build
- npm run preview: sobe servidor local da build

## Rotas da aplicação

### Públicas

- /home
- /login
- /cadastro
- /esqueci-senha
- /redefinir-senha

### Protegidas (exigem token válido)

- /dashboard
- /safras

### Fallback

- qualquer rota não mapeada redireciona para página de não encontrado

## Autenticação

Fluxo atual:

1. Login envia credenciais para a API.
2. Em sucesso, token e dados do usuário são salvos no localStorage.
3. Rotas protegidas validam o token por meio do endpoint de sessão.
4. Em token inválido/expirado, o usuário e enviado para login.

Chaves de armazenamento utilizadas:

- authToken
- user

## Endpoints consumidos

- POST /api/login
- POST /api/cadastro
- GET /api/me
- GET /api/dashboard/resumo
- POST /api/esqueci-senha
- POST /api/resetar-senha

## Estrutura principal

```text
src/
	components/
		cadastro/
		dashboard/
		login/
		safras/
		home/
		menu/
		esqueci-senha/
		redefinir-senha/
		not-found/
		PrivateRoute.tsx
	services/
		dashboard-service.ts
		me-service.ts
		password-recovery-service.ts
		http-error.ts
	types/
		api.ts
	styles/
		global.css
	main.tsx
```

## Observações importantes

- O frontend espera um backend compatível com os contratos definidos em src/types/api.ts.
- Algumas acões rápidas da dashboard apontam para rotas ainda não implementadas nesta versão (ex.: /vitrine, /pedidos, /perfil, /vendas, /propriedade).

## Licença

Este projeto esta sob a licença definida no arquivo LICENSE.

