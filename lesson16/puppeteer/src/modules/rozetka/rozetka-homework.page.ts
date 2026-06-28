import { readFileSync } from 'node:fs';
import { ElementHandle, Page } from 'puppeteer';
import { expect } from 'vitest';

export class RozetkaHomeworkPage {
    private readonly baseUrl = 'http://rozetka-homework15.local';
    private readonly fixtureHtml = readFileSync(new URL('../../../fixtures/rozetka/rozetka-homework15.html', import.meta.url), 'utf8');
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
    private routesInstalled = false;

    public constructor(private readonly page: Page) {}

    public async goToHome(): Promise<void> {
        await this.mockRozetkaPages();
        await this.page.goto(`${this.baseUrl}/ua/`, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector(this.searchInputSelector, { visible: true });
    }

    public async goToNotebooksCategory(): Promise<void> {
        await this.mockRozetkaPages();
        await this.page.goto(`${this.baseUrl}/ua/notebooks/c80004/`, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector(this.firstNotebookTileSelector, { visible: true });
        const title = await this.page.$eval('h1', (element) => element.textContent?.trim() ?? '');
        expect(title).toContain(this.notebooksTitle);
    }

    public async searchFromHeader(query: string): Promise<void> {
        await this.page.locator(this.searchInputSelector).fill(query);
        await this.page.locator(this.searchSubmitSelector).click();
        await this.page.waitForFunction(() => window.location.pathname.includes('/search/'));
    }

    public async expectSearchResultsPage(query: string): Promise<void> {
        const currentUrl = new URL(this.page.url());
        expect(currentUrl.pathname).toContain('/search/');
        expect(currentUrl.searchParams.get('text')).toBe(query);
        await this.page.waitForSelector(this.firstNotebookTileSelector);
        const searchValue = await this.page.$eval(this.searchInputSelector, (element) => (element as HTMLInputElement).value);
        expect(searchValue).toBe(query);
    }

    public async openComputersCatalogCategory(): Promise<void> {
        await this.page.locator(this.catalogButtonSelector).click();
        await this.page.locator(this.computersCategorySelector).click();
        await this.page.waitForFunction(() => window.location.pathname.includes('/ua/computers-notebooks/c80253/'));
    }

    public async expectComputersCategoryOpened(): Promise<void> {
        await this.page.waitForFunction(() => window.location.pathname.includes('/ua/computers-notebooks/c80253/'));
        const currentUrl = new URL(this.page.url());
        expect(currentUrl.pathname).toContain('/ua/computers-notebooks/c80253/');
    }

    public async addFirstNotebookToCart(): Promise<void> {
        const buyButton = await this.waitForElement(this.firstNotebookBuyButtonSelector);
        await buyButton.click();
    }

    public async openCart(): Promise<void> {
        await this.page.locator(this.headerCartButtonSelector).click();
        await this.page.waitForSelector(this.shoppingCartSelector, { visible: true });
    }

    public async expectCartHasProduct(): Promise<void> {
        await this.page.waitForSelector(this.cartItemSelector, { visible: true });
        await this.page.waitForSelector(this.cartProductBodySelector, { visible: true });
        const productTitle = await this.page.$eval(this.cartProductTitleSelector, (element) => element.textContent?.trim() ?? '');
        expect(productTitle.length).toBeGreaterThan(0);
    }

    public async removeFirstCartItem(): Promise<void> {
        await this.page.locator(this.cartProductActionsSelector).click();
        const deleteButtons = await this.page.$$(this.cartDeleteButtonSelector);

        for (const button of deleteButtons) {
            const text = await button.evaluate((element) => element.textContent?.trim() ?? '');

            if (text.includes(this.deleteLabel)) {
                await button.click();
                return;
            }
        }

        throw new Error('Delete button was not found in the cart actions menu.');
    }

    public async expectCartIsEmpty(): Promise<void> {
        await this.page.waitForSelector(this.emptyCartSelector, { visible: true });
        const emptyCartText = await this.page.$eval(this.emptyCartSelector, (element) => element.textContent?.trim() ?? '');
        expect(emptyCartText).toContain(this.emptyCartText);
    }

    private async waitForElement(selector: string): Promise<ElementHandle<Element>> {
        const element = await this.page.waitForSelector(selector, { visible: true });

        if (!element) {
            throw new Error(`Element "${selector}" was not found.`);
        }

        return element;
    }

    private async mockRozetkaPages(): Promise<void> {
        if (this.routesInstalled) {
            return;
        }

        this.routesInstalled = true;
        await this.page.setRequestInterception(true);
        this.page.on('request', (request) => {
            if (request.url().startsWith(this.baseUrl)) {
                request.respond({
                    status: 200,
                    contentType: 'text/html; charset=utf-8',
                    body: this.fixtureHtml
                });
                return;
            }

            request.continue();
        });
    }
}
