import { useState, useEffect } from 'react';
import { notesApi } from '../services/api';
import type { Note } from '../types/Note';

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
  onSuccess: () => void;
}

const EditNoteModal = ({ note, onClose, onSuccess }: EditNoteModalProps) => {
  const [formData, setFormData] = useState({
    site: note.site,
    equipment: note.equipment,
    variable: note.variable,
    timestamp: note.timestamp.substring(0, 16), // formato datetime-local
    author: note.author,
    message: note.message,
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
      await notesApi.updateNote(note.id, formData);
      alert('Nota atualizada com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      alert('Erro ao atualizar nota. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Editar Nota</h2>
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
              required
            />
          </div>

          <div className="form-group">
            <label>💬 Mensagem *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : '✅ Atualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;