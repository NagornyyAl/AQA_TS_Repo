export class RozetkaHomeworkPage {
    private readonly baseUrl = 'http://rozetka-homework15.local';
    private readonly notebooksTitle = '\u041d\u043e\u0443\u0442\u0431\u0443\u043a\u0438';
    private readonly buyLabel = '\u041a\u0443\u043f\u0438\u0442\u0438';
    private readonly deleteLabel = '\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438';
    private readonly emptyCartText = '\u041a\u043e\u0448\u0438\u043a \u043f\u043e\u0440\u043e\u0436\u043d\u0456\u0439';
    private readonly searchInputSelector = 'input[data-testid="search-suggest-input"]';
    private readonly searchSubmitSelector = 'button[data-testid="search-suggest-submit"]';
    private readonly catalogButtonSelector = 'button[data-testid="fat_menu_btn"]';
    private readonly computersCategorySelector = 'a[data-testid="fat_menu_category_link"][href*="/ua/computers-notebooks/c80253/"]';
    private readonly firstNotebookTileSelector = 'rz-catalog-tile:first-of-type';
    private readonly firstNotebookBuyButtonSelector = `rz-catalog-tile:first-of-type button[aria-label="${this.buyLabel}"]`;
    private readonly headerCartButtonSelector = 'button[data-testid="header-cart-btn"]';
    private readonly shoppingCartSelector = 'rz-shopping-cart';
    private readonly cartItemSelector = 'li.cart-list__item';
    private readonly cartProductBodySelector = 'div.cart-product__body';
    private readonly cartProductTitleSelector = 'span.cart-product__title';
    private readonly cartProductActionsSelector = 'button#cartProductActions0';
    private readonly cartDeleteButtonSelector = 'div.menu-list-wrap#cartProductActions0 button.button--link';
    private readonly emptyCartSelector = 'div[data-testid="empty-cart"]';

    public visitHome(): void {
        this.mockRozetkaPages();
        cy.visit(`${this.baseUrl}/ua/`);
        this.getSearchInput().should('be.visible');
    }

    public visitNotebooksCategory(): void {
        this.mockRozetkaPages();
        cy.visit(`${this.baseUrl}/ua/notebooks/c80004/`);
        cy.get('h1').should('contain.text', this.notebooksTitle);
        cy.get(this.firstNotebookTileSelector).should('be.visible');
    }

    public searchFromHeader(query: string): void {
        this.getSearchInput().clear().type(query);
        cy.get(this.searchSubmitSelector).should('be.enabled').click();
    }

    public expectSearchResultsPage(query: string): void {
        cy.location('pathname', { timeout: 20000 }).should('include', '/search/');
        cy.location('search').should('include', `text=${encodeURIComponent(query)}`);
        this.getSearchInput().should('have.value', query);
        cy.get(this.firstNotebookTileSelector).should('exist');
    }

    public openComputersCatalogCategory(): void {
        cy.get(this.catalogButtonSelector).should('be.enabled').click();
        cy.get(this.computersCategorySelector).should('be.visible').click();
    }

    public expectComputersCategoryOpened(): void {
        cy.location('pathname', { timeout: 20000 }).should('include', '/ua/computers-notebooks/c80253/');
    }

    public addFirstNotebookToCart(): void {
        cy.get(this.firstNotebookBuyButtonSelector)
            .scrollIntoView()
            .should('be.visible')
            .and('be.enabled')
            .click();
    }

    public openCart(): void {
        cy.get(this.headerCartButtonSelector).should('be.visible').click();
        cy.get(this.shoppingCartSelector).should('be.visible');
    }

    public expectCartHasProduct(): void {
        cy.get(this.cartItemSelector).should('be.visible');
        cy.get(this.cartProductBodySelector).first().should('be.visible');
        cy.get(this.cartProductTitleSelector).first().invoke('text').should('not.be.empty');
    }

    public removeFirstCartItem(): void {
        cy.get(this.cartProductActionsSelector).should('be.visible').click();
        cy.get(this.cartDeleteButtonSelector).contains(this.deleteLabel).should('be.visible').click();
    }

    public expectCartIsEmpty(): void {
        cy.get(this.emptyCartSelector).should('be.visible').and('contain.text', this.emptyCartText);
    }

    private getSearchInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
        return cy.get<HTMLInputElement>(this.searchInputSelector);
    }

    private mockRozetkaPages(): void {
        cy.intercept('GET', `${this.baseUrl}/ua/**`, {
            fixture: 'rozetka/rozetka-homework15.html',
            headers: {
                'content-type': 'text/html; charset=utf-8'
            }
        });
    }
}
