// cSpell:ignore Deye EcoFlow hotline
import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { PriceComparisonPage } from '../../src/modules/hotline/price-comparison.page';

describe('Live hotline.ua search scenarios', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let priceComparisonPage: PriceComparisonPage;

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
        priceComparisonPage = new PriceComparisonPage(page);
        await priceComparisonPage.goTo();
    });

    afterEach(async () => {
        await context.close();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('searches EcoFlow products with Puppeteer commands', async () => {
        await page.locator('[aria-controls="autosuggest-autosuggest__results"]').fill('EcoFlow');
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => window.location.pathname.includes('/sr/'));
        await page.waitForSelector('div.list-item a.item-title', { visible: true });

        const titles = await page.$$eval('div.list-item a.item-title', (elements) =>
            elements.slice(0, 10).map((element) => element.textContent?.trim() ?? '')
        );

        expect(titles.length).toBeGreaterThan(0);

        for (const title of titles) {
            expect(title).toContain('EcoFlow');
        }
    });

    test('searches Deye products using page object', async () => {
        await priceComparisonPage.search('Deye');
        await priceComparisonPage.expectSearchResultsFor('Deye');
    });

    test('shows EcoFlow product links with brand slug', async () => {
        await priceComparisonPage.search('EcoFlow');
        await priceComparisonPage.expectResultLinksContain('ecoflow');
    });

    test('shows Deye product links with brand slug', async () => {
        await priceComparisonPage.search('Deye');
        await priceComparisonPage.expectResultLinksContain('deye');
    });
});
