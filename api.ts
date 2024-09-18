// types/api.ts

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface Document {
  id: number;
  title: string;
  file: string;
  uploaded_at: string;
}

export interface FileUploadResponse {
  id: number;
  title: string;
  file: string;
  uploaded_at: string;
}
