import { Locator, Page } from 'playwright';
import { ProductListComponent } from './components';

export class HotlineSearchResultsPage {
    public readonly productList: ProductListComponent;

    public constructor(private readonly page: Page) {
        this.productList = new ProductListComponent(page);
    }

    public get resultsTitle(): Locator {
        return this.page.locator('.search__title');
    }
}
