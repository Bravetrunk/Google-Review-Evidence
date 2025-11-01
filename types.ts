export interface FormData {
  employeeName: string;
}

export interface ApiPayload {
  employeeName: string;
  fileData: string;
  fileName: string;
  mimeType: string;
}

export type StatusType = 'success' | 'error' | 'info';

export interface StatusState {
  message: string;
  type: StatusType | null;
}

export interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
}