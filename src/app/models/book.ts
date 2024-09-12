export interface Book {
  id: string;
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
