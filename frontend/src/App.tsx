import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import FilterForm from './components/FilterForm';
import NotesTable from './components/NotesTable';
import CreateNoteModal from './components/CreateNoteModal';
import EditNoteModal from './components/EditNoteModal';
import ExportButton from './components/ExportButton';
import { notesApi } from './services/api';
import type { Note } from './types/Note';
import './App.css';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [deletingNote, setDeletingNote] = useState<Note | null>(null); 

  const fetchNotes = async (page = 1, newFilters = {}) => {
    setLoading(true);
    try {
      const response = await notesApi.getNotes({ ...newFilters, page });
      setNotes(response.data);
      setCurrentPage(response.current_page);
      setTotalPages(response.last_page);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      toast.error('Erro ao carregar notas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllNotes = async (currentFilters = {}) => {
    try {
      const response = await notesApi.getNotes({ 
        ...currentFilters, 
        per_page: 1000
      });
      setAllNotes(response.data);
    } catch (error) {
      console.error('Erro ao buscar todas as notas:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchAllNotes();
  }, []);

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    fetchNotes(1, newFilters);
    fetchAllNotes(newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchNotes(page, filters);
  };

  const handleCreateSuccess = () => {
    fetchNotes(1, filters);
    fetchAllNotes(filters);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleEditSuccess = () => {
    fetchNotes(currentPage, filters);
    fetchAllNotes(filters);
  };

  const handleDelete = async (note: Note) => {
    setDeletingNote(note); // NOVO: mostrar modal
  };

  const confirmDelete = async () => {
    if (!deletingNote) return;
    
    const toastId = toast.loading('Deletando nota...');
    
    try {
      await notesApi.deleteNote(deletingNote.id);
      toast.success('Nota deletada com sucesso!', { id: toastId });
      fetchNotes(currentPage, filters);
      fetchAllNotes(filters);
      setDeletingNote(null);
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      toast.error('Erro ao deletar nota', { id: toastId });
    }
  };

  return (
    <div className="app">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#42a566',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <span className="user-name">Elias</span>
            <div className="user-avatar">EG</div>
          </div>
        </header>

        <div className="content">
          <div className="content-header">
            <h1 className="page-title">Notas</h1>
            <div className="header-actions">
              <button 
                className="btn-create-note"
                onClick={() => setShowCreateModal(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Nova Nota
              </button>
              <ExportButton notes={allNotes} />
            </div>
          </div>
          
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
                className="pagination-arrow"
                title="Página anterior"
              >
                <img src="/chevron.svg" alt="" style={{ transform: 'rotate(180deg)', width: '12px', height: '12px' }} />
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
                className="pagination-arrow"
                title="Próxima página"
              >
                <img src="/chevron.svg" alt="" style={{ transform: 'rotate(0deg)', width: '12px', height: '12px' }} />
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

      {deletingNote && (
        <ConfirmModal
          title="Deletar Nota"
          message={`Tem certeza que deseja deletar a nota do site "${deletingNote.site}"? Esta ação não pode ser desfeita.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingNote(null)}
          confirmText="Deletar"
          cancelText="Cancelar"
          danger
        />
      )}
    </div>
  );
}

export default App;