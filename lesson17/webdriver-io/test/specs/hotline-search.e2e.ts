// cSpell:ignore Deye EcoFlow hotline
import { browser } from '@wdio/globals';
import { PriceComparisonPage } from '../pageobjects/price-comparison.page';

describe('Live hotline.ua search scenarios with WebDriverIO', () => {
    let priceComparisonPage: PriceComparisonPage;

    beforeEach(async () => {
        await browser.setWindowSize(1440, 900);
        priceComparisonPage = new PriceComparisonPage();
        await priceComparisonPage.goTo();
    });

    it('searches EcoFlow products using page object', async () => {
        await priceComparisonPage.search('EcoFlow');
        await priceComparisonPage.expectSearchResultsFor('EcoFlow');
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
