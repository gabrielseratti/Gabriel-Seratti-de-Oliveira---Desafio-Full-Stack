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
  per_page?: number;
}

export const notesApi = { 
  getNotes: async (filters?: NotesFilters): Promise<PaginatedResponse> => {
    const response = await api.get<PaginatedResponse>('/notes', {
      params: filters,
    });
    return response.data;
  },
 
  createNote: async (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> => {
    const response = await api.post<Note>('/notes', note);
    return response.data;
  },
 
  getNote: async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },
 
  updateNote: async (id: string, note: Partial<Note>): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, note);
    return response.data;
  },
 
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};

export default api;