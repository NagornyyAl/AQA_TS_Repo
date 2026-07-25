import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { PaginatedProductSearch, PaginatedProducts, Product } from '../models/product.js';

export type ProductSort = 'name,asc' | 'name,desc' | 'price,asc' | 'price,desc';

export interface ProductQuery {
    by_brand?: number;
    by_category?: number;
    page?: number;
    sort?: ProductSort;
}

export interface ApiResult<T> {
    response: APIResponse;
    body: T;
}

export class ToolshopApiClient {
    public constructor(private readonly request: APIRequestContext) {}

    public getProducts(parameters: ProductQuery = {}): Promise<ApiResult<PaginatedProducts>> {
        return this.get('/products', this.toQueryParameters(parameters));
    }

    public getProductsBySearch(query: string, page?: number): Promise<ApiResult<PaginatedProductSearch>> {
        return this.get('/products/search', { q: query, ...(page === undefined ? {} : { page }) });
    }

    public getProduct(productId: number): Promise<ApiResult<Product>> {
        return this.get(`/products/${productId}`);
    }

    public getRelatedProducts(productId: number): Promise<ApiResult<Product[]>> {
        return this.get(`/products/${productId}/related`);
    }

    public getRaw(path: string, parameters: Record<string, string | number | boolean> = {}): Promise<APIResponse> {
        return this.request.get(path, { params: parameters });
    }

    private async get<T>(path: string, parameters: Record<string, string | number> = {}): Promise<ApiResult<T>> {
        const response = await this.request.get(path, { params: parameters });
        return { response, body: (await response.json()) as T };
    }

    private toQueryParameters(parameters: ProductQuery): Record<string, string | number> {
        return Object.fromEntries(Object.entries(parameters).filter(([, value]) => value !== undefined)) as Record<string, string | number>;
    }
}
