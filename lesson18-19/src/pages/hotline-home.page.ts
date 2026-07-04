import { Locator, Page } from '@playwright/test';

export class HotlineHomePage {
    private readonly _path = '/';

    public constructor(private readonly page: Page) {}

    public get logo(): Locator {
        return this.page.locator('.logo-container a');
    }

    public get catalogButton(): Locator {
        return this.page.locator('.header-catalog-button');
    }

    public get catalogMenu(): Locator {
        return this.page.locator('nav.menu-main');
    }

    private get catalogMenuSubstrate(): Locator {
        return this.page.locator('.menu-main__substrate');
    }

    public get catalogCategoryLinks(): Locator {
        return this.page.locator('.menu-main__list > li.menu-main__item > a.menu-main__item-link');
    }

    public get searchInput(): Locator {
        return this.page.locator('input[placeholder="Знайти товар, магазин, бренд"]');
    }

    public get autosuggestContainer(): Locator {
        return this.page.locator('#autosuggest-autosuggest__results');
    }

    public get autosuggestItems(): Locator {
        return this.page.locator('.autosuggest__results-item');
    }

    public get autosuggestShowAllResults(): Locator {
        return this.page.locator('.autosuggest__results-all');
    }

    public get citySelector(): Locator {
        return this.page.locator('.location__city');
    }

    public get footer(): Locator {
        return this.page.locator('footer');
    }

    public async goto(): Promise<void> {
        await this.page.goto(this._path, { waitUntil: 'domcontentloaded' });
        await this.logo.waitFor({ state: 'visible' });
    }

    public async openCatalogMenu(): Promise<void> {
        await this.catalogButton.click();
        await this.catalogMenu.waitFor({ state: 'visible' });
    }

    public async closeCatalogMenu(): Promise<void> {
        await this.catalogMenuSubstrate.click({ force: true });
    }

    public async getCatalogCategoryNames(): Promise<string[]> {
        const names = await this.catalogCategoryLinks.allTextContents();
        return names.map((name) => name.trim());
    }

    public async openCatalogCategory(categoryName: string): Promise<void> {
        await this.catalogCategoryLinks.filter({ hasText: categoryName }).first().click();
    }

    public async searchFor(query: string): Promise<void> {
        await this.searchInput.click();
        await this.searchInput.fill(query);
        await this.autosuggestContainer.waitFor({ state: 'visible' });
    }

    public async submitSearch(): Promise<void> {
        await this.autosuggestShowAllResults.click();
    }
}
