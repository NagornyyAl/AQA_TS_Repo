import { Locator, Page } from '@playwright/test';

export class HotlineCategoryPage {
    public constructor(private readonly page: Page) {}

    public get heading(): Locator {
        return this.page.locator('h1').first();
    }

    public get breadcrumbItems(): Locator {
        return this.page.locator('.breadcrumbs__item');
    }

    public async getBreadcrumbTexts(): Promise<string[]> {
        const texts = await this.breadcrumbItems.allTextContents();
        return texts.map((text) => text.trim()).filter((text) => text.length > 0);
    }
}
