import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type Method
} from 'axios';

import type { ApiResponse } from './api-response';
import type { ApiService, RequestOptions } from './api-service';

export interface HttpClientConfig {
  baseUrl: string;
  timeoutMs?: number;
  defaultHeaders?: Record<string, string>;
}

export class ApiRequestError extends Error {
  public constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export class HttpClient implements ApiService {
  private readonly client: AxiosInstance;

  public constructor(config: HttpClientConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeoutMs ?? 5000,
      headers: {
        Accept: 'application/json, text/plain, */*',
        ...config.defaultHeaders
      },
      validateStatus: () => true
    });
  }

  public async get<TBody>(path: string, options: RequestOptions = {}): Promise<ApiResponse<TBody>> {
    return this.request<TBody>('GET', path, options);
  }

  public async post<TBody>(path: string, options: RequestOptions = {}): Promise<ApiResponse<TBody>> {
    return this.request<TBody>('POST', path, options);
  }

  public async put<TBody>(path: string, options: RequestOptions = {}): Promise<ApiResponse<TBody>> {
    return this.request<TBody>('PUT', path, options);
  }

  public async delete<TBody>(path: string, options: RequestOptions = {}): Promise<ApiResponse<TBody>> {
    return this.request<TBody>('DELETE', path, options);
  }

  private async request<TBody>(
    method: Method,
    path: string,
    options: RequestOptions
  ): Promise<ApiResponse<TBody>> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: path,
      headers: options.headers,
      params: options.query,
      data: options.body
    };

    try {
      const response = await this.client.request<TBody>(requestConfig);

      return {
        status: response.status,
        headers: response.headers as Record<string, string | string[] | undefined>,
        body: response.data
      };
    } catch (error) {
      throw new ApiRequestError(this.buildErrorMessage(error), error);
    }
  }

  private buildErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const method = axiosError.config?.method?.toUpperCase() ?? 'REQUEST';
      const url = axiosError.config?.url ?? 'unknown-url';

      return `${method} ${url} failed: ${axiosError.message}`;
    }

    return 'Unexpected API request failure';
  }
}
