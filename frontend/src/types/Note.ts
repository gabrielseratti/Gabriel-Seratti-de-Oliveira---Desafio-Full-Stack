export interface Note {
  id: string;
  site: string;
  equipment: string;
  variable: string;
  timestamp: string;
  author: string;
  message: string;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedResponse {
  current_page: number;
  data: Note[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}