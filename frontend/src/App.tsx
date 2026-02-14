import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import FilterForm from './components/FilterForm';
import NotesTable from './components/NotesTable';
import CreateNoteModal from './components/CreateNoteModal';
import EditNoteModal from './components/EditNoteModal';
import { notesApi } from './services/api';
import type { Note } from './types/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async (page = 1, newFilters = {}) => {
    setLoading(true);
    try {
      const response = await notesApi.getNotes({ ...newFilters, page });
      setNotes(response.data);
      setCurrentPage(response.current_page);
      setTotalPages(response.last_page);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      alert('Erro ao carregar notas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    fetchNotes(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchNotes(page, filters);
  };

  const handleCreateSuccess = () => {
    fetchNotes(1, filters);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleEditSuccess = () => {
    fetchNotes(currentPage, filters);
  };

  const handleDelete = async (id: string) => {
    try {
      await notesApi.deleteNote(id);
      alert('Nota deletada com sucesso!');
      fetchNotes(currentPage, filters);
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      alert('Erro ao deletar nota.');
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <h1>Notas</h1>
          <div className="user-info">
            <span className="user-name">Elias</span>
            <div className="user-avatar">EG</div>
          </div>
        </header>

        <div className="content">
          <FilterForm onFilter={handleFilter} />
          <NotesTable 
            notes={notes} 
            loading={loading} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="pagination-arrow"
              title="Primeira página"
            >
              <img src="/double-arrow.svg" alt="" style={{ transform: 'rotate(180deg)', width: '14px', height: '14px' }} />
            </button>
            
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-arrow chevron-left"
              title="Página anterior"
            >
              <img src="/chevron.svg" alt="" style={{ transform: 'rotate(90deg)', width: '12px', height: '12px' }} />
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={currentPage === pageNum ? 'pagination-number active' : 'pagination-number'}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-arrow chevron-right"
              title="Próxima página"
            >
              <img src="/chevron.svg" alt="" style={{ transform: 'rotate(-90deg)', width: '12px', height: '12px' }} />
            </button>
            
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="pagination-arrow"
              title="Última página"
            >
              <img src="/double-arrow.svg" alt="" style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        )}
        </div>
      </main>

      {showCreateModal && (
        <CreateNoteModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}

export default App;