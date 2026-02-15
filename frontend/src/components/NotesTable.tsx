import type { Note } from '../types/Note';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

interface NotesTableProps {
  notes: Note[];
  loading: boolean;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;  
}

const NotesTable = ({ notes, loading, onEdit, onDelete }: NotesTableProps) => {
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (notes.length === 0) {
    return <div className="empty">Nenhuma nota encontrada</div>;
  }

  const buttonStyle = {
    padding: '6px',
    border: 'none',
    background: 'transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    transition: 'all 0.2s'
  };

  return (
    <div className="table-container">
      <table className="notes-table">
        <thead>
          <tr>
            <th>Site</th>
            <th>Equipamento</th>
            <th>Monitoração</th>
            <th>Data</th>
            <th>Autor</th>
            <th>Mensagem</th>
            <th style={{ width: '100px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>{note.site}</td>
              <td>{note.equipment}</td>
              <td>{note.variable}</td>
              <td>{format(new Date(note.timestamp), 'dd/MM/yyyy HH:mm:ss')}</td>
              <td>{note.author}</td>
              <td className="message-cell">{note.message}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                  <button 
                    onClick={() => onEdit(note)} 
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.color = '#3b82f6';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(note)}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.color = '#ef4444';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Deletar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;