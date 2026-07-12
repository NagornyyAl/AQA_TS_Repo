import { Locator, Page } from 'playwright';

export class BreadcrumbsComponent {
    public constructor(private readonly page: Page) {}

    public get items(): Locator {
        return this.page.locator('.breadcrumbs__item');
    }

    public async getTexts(): Promise<string[]> {
        const texts = await this.items.allTextContents();
        return texts.map((text) => text.trim()).filter((text) => text.length > 0);
    }
}
