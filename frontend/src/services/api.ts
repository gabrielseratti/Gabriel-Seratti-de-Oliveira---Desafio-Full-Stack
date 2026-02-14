import axios from 'axios';
import type { Note, PaginatedResponse } from '../types/Note';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface NotesFilters {
  site?: string;
  equipment?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
}

export const notesApi = {
  // Listar notas com filtros
  getNotes: async (filters?: NotesFilters): Promise<PaginatedResponse> => {
    const response = await api.get<PaginatedResponse>('/notes', {
      params: filters,
    });
    return response.data;
  },

  // Criar nova nota
  createNote: async (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> => {
    const response = await api.post<Note>('/notes', note);
    return response.data;
  },

  // Buscar nota específica
  getNote: async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  // Atualizar nota
  updateNote: async (id: string, note: Partial<Note>): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, note);
    return response.data;
  },

  // Deletar nota
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};

export default api;