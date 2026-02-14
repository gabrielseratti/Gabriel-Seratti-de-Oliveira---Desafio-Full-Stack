import type { Note } from '../types/Note';
import { format } from 'date-fns';

interface NotesTableProps {
  notes: Note[];
  loading: boolean;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NotesTable = ({ notes, loading, onEdit, onDelete }: NotesTableProps) => {
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (notes.length === 0) {
    return <div className="empty">Nenhuma nota encontrada</div>;
  }

  const handleDelete = (id: string, site: string) => {
    if (window.confirm(`Tem certeza que deseja deletar a nota do site "${site}"?`)) {
      onDelete(id);
    }
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;