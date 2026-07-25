import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { HotlineWorld } from '../world/hotline.world';

Given('I open the Hotline.ua homepage', async function (this: HotlineWorld) {
    await this.homePage.goto();
});

Then('the page title should mention {string}', async function (this: HotlineWorld, text: string) {
    const title = await this.page.title();
    expect(title.toLowerCase()).to.include(text.toLowerCase());
});

Then('the header logo should be visible', async function (this: HotlineWorld) {
    expect(await this.homePage.logo.isVisible()).to.be.true;
});

Then('the catalog button should be visible and contain text {string}', async function (this: HotlineWorld, text: string) {
    expect(await this.homePage.catalogMenu.button.isVisible()).to.be.true;
    const buttonText = await this.homePage.catalogMenu.button.textContent();
    expect(buttonText).to.include(text);
});

Then('the search input should be visible with placeholder {string}', async function (this: HotlineWorld, placeholder: string) {
    expect(await this.homePage.searchBox.input.isVisible()).to.be.true;
    const actualPlaceholder = await this.homePage.searchBox.input.getAttribute('placeholder');
    expect(actualPlaceholder).to.equal(placeholder);
});

Then('the city selector should show a non-empty city name', async function (this: HotlineWorld) {
    expect(await this.homePage.citySelector.isVisible()).to.be.true;
    const cityText = await this.homePage.citySelector.textContent();
    expect(cityText?.trim().length).to.be.greaterThan(0);
});

Then('the footer should be visible', async function (this: HotlineWorld) {
    expect(await this.homePage.footer.isVisible()).to.be.true;
});
