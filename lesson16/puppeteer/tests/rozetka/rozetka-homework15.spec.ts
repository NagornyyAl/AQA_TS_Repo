import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from 'vitest';
import { RozetkaHomeworkPage } from '../../src/modules/rozetka/rozetka-homework.page';

describe('Rozetka homework 15 scenarios', () => {
    const notebookQuery = '\u043d\u043e\u0443\u0442\u0431\u0443\u043a';
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let rozetkaPage: RozetkaHomeworkPage;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: process.env.HEADLESS !== 'false',
            defaultViewport: {
                height: 900,
                width: 1440
            }
        });
    });

    beforeEach(async () => {
        context = await browser.createBrowserContext();
        page = await context.newPage();
        page.setDefaultTimeout(30000);
        rozetkaPage = new RozetkaHomeworkPage(page);
    });

    afterEach(async () => {
        await context.close();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('TC-1 searches for notebooks from the header', async () => {
        await rozetkaPage.goToHome();
        await rozetkaPage.searchFromHeader(notebookQuery);
        await rozetkaPage.expectSearchResultsPage(notebookQuery);
    });

    test('TC-2 opens computers category from catalog', async () => {
        await rozetkaPage.goToHome();
        await rozetkaPage.openComputersCatalogCategory();
        await rozetkaPage.expectComputersCategoryOpened();
    });

    test('TC-3 adds the first notebook to cart', async () => {
        await rozetkaPage.goToNotebooksCategory();
        await rozetkaPage.addFirstNotebookToCart();
        await rozetkaPage.openCart();
        await rozetkaPage.expectCartHasProduct();
    });

    test('TC-4 removes the first notebook from cart', async () => {
        await rozetkaPage.goToNotebooksCategory();
        await rozetkaPage.addFirstNotebookToCart();
        await rozetkaPage.openCart();
        await rozetkaPage.expectCartHasProduct();
        await rozetkaPage.removeFirstCartItem();
        await rozetkaPage.expectCartIsEmpty();
    });
});
