import { test, expect } from '@playwright/test';
import { HotlineHomePage, HotlineSearchResultsPage } from '../src/pages';

test.describe('Hotline.ua - Search', () => {
    let homePage: HotlineHomePage;
    const query = 'iphone 15';

    test.beforeEach(async ({ page }) => {
        homePage = new HotlineHomePage(page);
        await homePage.goto();
    });

    test('should show relevant autosuggest hints while typing a search query', async () => {
        await test.step('Type a search query into the search input', async () => {
            await homePage.searchFor(query);
        });

        await test.step('Verify the autosuggest dropdown becomes visible', async () => {
            await expect(homePage.autosuggestContainer).toBeVisible();
        });

        await test.step('Verify autosuggest returns at least one suggestion', async () => {
            const suggestionsCount = await homePage.autosuggestItems.count();
            expect(suggestionsCount).toBeGreaterThan(0);
        });

        await test.step('Verify at least one suggestion is relevant to the query', async () => {
            const suggestionTexts = await homePage.autosuggestItems.allTextContents();
            const hasRelevantSuggestion = suggestionTexts.some((text) => /iphone/i.test(text));
            expect(hasRelevantSuggestion).toBe(true);
        });

        await test.step('Verify "show all results" option is visible', async () => {
            await expect(homePage.autosuggestShowAllResults).toBeVisible();
            await expect(homePage.autosuggestShowAllResults).toContainText(query);
        });
    });

    test('should navigate to search results page with matching products', async ({ page }) => {
        const searchResultsPage = new HotlineSearchResultsPage(page);

        await test.step('Type a search query and open the autosuggest dropdown', async () => {
            await homePage.searchFor(query);
        });

        await test.step('Submit the search via "show all results"', async () => {
            await homePage.submitSearch();
        });

        await test.step('Verify navigation to the search results page with the query param', async () => {
            await expect(page).toHaveURL(/\/ua\/sr\/\?q=/);
        });

        await test.step('Verify the results title mentions the search query', async () => {
            await expect(searchResultsPage.resultsTitle).toBeVisible();
            await expect(searchResultsPage.resultsTitle).toContainText('iphone 15');
        });

        await test.step('Verify at least one product result is displayed', async () => {
            const itemsCount = await searchResultsPage.resultItems.count();
            expect(itemsCount).toBeGreaterThan(0);
        });

        await test.step('Verify result item titles are relevant to the query', async () => {
            const titles = await searchResultsPage.getResultItemTitleTexts();
            expect(titles.length).toBeGreaterThan(0);
            expect(titles.some((title) => /iphone/i.test(title))).toBe(true);
        });
    });
});
