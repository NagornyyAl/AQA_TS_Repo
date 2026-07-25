import { expect, test } from '../../src/fixtures/defect.fixture.js';

test.describe('Optional intentionally broken environment - defect demonstration', () => {
    test(
        'BUG-UI-029: Home navigation routes a visitor to Contact instead of the catalogue',
        {
            tag: ['@defect', '@ui', '@known-bug'],
            annotation: { type: 'defect', description: 'BUG-UI-029 | Severity: High | Home link points to #/contact.' }
        },
        async ({ page, bugShopPage, reporter }) => {
            await test.step('Given an unauthenticated visitor opens the bug-hunting home page', async () => {
                await bugShopPage.openHome();
                await expect(bugShopPage.homeLink).toHaveText('Home');
            });

            await test.step('When the visitor selects the Home navigation link', async () => {
                await bugShopPage.homeLink.click();
                await page.waitForURL(/#\/contact$/);
            });

            await test.step('Then the visitor should remain on the catalogue route', async () => {
                await reporter.attachText('BUG-UI-029 expected vs actual', `Expected route: #/\nActual route: ${page.url()}`);
                await reporter.attachScreenshot('BUG-UI-029 - Home routes to Contact', page);
                await expect(page, 'Home navigation must route to the catalogue').toHaveURL(/#\/$/);
            });
        }
    );

    test(
        'BUG-UI-040: Product quantity does not increase after the plus action',
        {
            tag: ['@defect', '@ui', '@known-bug'],
            annotation: { type: 'defect', description: 'BUG-UI-040 | Severity: High | Quantity stays unchanged after plus action.' }
        },
        async ({ page, bugShopPage, reporter }) => {
            let initialQuantity: string;

            await test.step('Given the visitor opens an in-stock product with default quantity one', async () => {
                await bugShopPage.openProduct(1);
                initialQuantity = await bugShopPage.quantityInput.inputValue();
                await expect(initialQuantity).toBe('1');
            });

            await test.step('When the visitor presses the increase quantity control once', async () => {
                await bugShopPage.increaseQuantityButton.click();
            });

            await test.step('Then the quantity should increase by one', async () => {
                const actualQuantity = await bugShopPage.quantityInput.inputValue();
                await reporter.attachText(
                    'BUG-UI-040 expected vs actual',
                    `Initial quantity: ${initialQuantity}\nExpected quantity: 2\nActual quantity: ${actualQuantity}`
                );
                await reporter.attachScreenshot('BUG-UI-040 - Quantity remains unchanged', page);
                await expect(actualQuantity, 'The plus action must increment quantity from one to two').toBe('2');
            });
        }
    );

    test(
        'BUG-API-075: Public product response discloses stock quantity',
        {
            tag: ['@defect', '@api', '@security', '@known-bug'],
            annotation: { type: 'defect', description: 'BUG-API-075 | Severity: High | Public product response exposes stock.' }
        },
        async ({ bugApi, reporter }) => {
            const response = await test.step('When an unauthenticated client requests a public product', async () => {
                const apiResponse = await bugApi.getRaw('/products/1');
                await reporter.attachApiExchange('Unauthenticated GET /products/1', apiResponse);
                return apiResponse;
            });

            await test.step('Then inventory quantity must not be exposed to the public client', async () => {
                const product = (await response.json()) as Record<string, unknown>;
                await reporter.attachText(
                    'BUG-API-075 expected vs actual',
                    `Expected: no stock field in a public product response\nActual: stock=${String(product.stock)}`
                );
                await expect(product, 'Stock is an internal inventory field and must not be publicly disclosed').not.toHaveProperty(
                    'stock'
                );
            });
        }
    );

    test(
        'BUG-API-080: Unauthenticated client can access the application log endpoint',
        {
            tag: ['@defect', '@api', '@security', '@known-bug'],
            annotation: { type: 'defect', description: 'BUG-API-080 | Severity: Critical | Laravel log is publicly exposed.' }
        },
        async ({ bugApi, reporter }) => {
            const response = await test.step('When an unauthenticated client requests the server log resource', async () => {
                const apiResponse = await bugApi.getRaw('/logs/laravel.log');
                await reporter.attachApiExchange('Unauthenticated GET /logs/laravel.log', apiResponse, { includeBody: false });
                return apiResponse;
            });

            await test.step('Then the server must deny access to application logs', async () => {
                await reporter.attachText(
                    'BUG-API-080 expected vs actual',
                    `Expected: 401, 403 or 404\nActual HTTP status: ${response.status()}\nResponse body intentionally redacted in the report.`
                );
                expect(response.status(), 'Application logs must never be accessible without authentication').toBeGreaterThanOrEqual(400);
            });
        }
    );
});
