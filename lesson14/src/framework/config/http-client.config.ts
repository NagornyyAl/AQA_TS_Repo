export interface HttpClientConfig {
    baseUrl: string;
    timeoutMs?: number;
    defaultHeaders?: Record<string, string>;
}
