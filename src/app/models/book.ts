export interface Book {
  id: number;
  author: string;
  title: string;
  publish_date: string;
  isbn: string;
  summary: string;
  price: number;
  on_store: number;
  created_at?: string;
  updated_at?: string;
}
