import { useState } from 'react';
import type { Note } from '../types/Note';
import { format } from 'date-fns';
import { Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface NotesTableProps {
  notes: Note[];
  loading: boolean;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

type SortField = 'site' | 'equipment' | 'variable' | 'timestamp' | 'author';
type SortDirection = 'asc' | 'desc' | null;

const NotesTable = ({ notes, loading, onEdit, onDelete }: NotesTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (notes.length === 0) {
    return <div className="empty">Nenhuma nota encontrada</div>;
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Se já está ordenando por esse campo, inverte a direção
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      // Novo campo, começa com ascendente
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} style={{ opacity: 0.3 }} />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp size={14} style={{ color: '#42a566' }} />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown size={14} style={{ color: '#42a566' }} />;
    }
    return <ArrowUpDown size={14} style={{ opacity: 0.3 }} />;
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Converter para string para comparação
    if (sortField === 'timestamp') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

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

  const headerStyle = {
    cursor: 'pointer',
    userSelect: 'none' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.2s'
  };

  return (
    <div className="table-container">
      <table className="notes-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('site')}>
              <div style={headerStyle}>
                Site
                {getSortIcon('site')}
              </div>
            </th>
            <th onClick={() => handleSort('equipment')}>
              <div style={headerStyle}>
                Equipamento
                {getSortIcon('equipment')}
              </div>
            </th>
            <th onClick={() => handleSort('variable')}>
              <div style={headerStyle}>
                Monitoração
                {getSortIcon('variable')}
              </div>
            </th>
            <th onClick={() => handleSort('timestamp')}>
              <div style={headerStyle}>
                Data
                {getSortIcon('timestamp')}
              </div>
            </th>
            <th onClick={() => handleSort('author')}>
              <div style={headerStyle}>
                Autor
                {getSortIcon('author')}
              </div>
            </th>
            <th>Mensagem</th>
            <th style={{ width: '100px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedNotes.map((note, index) => (
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