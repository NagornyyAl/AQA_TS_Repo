import type { Locator, Page, Response } from '@playwright/test';
import type { ProductSort } from '../../api/toolshop-api.client.js';

export interface CategoryFilterResult {
    response: Response;
    categoryId: string;
}

export class CatalogFiltersComponent {
    public readonly searchInput: Locator;
    public readonly searchButton: Locator;
    public readonly sortSelect: Locator;

    public constructor(
        private readonly page: Page,
        private readonly uiApiBaseUrl: string
    ) {
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.sortSelect = page.getByTestId('sort');
    }

    public category(categoryName: string): Locator {
        return this.page.getByRole('checkbox', { name: categoryName, exact: true });
    }

    public async search(query: string): Promise<Response> {
        const responsePromise = this.waitForApiResponse('/products/search', (body) => body.q === query);
        await this.searchInput.fill(query);
        await this.searchButton.click();
        return responsePromise;
    }

    public async sortBy(sort: ProductSort): Promise<Response> {
        const responsePromise = this.waitForApiResponse('/products', (body) => body.sort === sort);
        await this.sortSelect.selectOption(sort);
        return responsePromise;
    }

    public async filterByCategory(categoryName: string): Promise<CategoryFilterResult> {
        const category = this.category(categoryName);
        const categoryId = await category.getAttribute('value');
        if (categoryId === null) throw new Error(`Category "${categoryName}" does not expose an id`);

        const responsePromise = this.waitForApiResponse('/products', (body) => body.by_category === categoryId);
        await category.check();
        return { response: await responsePromise, categoryId };
    }

    private waitForApiResponse(pathname: string, bodyMatches: (body: Record<string, unknown>) => boolean): Promise<Response> {
        return this.page.waitForResponse((response) => {
            const url = new URL(response.url());
            if (url.origin !== this.uiApiBaseUrl || url.pathname !== pathname || response.request().method() !== 'QUERY') return false;
            const body = response.request().postDataJSON() as Record<string, unknown> | null;
            return body !== null && bodyMatches(body);
        });
    }
}
