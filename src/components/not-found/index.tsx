"use client";

import { TriangleAlert, ArrowLeft, LayoutDashboard } from "lucide-react";

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-badge">
          <TriangleAlert size={18} />
          <span>Erro 404</span>
        </div>

        <h1>Página não encontrada</h1>
        <p>
          O endereço acessado não existe ou foi movido. Volte para uma rota
          válida para continuar usando a plataforma.
        </p>

        <div className="not-found-actions">
          <button
            className="button-orange"
            type="button"
            onClick={() => (window.location.href = "/dashboard")}
          >
            <LayoutDashboard size={16} />
            Ir para dashboard
          </button>
          <button
            className="button-green"
            type="button"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
