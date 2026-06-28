// cSpell:ignore autosuggest Deye EcoFlow hotline
import { expect } from 'chai';
import { $, $$, browser } from '@wdio/globals';
import { hotlineSelectors } from './hotline.selectors';

export class PriceComparisonPage {
    private readonly pageUrl = 'https://hotline.ua/';
    private readonly timeout = 30000;

    public async goTo(): Promise<void> {
        await browser.url(this.pageUrl);
        const searchInput = await $(hotlineSelectors.searchInput);

        await searchInput.waitForDisplayed({ timeout: this.timeout });
    }

    public async search(query: string): Promise<void> {
        const searchInput = await $(hotlineSelectors.searchInput);

        await searchInput.waitForDisplayed({ timeout: this.timeout });
        await searchInput.clearValue();
        await searchInput.setValue(query);
        await browser.keys('Enter');
        await this.waitForSearchResults();
    }

    public async expectSearchResultsFor(query: string): Promise<void> {
        const currentUrl = new URL(await browser.getUrl());

        expect(currentUrl.pathname).to.contain('/sr/');
        expect(currentUrl.searchParams.get('q')).to.equal(query);

        const titles = await this.getTopResultTitles();

        expect(titles.length).to.be.greaterThan(0);

        for (const title of titles) {
            expect(title.toLowerCase()).to.contain(query.toLowerCase());
        }
    }

    public async expectResultLinksContain(linkPart: string): Promise<void> {
        const expectedLinkPart = linkPart.toLowerCase();
        const hrefs = await this.getTopResultHrefs();

        expect(hrefs.length).to.be.greaterThan(0);

        for (const href of hrefs) {
            expect(href).to.contain(expectedLinkPart);
        }
    }

    public async getTopResultTitles(limit = 10): Promise<string[]> {
        await this.waitForSearchResults();

        const elements = await $$(hotlineSelectors.resultTitle).getElements();
        const titles: string[] = [];

        for (const element of elements.slice(0, limit)) {
            titles.push((await element.getText()).trim());
        }

        return titles;
    }

    public async waitForSearchResults(): Promise<void> {
        await browser.waitUntil(async () => (await browser.getUrl()).includes('/sr/'), {
            timeout: this.timeout,
            timeoutMsg: 'Expected Hotline search URL to contain /sr/.'
        });

        const firstResultTitle = await $(hotlineSelectors.resultTitle);
        await firstResultTitle.waitForDisplayed({ timeout: this.timeout });
    }

    private async getTopResultHrefs(limit = 10): Promise<string[]> {
        await this.waitForSearchResults();

        const links = await $$(hotlineSelectors.resultTitle).getElements();
        const hrefs: string[] = [];

        for (const link of links.slice(0, limit)) {
            hrefs.push(((await link.getAttribute('href')) ?? '').toLowerCase());
        }

        return hrefs;
    }
}
