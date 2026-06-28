// cSpell:ignore autosuggest Deye EcoFlow hotline
import { Page } from 'puppeteer';
import { expect } from 'vitest';

export class PriceComparisonPage {
    private readonly pageUrl = 'https://hotline.ua/';
    private readonly searchInputSelector = '[aria-controls="autosuggest-autosuggest__results"]';
    private readonly resultTitleSelector = 'div.list-item a.item-title';

    public constructor(private readonly page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto(this.pageUrl, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector(this.searchInputSelector, { visible: true });
    }

    public async search(query: string): Promise<void> {
        await this.page.locator(this.searchInputSelector).fill(query);
        await this.page.keyboard.press('Enter');
        await this.page.waitForFunction(() => window.location.pathname.includes('/sr/'));
        await this.page.waitForSelector(this.resultTitleSelector, { visible: true });
    }

    public async expectSearchResultsFor(query: string): Promise<void> {
        const currentUrl = new URL(this.page.url());
        expect(currentUrl.pathname).toContain('/sr/');
        expect(currentUrl.searchParams.get('q')).toBe(query);

        await this.page.waitForSelector(this.resultTitleSelector, { visible: true });
        const titles = await this.page.$$eval(this.resultTitleSelector, (elements) =>
            elements.slice(0, 10).map((element) => element.textContent?.trim() ?? '')
        );

        expect(titles.length).toBeGreaterThan(0);

        for (const title of titles) {
            expect(title.toLowerCase()).toContain(query.toLowerCase());
        }
    }

    public async expectResultLinksContain(linkPart: string): Promise<void> {
        const expectedLinkPart = linkPart.toLowerCase();

        await this.page.waitForSelector(this.resultTitleSelector, { visible: true });
        const hrefs = await this.page.$$eval(this.resultTitleSelector, (links) =>
            links.slice(0, 10).map((link) => (link as HTMLAnchorElement).href.toLowerCase())
        );

        expect(hrefs.length).toBeGreaterThan(0);

        for (const href of hrefs) {
            expect(href).toContain(expectedLinkPart);
        }
    }
}
