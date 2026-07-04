import { Locator, Page } from '@playwright/test';

export class HotlineSearchResultsPage {
    public constructor(private readonly page: Page) {}

    public get resultsTitle(): Locator {
        return this.page.locator('.search__title');
    }

    public get resultItems(): Locator {
        return this.page.locator('.list-item');
    }

    public get resultItemTitles(): Locator {
        return this.page.locator('.item-title');
    }

    public async getResultItemTitleTexts(limit = 10): Promise<string[]> {
        const titles = await this.resultItemTitles.allTextContents();
        return titles.slice(0, limit).map((title) => title.trim());
    }
}
