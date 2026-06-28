// cSpell:ignore Deye EcoFlow hotline
import { expect } from 'chai';
import { By, Key, WebDriver } from 'selenium-webdriver';
import { PriceComparisonPage } from '../../src/modules/hotline/price-comparison.page';
import { hotlineSelectors } from '../../src/modules/hotline/hotline.selectors';
import { closeDriver, createDriver, waitForVisible } from '../../src/support/browser';

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

    it('searches EcoFlow products with Selenium WebDriver commands', async () => {
        const searchInput = await waitForVisible(driver, By.css(hotlineSelectors.searchInput));

        await searchInput.sendKeys('EcoFlow', Key.ENTER);
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
