import type { APIResponse } from '@playwright/test';
import {
    parseApiError,
    parsePaginatedProductSearch,
    parsePaginatedProducts,
    parseProduct,
    parseProducts
} from '../../src/contracts/product.contract.js';
import { expect, test } from '../../src/fixtures/test.js';
import { productTestData } from '../../src/test-data/products.js';

const expectJsonResponse = (response: APIResponse): void => {
    expect(response.headers()['content-type']).toContain('application/json');
};

test.describe('Toolshop API v2 - product catalogue', () => {
    test(
        'API-PROD-001: returns a contract-valid first page with correct pagination metadata',
        { tag: ['@api', '@smoke'] },
        async ({ api, reporter }) => {
            const { response, body } = await api.getProducts({ page: 1 });
            await reporter.attachApiExchange('GET /products?page=1', response);

            await test.step('Validate transport-level expectations', () => {
                expect(response.status()).toBe(200);
                expectJsonResponse(response);
            });

            await test.step('Validate the documented response contract', () => {
                const payload = parsePaginatedProducts(body);
                expect(payload.current_page).toBe(1);
                expect(payload.data).toHaveLength(payload.per_page);
                expect(payload.total).toBeGreaterThanOrEqual(payload.data.length);
                expect(payload.last_page).toBeGreaterThanOrEqual(payload.current_page);
            });
        }
    );

    test(
        'API-PROD-002: product details are consistent with the catalogue representation',
        { tag: ['@api', '@smoke'] },
        async ({ api, reporter }) => {
            const result =
                await test.step('Given the catalogue and product-detail endpoints are requested for the same product', async () => {
                    const responses = await Promise.all([api.getProducts({ page: 1 }), api.getProduct(productTestData.stableProductId)]);
                    await Promise.all([
                        reporter.attachApiExchange('GET /products?page=1', responses[0].response),
                        reporter.attachApiExchange(`GET /products/${productTestData.stableProductId}`, responses[1].response)
                    ]);
                    return responses;
                });

            await test.step('Then the detail endpoint responds with JSON and HTTP 200', () => {
                expect(result[1].response.status()).toBe(200);
                expectJsonResponse(result[1].response);
            });

            await test.step('And shared catalogue fields match the authoritative product detail', () => {
                const catalogueProduct = parsePaginatedProducts(result[0].body).data.find(
                    (product) => product.id === productTestData.stableProductId
                );
                const product = parseProduct(result[1].body);
                expect(catalogueProduct).toBeDefined();
                expect(product).toMatchObject({
                    id: catalogueProduct?.id,
                    name: catalogueProduct?.name,
                    price: catalogueProduct?.price,
                    category: { id: catalogueProduct?.category.id },
                    brand: { id: catalogueProduct?.brand.id }
                });
            });
        }
    );

    test(
        'API-PROD-003: category filtering returns only products from the requested category',
        { tag: ['@api', '@regression'] },
        async ({ api, reporter }) => {
            const result = await test.step(`When products are filtered by category ${productTestData.pliersCategoryId}`, async () => {
                const response = await api.getProducts({ by_category: productTestData.pliersCategoryId });
                await reporter.attachApiExchange(`GET /products?by_category=${productTestData.pliersCategoryId}`, response.response);
                return response;
            });

            await test.step('Then the response is JSON and every returned product belongs to that category', () => {
                const products = parsePaginatedProducts(result.body).data;
                expect(result.response.status()).toBe(200);
                expectJsonResponse(result.response);
                expect(products).not.toHaveLength(0);
                expect(products.every((product) => product.category.id === productTestData.pliersCategoryId)).toBe(true);
            });
        }
    );

    for (const sort of ['price,asc', 'price,desc'] as const) {
        test(
            `API-PROD-004: ${sort} returns a monotonically sorted product page`,
            { tag: ['@api', '@regression'] },
            async ({ api, reporter }) => {
                const result = await test.step(`When the catalogue is requested with ${sort} sorting`, async () => {
                    const response = await api.getProducts({ sort });
                    await reporter.attachApiExchange(`GET /products?sort=${sort}`, response.response);
                    return response;
                });

                await test.step('Then all returned prices are monotonically ordered', () => {
                    const prices = parsePaginatedProducts(result.body).data.map((product) => product.price);
                    const expectedPrices = [...prices].sort((left, right) => (sort.endsWith('asc') ? left - right : right - left));
                    expect(result.response.status()).toBe(200);
                    expect(prices.length).toBeGreaterThan(1);
                    expect(prices).toEqual(expectedPrices);
                });
            }
        );
    }

    test(
        'API-PROD-005: full-text product search is case-insensitive and semantically relevant',
        { tag: ['@api', '@regression'] },
        async ({ api, reporter }) => {
            const query = productTestData.searchTerm.toUpperCase();
            const result = await test.step(`When a customer searches for uppercase "${query}"`, async () => {
                const response = await api.getProductsBySearch(query);
                await reporter.attachApiExchange(`GET /products/search?q=${query}`, response.response);
                return response;
            });

            await test.step('Then the search is case-insensitive and each result is semantically relevant', () => {
                const products = parsePaginatedProductSearch(result.body).data;
                expect(result.response.status()).toBe(200);
                expectJsonResponse(result.response);
                expect(products).not.toHaveLength(0);
                expect(products.every((product) => product.name.toLocaleLowerCase().includes(productTestData.searchTerm))).toBe(true);
            });
        }
    );

    test(
        'API-PROD-006: related-products endpoint returns contract-valid products and excludes the source product',
        { tag: ['@api', '@regression'] },
        async ({ api, reporter }) => {
            const result =
                await test.step(`When related products are requested for product ${productTestData.stableProductId}`, async () => {
                    const response = await api.getRelatedProducts(productTestData.stableProductId);
                    await reporter.attachApiExchange(`GET /products/${productTestData.stableProductId}/related`, response.response);
                    return response;
                });

            await test.step('Then contract-valid related products are returned and none repeats the source product', () => {
                const relatedProducts = parseProducts(result.body);
                expect(result.response.status()).toBe(200);
                expectJsonResponse(result.response);
                expect(relatedProducts).not.toHaveLength(0);
                expect(relatedProducts.every((product) => product.id !== productTestData.stableProductId)).toBe(true);
            });
        }
    );

    test(
        'API-PROD-007: an unknown product has a stable, meaningful not-found response',
        { tag: ['@api', '@negative', '@smoke'] },
        async ({ api, reporter }) => {
            const response = await test.step(`When a missing product ${productTestData.missingProductId} is requested`, async () => {
                const rawResponse = await api.getRaw(`/products/${productTestData.missingProductId}`);
                await reporter.attachApiExchange(`GET /products/${productTestData.missingProductId}`, rawResponse);
                return rawResponse;
            });

            await test.step('Then the API returns an explicit JSON 404 response', async () => {
                const error = parseApiError(await response.json());
                expect(response.status()).toBe(404);
                expectJsonResponse(response);
                expect(error.message).toMatch(/not found/i);
            });
        }
    );
});
