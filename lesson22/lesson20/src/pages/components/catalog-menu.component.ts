import { Locator, Page } from 'playwright';

export class CatalogMenuComponent {
    public constructor(private readonly page: Page) {}

    public get button(): Locator {
        return this.page.locator('.header-catalog-button');
    }

    public get menu(): Locator {
        return this.page.locator('nav.menu-main');
    }

    public get categoryLinks(): Locator {
        return this.page.locator('.menu-main__list > li.menu-main__item > a.menu-main__item-link');
    }

    public async open(): Promise<void> {
        await this.button.click();
        await this.menu.waitFor({ state: 'visible' });
    }

    public async getCategoryNames(): Promise<string[]> {
        const names = await this.categoryLinks.allTextContents();
        return names.map((name) => name.trim());
    }

    public async openCategory(categoryName: string): Promise<void> {
        await this.categoryLinks.filter({ hasText: categoryName }).first().click();
    }
}
