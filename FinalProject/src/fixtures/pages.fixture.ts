import { CatalogPage } from '../pages/catalog.page.js';
import { ProductPage } from '../pages/product.page.js';
import { test as base } from './api.fixture.js';

export interface PageFixtures {
    catalogPage: CatalogPage;
    productPage: ProductPage;
}

export const test = base.extend<PageFixtures>({
    catalogPage: async ({ page, frameworkConfig }, use) => {
        await use(new CatalogPage(page, frameworkConfig.uiApiBaseUrl));
    },
    productPage: async ({ page, frameworkConfig }, use) => {
        await use(new ProductPage(page, frameworkConfig.uiApiBaseUrl));
    }
});
