import { RozetkaHomeworkPage } from '../../modules/rozetka/rozetka-homework.page';

describe('Rozetka homework 15 scenarios', () => {
    const notebookQuery = '\u043d\u043e\u0443\u0442\u0431\u0443\u043a';
    let rozetkaPage: RozetkaHomeworkPage;

    beforeEach(() => {
        rozetkaPage = new RozetkaHomeworkPage();
        cy.viewport(1440, 900);
    });

    it('TC-1 searches for notebooks from the header', () => {
        rozetkaPage.visitHome();
        rozetkaPage.searchFromHeader(notebookQuery);
        rozetkaPage.expectSearchResultsPage(notebookQuery);
    });

    it('TC-2 opens computers category from catalog', () => {
        rozetkaPage.visitHome();
        rozetkaPage.openComputersCatalogCategory();
        rozetkaPage.expectComputersCategoryOpened();
    });

    it('TC-3 adds the first notebook to cart', () => {
        rozetkaPage.visitNotebooksCategory();
        rozetkaPage.addFirstNotebookToCart();
        rozetkaPage.openCart();
        rozetkaPage.expectCartHasProduct();
    });

    it('TC-4 removes the first notebook from cart', () => {
        rozetkaPage.visitNotebooksCategory();
        rozetkaPage.addFirstNotebookToCart();
        rozetkaPage.openCart();
        rozetkaPage.expectCartHasProduct();
        rozetkaPage.removeFirstCartItem();
        rozetkaPage.expectCartIsEmpty();
    });
});
