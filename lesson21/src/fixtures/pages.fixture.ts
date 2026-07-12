import { test as base } from '@playwright/test';
import { HotlineHomePage, HotlineCategoryPage, HotlineSearchResultsPage } from '../pages';

export interface PagesFixture {
    homePage: HotlineHomePage;
    categoryPage: HotlineCategoryPage;
    searchResultsPage: HotlineSearchResultsPage;
}

export const test = base.extend<PagesFixture>({
    homePage: async ({ page }, use) => {
        const homePage = new HotlineHomePage(page);
        await use(homePage);
    },
    categoryPage: async ({ page }, use) => {
        const categoryPage = new HotlineCategoryPage(page);
        await use(categoryPage);
    },
    searchResultsPage: async ({ page }, use) => {
        const searchResultsPage = new HotlineSearchResultsPage(page);
        await use(searchResultsPage);
    }
});
