import type { ApiResponse } from './api-response';

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export interface ApiService {
  get<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
  post<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
  put<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
  delete<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
}
