// cSpell:ignore Deye EcoFlow hotline
import { WebDriver } from 'selenium-webdriver';
import { PriceComparisonPage } from '../../src/modules/hotline/price-comparison.page';
import { closeDriver, createDriver } from '../../src/support/browser';

describe('Live hotline.ua search scenarios with Selenium WebDriver', function () {
    this.timeout(90000);

    let driver: WebDriver;
    let priceComparisonPage: PriceComparisonPage;

    beforeEach(async () => {
        driver = await createDriver();
        priceComparisonPage = new PriceComparisonPage(driver);
        await priceComparisonPage.goTo();
    });

    afterEach(async () => {
        await closeDriver(driver);
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
