import { expect, test } from '../src/fixtures';

test.describe('Hotline.ua - Homepage', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('should load homepage with all key header elements visible', async ({ page, homePage }) => {
        await test.step('Verify page URL is the hotline.ua homepage', async () => {
            await expect(page).toHaveURL('https://hotline.ua/');
        });

        await test.step('Verify page title mentions Hotline', async () => {
            await expect(page).toHaveTitle(/Hotline/i);
        });

        await test.step('Verify header logo is visible', async () => {
            await expect(homePage.logo).toBeVisible();
        });

        await test.step('Verify catalog button is visible with expected text', async () => {
            await expect(homePage.catalogMenu.button).toBeVisible();
            await expect(homePage.catalogMenu.button).toContainText('Каталог');
        });

        await test.step('Verify search input is visible with expected placeholder', async () => {
            await expect(homePage.searchBox.input).toBeVisible();
            await expect(homePage.searchBox.input).toHaveAttribute('placeholder', 'Знайти товар, магазин, бренд');
        });

        await test.step('Verify city selector shows a non-empty city name', async () => {
            await expect(homePage.citySelector).toBeVisible();
            const cityText = await homePage.citySelector.textContent();
            expect(cityText?.trim().length).toBeGreaterThan(0);
        });

        await test.step('Verify footer is present on the page', async () => {
            await expect(homePage.footer).toBeVisible();
        });
    });
});
