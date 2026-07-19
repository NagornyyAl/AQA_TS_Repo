import { Locator, Page } from 'playwright';

export class ProductListComponent {
    public constructor(private readonly page: Page) {}

    public get items(): Locator {
        return this.page.locator('.list-item');
    }

    public get itemTitles(): Locator {
        return this.page.locator('.item-title');
    }

    public async count(): Promise<number> {
        return this.items.count();
    }

    public async getTitleTexts(limit = 10): Promise<string[]> {
        const titles = await this.itemTitles.allTextContents();
        return titles.slice(0, limit).map((title) => title.trim());
    }
}
