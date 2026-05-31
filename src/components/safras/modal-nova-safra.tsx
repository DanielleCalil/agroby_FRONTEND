import { X } from "lucide-react";

interface ModalNovaSafraProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalNovaSafra({ isOpen, onClose }: ModalNovaSafraProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nova Safra</h2>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="name-safra">
            <label htmlFor="name">Nome da Safra</label>
            <input type="text" id="name" />
          </div>

          <div className="input-row">
            <div className="input">
              <label htmlFor="quantidade">Quantidade total</label>
              <input type="number" id="quantidade" />
            </div>
            <div className="input">
              <label htmlFor="unidade">Unidade(kg)</label>
              <input type="text" id="unidade" />
            </div>
          </div>
          <div className="input">
            <label htmlFor="data_colheita">Data prevista da colheita</label>
            <input type="date" id="data_colheita" />
          </div>
          <div className="input">
            <label htmlFor="status">Status</label>
            <select id="status">
              <option value="planejamento">Planejamento</option>
              <option value="em_crescimento">Em crescimento</option>
              <option value="colheita">Colheita</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </div>
          <button className="salvar-safra">Cadastrar Safra</button>
        </div>
      </div>
    </div>
  );
}
