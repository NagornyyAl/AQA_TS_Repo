// cSpell:ignore autosuggest Deye EcoFlow hotline
import { expect } from 'chai';
import { By, Key, WebDriver } from 'selenium-webdriver';
import { waitForVisible } from '../../support/browser';
import { hotlineSelectors } from './hotline.selectors';

export class PriceComparisonPage {
    private readonly pageUrl = 'https://hotline.ua/';
    private readonly timeout = 30000;

    public constructor(private readonly driver: WebDriver) {}

    public async goTo(): Promise<void> {
        await this.driver.get(this.pageUrl);
        await waitForVisible(this.driver, By.css(hotlineSelectors.searchInput), this.timeout);
    }

    public async search(query: string): Promise<void> {
        const searchInput = await waitForVisible(this.driver, By.css(hotlineSelectors.searchInput), this.timeout);

        await searchInput.clear();
        await searchInput.sendKeys(query, Key.ENTER);
        await this.waitForSearchResults();
    }

    public async expectSearchResultsFor(query: string): Promise<void> {
        const currentUrl = new URL(await this.driver.getCurrentUrl());

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
        await waitForVisible(this.driver, By.css(hotlineSelectors.resultTitle), this.timeout);

        const elements = await this.driver.findElements(By.css(hotlineSelectors.resultTitle));
        const titles: string[] = [];

        for (const element of elements.slice(0, limit)) {
            titles.push((await element.getText()).trim());
        }

        return titles;
    }

    public async waitForSearchResults(): Promise<void> {
        await this.driver.wait(async () => (await this.driver.getCurrentUrl()).includes('/sr/'), this.timeout);
        await waitForVisible(this.driver, By.css(hotlineSelectors.resultTitle), this.timeout);
    }

    private async getTopResultHrefs(limit = 10): Promise<string[]> {
        await waitForVisible(this.driver, By.css(hotlineSelectors.resultTitle), this.timeout);

        const links = await this.driver.findElements(By.css(hotlineSelectors.resultTitle));
        const hrefs: string[] = [];

        for (const link of links.slice(0, limit)) {
            hrefs.push(((await link.getAttribute('href')) ?? '').toLowerCase());
        }

        return hrefs;
    }
}
