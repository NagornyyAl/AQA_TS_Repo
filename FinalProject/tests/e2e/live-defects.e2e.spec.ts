import { expect, test } from '../../src/fixtures/test.js';
import { storefrontTestData } from '../../src/test-data/products.js';

test.describe('Selected resource - confirmed live defect evidence', () => {
    test(
        'LIVE-API-001: related endpoint returns 500 instead of 404 for the stale resource product',
        {
            tag: ['@defect', '@integration', '@api', '@known-bug'],
            annotation: {
                type: 'defect',
                description: 'Severity: High | Missing product returns 404 but its related endpoint returns 500.'
            }
        },
        async ({ page, productPage, reporter }) => {
            test.fail(true, 'Known live defect LIVE-API-001: expected to fail until the related endpoint stops returning 500');

            const { productResponse, relatedProductsResponse } = await test.step('When the exact stale product id is opened', async () => {
                const responses = await productPage.openMissing(storefrontTestData.staleResourceProductId);
                await Promise.all([
                    reporter.attachApiExchange(
                        `Browser GET /products/${storefrontTestData.staleResourceProductId}`,
                        responses.productResponse
                    ),
                    reporter.attachApiExchange(
                        `Browser GET /products/${storefrontTestData.staleResourceProductId}/related`,
                        responses.relatedProductsResponse
                    )
                ]);
                return responses;
            });

            await test.step('Then the primary product endpoint correctly reports not found', () => {
                expect(productResponse.status()).toBe(404);
                expect(productResponse.headers()['content-type']).toContain('application/json');
            });

            await test.step('And the related endpoint must return the same client-safe 404 rather than a server error', async () => {
                await reporter.attachText(
                    'LIVE-API-001 expected vs actual',
                    `Expected related status: 404\nActual related status: ${relatedProductsResponse.status()}\nActual content type: ${relatedProductsResponse.headers()['content-type'] ?? 'missing'}`
                );
                await reporter.attachScreenshot('LIVE-API-001 - stale product related endpoint failure', page);
                expect(relatedProductsResponse.status(), 'A missing product relation must not produce an internal server error').toBe(404);
                expect(relatedProductsResponse.headers()['content-type']).toContain('application/json');
            });
        }
    );

    test(
        'LIVE-UI-001: stale product URL has no clear not-found feedback',
        {
            tag: ['@defect', '@e2e', '@negative', '@known-bug'],
            annotation: {
                type: 'defect',
                description: 'Severity: Medium | Stale product page remains partially empty without a not-found message.'
            }
        },
        async ({ page, productPage, reporter }) => {
            test.fail(true, 'Known live defect LIVE-UI-001: expected to fail until the page shows clear not-found feedback');

            await test.step('Given the visitor opens the exact stale product URL', async () => {
                const responses = await productPage.openMissing(storefrontTestData.staleResourceProductId);
                await Promise.all([
                    reporter.attachApiExchange('Missing product response', responses.productResponse),
                    reporter.attachApiExchange('Missing product related response', responses.relatedProductsResponse)
                ]);
                await page.waitForLoadState('networkidle');
            });

            await test.step('Then the page should explain that the product was not found', async () => {
                await reporter.attachText(
                    'LIVE-UI-001 expected vs actual',
                    'Expected: visible Product not found feedback\nActual: partially empty product page with Related products heading.'
                );
                await reporter.attachScreenshot('LIVE-UI-001 - missing not-found feedback', page);
                await expect(
                    page.getByText(/product\s+(?:was\s+)?not\s+found/i),
                    'A stale product link must show clear not-found feedback'
                ).toBeVisible();
            });
        }
    );
});
