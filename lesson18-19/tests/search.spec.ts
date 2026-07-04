import { expect, test } from '../src/fixtures';

const query = 'iphone 15';

test.describe('Hotline.ua - Search', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('should show relevant autosuggest hints while typing a search query', async ({ homePage }) => {
        await test.step('Type a search query into the search input', async () => {
            await homePage.searchBox.typeQuery(query);
        });

        await test.step('Verify the autosuggest dropdown becomes visible', async () => {
            await expect(homePage.searchBox.autosuggestContainer).toBeVisible();
        });

        await test.step('Verify autosuggest returns at least one suggestion', async () => {
            const suggestionsCount = await homePage.searchBox.autosuggestItems.count();
            expect(suggestionsCount).toBeGreaterThan(0);
        });

        await test.step('Verify at least one suggestion is relevant to the query', async () => {
            const suggestionTexts = await homePage.searchBox.getSuggestionTexts();
            const hasRelevantSuggestion = suggestionTexts.some((text) => /iphone/i.test(text));
            expect(hasRelevantSuggestion).toBe(true);
        });

        await test.step('Verify "show all results" option is visible', async () => {
            await expect(homePage.searchBox.showAllResultsLink).toBeVisible();
            await expect(homePage.searchBox.showAllResultsLink).toContainText(query);
        });
    });

    test('should navigate to search results page with matching products', async ({ page, homePage, searchResultsPage }) => {
        await test.step('Type a search query and open the autosuggest dropdown', async () => {
            await homePage.searchBox.typeQuery(query);
        });

        await test.step('Submit the search via "show all results"', async () => {
            await homePage.searchBox.submit();
        });

        await test.step('Verify navigation to the search results page with the query param', async () => {
            await expect(page).toHaveURL(/\/ua\/sr\/\?q=/);
        });

        await test.step('Verify the results title mentions the search query', async () => {
            await expect(searchResultsPage.resultsTitle).toBeVisible();
            await expect(searchResultsPage.resultsTitle).toContainText(query);
        });

        await test.step('Verify at least one product result is displayed', async () => {
            const itemsCount = await searchResultsPage.productList.count();
            expect(itemsCount).toBeGreaterThan(0);
        });

        await test.step('Verify result item titles are relevant to the query', async () => {
            const titles = await searchResultsPage.productList.getTitleTexts();
            expect(titles.length).toBeGreaterThan(0);
            expect(titles.some((title) => /iphone/i.test(title))).toBe(true);
        });
    });
});
