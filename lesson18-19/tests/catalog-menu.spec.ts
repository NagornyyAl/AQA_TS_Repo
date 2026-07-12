import { expect, test } from '../src/fixtures';

test.describe('Hotline.ua - Catalog menu', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('should open catalog menu and navigate to a category page', async ({ page, homePage, categoryPage }) => {
        const expectedCategory = 'Смартфони, Смарт-годинники';

        await test.step('Open the catalog menu', async () => {
            await homePage.catalogMenu.open();
            await expect(homePage.catalogMenu.menu).toBeVisible();
        });

        await test.step('Verify catalog menu contains more than one top-level category', async () => {
            const categoryNames = await homePage.catalogMenu.getCategoryNames();
            expect(categoryNames.length).toBeGreaterThan(1);
        });

        await test.step('Verify the expected category is present in the menu', async () => {
            const categoryNames = await homePage.catalogMenu.getCategoryNames();
            expect(categoryNames).toContain(expectedCategory);
        });

        await test.step('Click the category link', async () => {
            await homePage.catalogMenu.openCategory(expectedCategory);
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
            const breadcrumbTexts = await categoryPage.breadcrumbs.getTexts();
            expect(breadcrumbTexts.some((text) => text.includes('Смартфони'))).toBe(true);
        });
    });

    test('should reuse the same catalog menu and breadcrumbs components for a different category', async ({
        page,
        homePage,
        categoryPage
    }) => {
        const expectedCategory = 'Побутова техніка';

        await test.step('Open the catalog menu again', async () => {
            await homePage.catalogMenu.open();
            await expect(homePage.catalogMenu.menu).toBeVisible();
        });

        await test.step('Verify the second expected category is present in the menu', async () => {
            const categoryNames = await homePage.catalogMenu.getCategoryNames();
            expect(categoryNames).toContain(expectedCategory);
        });

        await test.step('Click the second category link', async () => {
            await homePage.catalogMenu.openCategory(expectedCategory);
        });

        await test.step('Verify navigation to the second category URL', async () => {
            await expect(page).toHaveURL(/\/ua\/bt\//);
        });

        await test.step('Verify the same breadcrumbs component reports the new category', async () => {
            const breadcrumbTexts = await categoryPage.breadcrumbs.getTexts();
            expect(breadcrumbTexts.some((text) => text.includes(expectedCategory))).toBe(true);
        });
    });
});
