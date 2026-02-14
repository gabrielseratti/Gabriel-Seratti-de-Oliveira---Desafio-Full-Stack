import { useState } from 'react';
import { notesApi } from '../services/api';

interface CreateNoteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateNoteModal = ({ onClose, onSuccess }: CreateNoteModalProps) => {
  const [formData, setFormData] = useState({
    site: '',
    equipment: '',
    variable: '',
    timestamp: '',
    author: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await notesApi.createNote(formData);
      alert('Nota criada com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      alert('Erro ao criar nota. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Nova Nota</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label>🏢 Site *</label>
            <input
              type="text"
              name="site"
              value={formData.site}
              onChange={handleChange}
              placeholder="Ex: Barros, Reis e Moraes"
              required
            />
          </div>

          <div className="form-group">
            <label>⚙️ Equipamento *</label>
            <select
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Gerador">Gerador</option>
              <option value="Transformador">Transformador</option>
              <option value="Multimedidor">Multimedidor</option>
            </select>
          </div>

          <div className="form-group">
            <label>📊 Variável *</label>
            <select
              name="variable"
              value={formData.variable}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Tensão">Tensão</option>
              <option value="Corrente">Corrente</option>
            </select>
          </div>

          <div className="form-group">
            <label>📅 Data e Hora *</label>
            <input
              type="datetime-local"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>👤 Autor *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              required
            />
          </div>

          <div className="form-group">
            <label>💬 Mensagem *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Descreva a observação..."
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : '✅ Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;