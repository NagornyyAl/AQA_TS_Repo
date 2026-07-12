import { test, expect } from '@playwright/test';
import { HotlineHomePage, HotlineCategoryPage } from '../src/pages';

test.describe('Hotline.ua - Catalog menu', () => {
    let homePage: HotlineHomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HotlineHomePage(page);
        await homePage.goto();
    });

    test('should open catalog menu and navigate to a category page', async ({ page }) => {
        const categoryPage = new HotlineCategoryPage(page);
        const expectedCategory = 'Смартфони, Смарт-годинники';

        await test.step('Open the catalog menu', async () => {
            await homePage.openCatalogMenu();
            await expect(homePage.catalogMenu).toBeVisible();
        });

        await test.step('Verify catalog menu contains more than one top-level category', async () => {
            const categoryNames = await homePage.getCatalogCategoryNames();
            expect(categoryNames.length).toBeGreaterThan(1);
        });

        await test.step('Verify the expected category is present in the menu', async () => {
            const categoryNames = await homePage.getCatalogCategoryNames();
            expect(categoryNames).toContain(expectedCategory);
        });

        await test.step('Click the category link', async () => {
            await homePage.openCatalogCategory(expectedCategory);
        });

        await test.step('Verify navigation to the category URL', async () => {
            await expect(page).toHaveURL(/\/ua\/mobile\//);
        });

        await test.step('Verify category page heading is visible and not empty', async () => {
            await expect(categoryPage.heading).toBeVisible();
            const headingText = await categoryPage.heading.textContent();
            expect(headingText?.trim().length).toBeGreaterThan(0);
        });

        await test.step('Verify breadcrumbs include the category name', async () => {
            const breadcrumbTexts = await categoryPage.getBreadcrumbTexts();
            expect(breadcrumbTexts.some((text) => text.includes('Смартфони'))).toBe(true);
        });
    });
});
