import type { ApiResponse } from './api-response';
import type { RequestOptions } from './request-options';

export interface ApiService {
    get<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
    post<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
    put<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
    delete<TBody>(path: string, options?: RequestOptions): Promise<ApiResponse<TBody>>;
}
