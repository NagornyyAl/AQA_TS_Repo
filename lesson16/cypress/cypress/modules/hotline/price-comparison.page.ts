// cSpell:ignore autosuggest Deye EcoFlow hotline
export class PriceComparisonPage {
    private readonly pageUrl = 'https://hotline.ua/';
    private readonly searchInputSelector = '[aria-controls="autosuggest-autosuggest__results"]';
    private readonly resultTitleSelector = 'div.list-item a.item-title';

    public goTo(): void {
        cy.visit(this.pageUrl);
        this.getSearchInput().should('be.visible');
    }

    public search(query: string): void {
        this.getSearchInput().clear().type(`${query}{enter}`);
    }

    public expectSearchResultsFor(query: string): void {
        cy.location('pathname', { timeout: 20000 }).should('include', '/sr/');
        cy.location('search').should('include', `q=${query}`);
        cy.title().should('contain', query);
        cy.get(this.resultTitleSelector, { timeout: 20000 })
            .should('have.length.greaterThan', 0)
            .then(($titles) => {
                const visibleTitles = [...$titles]
                    .slice(0, 10)
                    .map((element) => element.textContent?.trim() ?? '');

                expect(visibleTitles.length).to.be.greaterThan(0);

                for (const title of visibleTitles) {
                    expect(title.toLowerCase()).to.contain(query.toLowerCase());
                }
            });
    }

    public expectResultLinksContain(linkPart: string): void {
        const expectedLinkPart = linkPart.toLowerCase();

        cy.get(this.resultTitleSelector, { timeout: 20000 })
            .should('have.length.greaterThan', 0)
            .then(($links) => {
                const hrefs = [...$links]
                    .slice(0, 10)
                    .map((element) => (element as HTMLAnchorElement).href.toLowerCase());

                expect(hrefs.length).to.be.greaterThan(0);

                for (const href of hrefs) {
                    expect(href).to.contain(expectedLinkPart);
                }
            });
    }

    private getSearchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.searchInputSelector, { timeout: 20000 });
    }
}
