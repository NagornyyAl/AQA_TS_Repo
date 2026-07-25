import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { HotlineWorld } from '../world/hotline.world';

When('I open the catalog menu', async function (this: HotlineWorld) {
    await this.homePage.catalogMenu.open();
});

Then('the catalog menu should contain more than {int} category', async function (this: HotlineWorld, minCount: number) {
    const names = await this.homePage.catalogMenu.getCategoryNames();
    expect(names.length).to.be.greaterThan(minCount);
});

Then('the catalog menu should contain category {string}', async function (this: HotlineWorld, category: string) {
    const names = await this.homePage.catalogMenu.getCategoryNames();
    expect(names).to.include(category);
});

When('I click category {string} in the catalog menu', async function (this: HotlineWorld, category: string) {
    await this.homePage.catalogMenu.openCategory(category);
});

Then('I should be navigated to a URL containing {string}', function (this: HotlineWorld, urlPart: string) {
    expect(this.page.url()).to.include(urlPart);
});

Then('the category page heading should not be empty', async function (this: HotlineWorld) {
    expect(await this.categoryPage.heading.isVisible()).to.be.true;
    const headingText = await this.categoryPage.heading.textContent();
    expect(headingText?.trim().length).to.be.greaterThan(0);
});

Then('the breadcrumbs should include {string}', async function (this: HotlineWorld, text: string) {
    const breadcrumbTexts = await this.categoryPage.breadcrumbs.getTexts();
    expect(breadcrumbTexts.some((breadcrumb) => breadcrumb.includes(text))).to.be.true;
});
