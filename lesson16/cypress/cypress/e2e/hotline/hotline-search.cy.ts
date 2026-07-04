// cSpell:ignore Deye EcoFlow hotline
import { PriceComparisonPage } from '../../modules/hotline/price-comparison.page';

describe('Live hotline.ua search scenarios', () => {
    let priceComparisonPage: PriceComparisonPage;

    beforeEach(() => {
        cy.viewport(1440, 900);
        priceComparisonPage = new PriceComparisonPage();
        priceComparisonPage.goTo();
    });

    it('searches EcoFlow products using page object', () => {
        priceComparisonPage.search('EcoFlow');
        priceComparisonPage.expectSearchResultsFor('EcoFlow');
    });

    it('searches Deye products using page object', () => {
        priceComparisonPage.search('Deye');
        priceComparisonPage.expectSearchResultsFor('Deye');
    });

    it('shows EcoFlow product links with brand slug', () => {
        priceComparisonPage.search('EcoFlow');
        priceComparisonPage.expectResultLinksContain('ecoflow');
    });

    it('shows Deye product links with brand slug', () => {
        priceComparisonPage.search('Deye');
        priceComparisonPage.expectResultLinksContain('deye');
    });
});
