// cSpell:ignore Deye EcoFlow hotline
import { expect } from 'chai';
import { $, browser } from '@wdio/globals';
import { PriceComparisonPage } from '../pageobjects/price-comparison.page';
import { hotlineSelectors } from '../pageobjects/hotline.selectors';

describe('Live hotline.ua search scenarios with WebDriverIO', () => {
    let priceComparisonPage: PriceComparisonPage;

    beforeEach(async () => {
        await browser.setWindowSize(1440, 900);
        priceComparisonPage = new PriceComparisonPage();
        await priceComparisonPage.goTo();
    });

    it('searches EcoFlow products with WebDriverIO commands', async () => {
        const searchInput = await $(hotlineSelectors.searchInput);

        await searchInput.setValue('EcoFlow');
        await browser.keys('Enter');
        await priceComparisonPage.waitForSearchResults();

        const titles = await priceComparisonPage.getTopResultTitles();

        expect(titles.length).to.be.greaterThan(0);

        for (const title of titles) {
            expect(title).to.contain('EcoFlow');
        }
    });

    it('searches Deye products using page object', async () => {
        await priceComparisonPage.search('Deye');
        await priceComparisonPage.expectSearchResultsFor('Deye');
    });

    it('shows EcoFlow product links with brand slug', async () => {
        await priceComparisonPage.search('EcoFlow');
        await priceComparisonPage.expectResultLinksContain('ecoflow');
    });

    it('shows Deye product links with brand slug', async () => {
        await priceComparisonPage.search('Deye');
        await priceComparisonPage.expectResultLinksContain('deye');
    });
});
