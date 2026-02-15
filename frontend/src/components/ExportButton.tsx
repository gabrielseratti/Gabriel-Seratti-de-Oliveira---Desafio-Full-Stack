import { useState } from 'react';
import type { Note } from '../types/Note';
import { exportToCSV, exportToTXT, exportToPDF } from '../utils/exportUtils';

interface ExportButtonProps {
  notes: Note[];
}

const ExportButton = ({ notes }: ExportButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = (format: 'csv' | 'txt' | 'pdf') => {
    if (notes.length === 0) {
      alert('Não há dados para exportar');
      return;
    }

    switch (format) {
      case 'csv':
        exportToCSV(notes, 'notas');
        break;
      case 'txt':
        exportToTXT(notes, 'notas');
        break;
      case 'pdf':
        exportToPDF(notes, 'notas');
        break;
    }

    setShowMenu(false);
  };

  return (
    <div className="export-container">
      <button 
        className="btn-export"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
        <span>Exportar</span>
      </button>

      {showMenu && (
        <div className="export-menu">
          <button onClick={() => handleExport('csv')} className="export-option">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Exportar CSV
          </button>
          <button onClick={() => handleExport('txt')} className="export-option">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Exportar TXT
          </button>
          <button onClick={() => handleExport('pdf')} className="export-option">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M9 13v6M12 13v6M15 13v6"/>
            </svg>
            Exportar PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;