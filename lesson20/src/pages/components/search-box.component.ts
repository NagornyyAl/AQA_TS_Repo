import { Locator, Page } from 'playwright';

export class SearchBoxComponent {
    public constructor(private readonly page: Page) {}

    public get input(): Locator {
        return this.page.locator('input[placeholder="Знайти товар, магазин, бренд"]');
    }

    public get autosuggestContainer(): Locator {
        return this.page.locator('#autosuggest-autosuggest__results');
    }

    public get autosuggestItems(): Locator {
        return this.page.locator('.autosuggest__results-item');
    }

    public get showAllResultsLink(): Locator {
        return this.page.locator('.autosuggest__results-all');
    }

    public async typeQuery(query: string): Promise<void> {
        await this.input.click();
        await this.input.fill(query);
        await this.autosuggestContainer.waitFor({ state: 'visible' });
    }

    public async getSuggestionTexts(): Promise<string[]> {
        return this.autosuggestItems.allTextContents();
    }

    public async submit(): Promise<void> {
        await this.showAllResultsLink.click();
    }
}
