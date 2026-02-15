import { useState } from 'react';
import toast from 'react-hot-toast';
import { notesApi } from '../services/api';
import type { Note } from '../types/Note';

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
  onSuccess: () => void;
}

const EditNoteModal = ({ note, onClose, onSuccess }: EditNoteModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    site: note.site,
    equipment: note.equipment,
    variable: note.variable,
    timestamp: note.timestamp.substring(0, 16),
    author: note.author,
    message: note.message,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const toastId = toast.loading('Atualizando nota...');
    
    try {
      await notesApi.updateNote(note.id, formData);
      toast.success('Nota atualizada com sucesso!', { id: toastId });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao atualizar nota:', error);
      
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        toast.error(errors.join('\n'), { id: toastId });
      } else {
        toast.error('Erro ao atualizar nota', { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Nota</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <form onSubmit={handleSubmit} className="note-form">
          {/* mesmos campos do CreateNoteModal */}
          <div className="form-group">
            <label>Site *</label>
            <input type="text" name="site" value={formData.site} onChange={handleChange} required minLength={3} />
          </div>

          <div className="form-group">
            <label>Equipamento *</label>
            <select name="equipment" value={formData.equipment} onChange={handleChange} required>
              <option value="Gerador">Gerador</option>
              <option value="Transformador">Transformador</option>
              <option value="Multimedidor">Multimedidor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Variável *</label>
            <select name="variable" value={formData.variable} onChange={handleChange} required>
              <option value="Tensão">Tensão</option>
              <option value="Corrente">Corrente</option>
            </select>
          </div>

          <div className="form-group">
            <label>Data e Hora *</label>
            <input type="datetime-local" name="timestamp" value={formData.timestamp} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Autor *</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required minLength={3} />
          </div>

          <div className="form-group">
            <label>Mensagem *</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required minLength={10} rows={4} />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;