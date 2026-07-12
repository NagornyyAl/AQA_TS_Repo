import { test, expect } from '@playwright/test';
import { HotlineHomePage } from '../src/pages';

test.describe('Hotline.ua - Homepage', () => {
    let homePage: HotlineHomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HotlineHomePage(page);
        await homePage.goto();
    });

    test('should load homepage with all key header elements visible', async ({ page }) => {
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
            await expect(homePage.catalogButton).toBeVisible();
            await expect(homePage.catalogButton).toContainText('Каталог');
        });

        await test.step('Verify search input is visible with expected placeholder', async () => {
            await expect(homePage.searchInput).toBeVisible();
            await expect(homePage.searchInput).toHaveAttribute('placeholder', 'Знайти товар, магазин, бренд');
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
