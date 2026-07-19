import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { HotlineCategoryPage, HotlineHomePage, HotlineSearchResultsPage } from '../pages';

export class HotlineWorld extends World {
    public static browser: Browser;
    public browserContext!: BrowserContext;
    public page!: Page;
    public scenarioContext: Map<string, unknown> = new Map<string, unknown>();

    private _homePage!: HotlineHomePage;
    private _categoryPage!: HotlineCategoryPage;
    private _searchResultsPage!: HotlineSearchResultsPage;

    public constructor(options: IWorldOptions) {
        super(options);
    }

    public get homePage(): HotlineHomePage {
        if (!this._homePage) {
            this._homePage = new HotlineHomePage(this.page);
        }
        return this._homePage;
    }

    public get categoryPage(): HotlineCategoryPage {
        if (!this._categoryPage) {
            this._categoryPage = new HotlineCategoryPage(this.page);
        }
        return this._categoryPage;
    }

    public get searchResultsPage(): HotlineSearchResultsPage {
        if (!this._searchResultsPage) {
            this._searchResultsPage = new HotlineSearchResultsPage(this.page);
        }
        return this._searchResultsPage;
    }
}
