// cSpell:ignore Deye EcoFlow hotline
import { PriceComparisonPage } from '../../modules/hotline/price-comparison.page';

describe('Live hotline.ua search scenarios', () => {
    let priceComparisonPage: PriceComparisonPage;

    beforeEach(() => {
        cy.viewport(1440, 900);
        priceComparisonPage = new PriceComparisonPage();
        priceComparisonPage.goTo();
    });

    it('searches EcoFlow products with Cypress commands', () => {
        cy.get('[aria-controls="autosuggest-autosuggest__results"]').type('EcoFlow{enter}');
        cy.location('pathname', { timeout: 20000 }).should('include', '/sr/');
        cy.get('div.list-item a.item-title', { timeout: 20000 }).first().should('contain.text', 'EcoFlow');
        cy.get('div.list-item a.item-title').each(($element, index) => {
            if (index < 10) {
                cy.wrap($element).should('contain.text', 'EcoFlow');
            }
        });
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
