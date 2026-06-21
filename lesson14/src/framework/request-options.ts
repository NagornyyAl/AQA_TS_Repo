export interface RequestOptions {
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean | undefined>;
    body?: unknown;
}
