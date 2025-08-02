export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  errorCode?: string;
  errors?: FieldErrorDetail[];
}

export interface FieldErrorDetail {
  field: string;
  code: string;
  message: string;
}