import {
    parseStorefrontPaginatedProducts,
    parseStorefrontPaginatedSearch,
    parseStorefrontProduct,
    parseStorefrontRelatedProducts
} from '../../src/contracts/storefront-product.contract.js';
import { expect, test } from '../../src/fixtures/test.js';
import { storefrontTestData } from '../../src/test-data/products.js';

test.describe('Practice Software Testing current storefront - catalogue UI', () => {
    // Opt out of fullyParallel for this public UI without serial-mode skip semantics.
    test.describe.configure({ mode: 'default' });

    test(
        'UI-CAT-001: catalogue renders the exact products returned by its initial API request',
        { tag: ['@e2e', '@smoke', '@integration'] },
        async ({ catalogPage, reporter }) => {
            const response = await test.step('Given a visitor opens the current storefront catalogue', async () => {
                const browserResponse = await catalogPage.open();
                await reporter.attachApiExchange('Browser QUERY /products - initial catalogue', browserResponse);
                return browserResponse;
            });
            const apiProducts = parseStorefrontPaginatedProducts(await response.json()).data;

            await test.step('Then primary customer navigation is visible', async () => {
                await expect(catalogPage.homeLink).toBeVisible();
                await expect(catalogPage.categoryMenu).toBeVisible();
                await expect(catalogPage.contactLink).toBeVisible();
            });

            await test.step('And every rendered card matches the browser-observed API response in order', async () => {
                const renderedProducts = await catalogPage.getRenderedProducts();
                expect(renderedProducts).toEqual(
                    apiProducts.map((product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }))
                );
            });
        }
    );

    test(
        'UI-CAT-002: category filter sends the selected live category id and renders only matching products',
        { tag: ['@e2e', '@regression', '@integration'] },
        async ({ catalogPage, reporter }) => {
            await test.step('Given the current catalogue is open', async () => {
                await catalogPage.open();
            });

            const { response, categoryId } =
                await test.step(`When the visitor selects the ${storefrontTestData.categoryName} category`, async () => {
                    const result = await catalogPage.filters.filterByCategory(storefrontTestData.categoryName);
                    await reporter.attachApiExchange(
                        `Browser QUERY /products - category ${storefrontTestData.categoryName}`,
                        result.response
                    );
                    return result;
                });
            const expectedProducts = parseStorefrontPaginatedProducts(await response.json()).data;

            await test.step('Then each API and UI product belongs to the dynamically selected category', async () => {
                expect(expectedProducts).not.toHaveLength(0);
                expect(expectedProducts.every((product) => product.category.id === categoryId)).toBe(true);
                expect(await catalogPage.getRenderedProducts()).toEqual(
                    expectedProducts.map((product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }))
                );
            });
        }
    );

    test(
        'UI-CAT-003: search returns relevant cards and preserves API result order',
        { tag: ['@e2e', '@regression', '@integration'] },
        async ({ catalogPage, reporter }) => {
            await catalogPage.open();

            const response = await test.step(`When the visitor searches for "${storefrontTestData.searchTerm}"`, async () => {
                const browserResponse = await catalogPage.filters.search(storefrontTestData.searchTerm);
                await reporter.attachApiExchange(`Browser QUERY /products/search - q=${storefrontTestData.searchTerm}`, browserResponse);
                return browserResponse;
            });
            const expectedProducts = parseStorefrontPaginatedSearch(await response.json()).data;

            await test.step('Then every card is relevant and follows the API result order', async () => {
                const renderedProducts = await catalogPage.getRenderedProducts();
                expect(expectedProducts).not.toHaveLength(0);
                expect(expectedProducts.every((product) => product.name.toLocaleLowerCase().includes(storefrontTestData.searchTerm))).toBe(
                    true
                );
                expect(renderedProducts).toEqual(
                    expectedProducts.map((product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }))
                );
            });
        }
    );

    test(
        'UI-CAT-004: price sorting is reflected in both the API request and rendered catalogue',
        { tag: ['@e2e', '@regression', '@integration'] },
        async ({ catalogPage, reporter }) => {
            await catalogPage.open();

            const response = await test.step('When the visitor selects price high-to-low sorting', async () => {
                const browserResponse = await catalogPage.filters.sortBy('price,desc');
                await reporter.attachApiExchange('Browser QUERY /products - sort=price,desc', browserResponse);
                return browserResponse;
            });
            const expectedProducts = parseStorefrontPaginatedProducts(await response.json()).data;

            await test.step('Then prices descend and the cards exactly mirror the sorted API response', async () => {
                const renderedProducts = await catalogPage.getRenderedProducts();
                const renderedPrices = renderedProducts.map((product) => product.price);
                expect(renderedPrices).toEqual([...renderedPrices].sort((left, right) => right - left));
                expect(renderedProducts).toEqual(
                    expectedProducts.map((product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }))
                );
            });
        }
    );

    test(
        'UI-PROD-001: dynamically selected product page mirrors product and related-product responses',
        { tag: ['@e2e', '@smoke', '@integration'] },
        async ({ catalogPage, productPage, reporter }) => {
            const productId = await test.step('Given a current product id is discovered from the live catalogue', async () => {
                await catalogPage.open();
                return catalogPage.getFirstProductId();
            });

            const { productResponse, relatedProductsResponse } =
                await test.step('When the visitor opens that product from the catalogue', async () => {
                    const responses = await productPage.openFromCatalogue(catalogPage.productCard(productId), productId);
                    await Promise.all([
                        reporter.attachApiExchange(`Browser GET /products/${productId}`, responses.productResponse),
                        reporter.attachApiExchange(`Browser GET /products/${productId}/related`, responses.relatedProductsResponse)
                    ]);
                    return responses;
                });
            const product = parseStorefrontProduct(await productResponse.json());
            const relatedProducts = parseStorefrontRelatedProducts(await relatedProductsResponse.json());

            await test.step('Then product details displayed to the visitor match the API', async () => {
                expect(await productPage.getDetails()).toEqual({
                    name: product.name,
                    price: product.price,
                    description: product.description
                });
            });

            await test.step('And related-product links mirror the related endpoint without repeating the source product', async () => {
                const relatedProductIds = await productPage.getRelatedProductIds();
                expect(relatedProductIds).toEqual(relatedProducts.map((relatedProduct) => relatedProduct.id));
                expect(relatedProductIds).not.toContain(product.id);
            });
        }
    );

    test(
        'UI-PROD-002: increase quantity changes the current product quantity from one to two',
        { tag: ['@e2e', '@smoke', '@regression'] },
        async ({ catalogPage, productPage }) => {
            const productId = await test.step('Given an available product is discovered dynamically and opened', async () => {
                await catalogPage.open();
                const id = await catalogPage.getFirstProductId();
                await productPage.openFromCatalogue(catalogPage.productCard(id), id);
                await expect(productPage.quantity).toHaveValue('1');
                return id;
            });

            await test.step(`When the visitor increases quantity for product ${productId}`, async () => {
                await productPage.increaseQuantity();
            });

            await test.step('Then quantity changes from one to two', async () => {
                await expect(productPage.quantity).toHaveValue('2');
            });
        }
    );
});
