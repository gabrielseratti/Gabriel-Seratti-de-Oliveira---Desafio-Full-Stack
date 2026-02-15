import type { Note } from '../types/Note';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (notes: Note[], filename: string = 'notas') => {
  const headers = ['Site', 'Equipamento', 'Monitoração', 'Data', 'Autor', 'Mensagem'];
  
  const csvContent = [
    headers.join(','),
    ...notes.map(note => [
      `"${note.site}"`,
      `"${note.equipment}"`,
      `"${note.variable}"`,
      `"${format(new Date(note.timestamp), 'dd/MM/yyyy HH:mm:ss')}"`,
      `"${note.author}"`,
      `"${note.message.replace(/"/g, '""')}"` // Escape aspas duplas
    ].join(','))
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToTXT = (notes: Note[], filename: string = 'notas') => {
  const txtContent = notes.map(note => `
========================================
Site: ${note.site}
Equipamento: ${note.equipment}
Monitoração: ${note.variable}
Data: ${format(new Date(note.timestamp), 'dd/MM/yyyy HH:mm:ss')}
Autor: ${note.author}
Mensagem: ${note.message}
========================================
`).join('\n');

  const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${Date.now()}.txt`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (notes: Note[], filename: string = 'notas') => {
  const doc = new jsPDF('landscape');
  
  // Título
  doc.setFontSize(18);
  doc.text('Relatório de Notas', 14, 15);
  
  // Data de geração
  doc.setFontSize(10);
  doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, 14, 22);
  
  // Tabela
  const tableData = notes.map(note => [
    note.site,
    note.equipment,
    note.variable,
    format(new Date(note.timestamp), 'dd/MM/yyyy HH:mm'),
    note.author,
    note.message.substring(0, 100) + (note.message.length > 100 ? '...' : '')
  ]);

  autoTable(doc, {
    head: [['Site', 'Equipamento', 'Monitoração', 'Data', 'Autor', 'Mensagem']],
    body: tableData,
    startY: 28,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [66, 165, 102] },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    margin: { top: 28 }
  });

  doc.save(`${filename}-${Date.now()}.pdf`);
};