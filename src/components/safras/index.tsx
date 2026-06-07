"use client";

import { Menu } from "../menu/index";
import { useState } from "react";
import { ModalNovaSafra } from "./modal-nova-safra";

export function Safras() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [safrasList] = useState<any[]>([]);

  return (
    <div className="safras-container">
      <Menu />
      <div className="safras-content">
        <div className="header-safras">
          <div className="title-safras">
            <h2>Safras</h2>
            <p>Gerencie suas plantações e colheitas.</p>
          </div>
          <div className="adiconar-safra">
            <button
              className="button-safras"
              onClick={() => setIsModalOpen(true)}
            >
              Adicionar Safra
            </button>
          </div>
        </div>

        {/* Só renderiza essa div e os cards se houver alguma safra cadastrada */}
        {safrasList.length > 0 && (
          <div className="safras-list">
            {safrasList.map((safra, index) => (
              <div className="safra-card" key={index}>
                {/* Bloco de Cima: Ícone, Título e o Badge de Status */}
                <div className="safra-header">
                  <div className="safra-info-main">
                    {/* Ícone sutil da plantinha */}
                    <div className="safra-icon-wrapper">
                      <svg
                        className="safra-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <h3>{safra.nome}</h3>
                  </div>

                  {/* Badge de Status (Colheita) */}
                  <span className="safra-badge">{safra.status}</span>
                </div>

                {/* Bloco de Baixo: Linhas de Informações */}
                <div className="safra-body">
                  <div className="safra-row">
                    <span className="label">Quantidade</span>
                    <span className="value">
                      {safra.quantidade} {safra.unidade}
                    </span>
                  </div>
                  <div className="safra-row">
                    <span className="label">
                      <svg
                        className="calendar-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Previsão
                    </span>
                    <span className="value">{safra.data_colheita}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ModalNovaSafra
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
