import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { HotlineWorld } from '../world/hotline.world';

When('I type {string} into the search input', async function (this: HotlineWorld, query: string) {
    await this.homePage.searchBox.typeQuery(query);
});

Then('the autosuggest dropdown should be visible', async function (this: HotlineWorld) {
    expect(await this.homePage.searchBox.autosuggestContainer.isVisible()).to.be.true;
});

Then('the autosuggest should contain at least {int} suggestion', async function (this: HotlineWorld, minCount: number) {
    const count = await this.homePage.searchBox.autosuggestItems.count();
    expect(count).to.be.at.least(minCount);
});

Then('at least one suggestion should be relevant to {string}', async function (this: HotlineWorld, keyword: string) {
    const suggestionTexts = await this.homePage.searchBox.getSuggestionTexts();
    const hasRelevant = suggestionTexts.some((text) => text.toLowerCase().includes(keyword.toLowerCase()));
    expect(hasRelevant).to.be.true;
});

Then('the "show all results" link should contain {string}', async function (this: HotlineWorld, text: string) {
    const linkText = await this.homePage.searchBox.showAllResultsLink.textContent();
    expect(linkText).to.include(text);
});

When('I submit the search', async function (this: HotlineWorld) {
    await this.homePage.searchBox.submit();
    await this.page.waitForURL(/\/ua\/sr\/\?q=/);
});

Then('I should be navigated to the search results page', function (this: HotlineWorld) {
    expect(this.page.url()).to.match(/\/ua\/sr\/\?q=/);
});

Then('the results title should contain {string}', async function (this: HotlineWorld, text: string) {
    await this.searchResultsPage.resultsTitle.waitFor({ state: 'visible' });
    const titleText = await this.searchResultsPage.resultsTitle.textContent();
    expect(titleText).to.include(text);
});

Then('at least one product result should be displayed', async function (this: HotlineWorld) {
    const count = await this.searchResultsPage.productList.count();
    expect(count).to.be.greaterThan(0);
});

Then('at least one result title should be relevant to {string}', async function (this: HotlineWorld, keyword: string) {
    const titles = await this.searchResultsPage.productList.getTitleTexts();
    expect(titles.length).to.be.greaterThan(0);
    expect(titles.some((title) => title.toLowerCase().includes(keyword.toLowerCase()))).to.be.true;
});
