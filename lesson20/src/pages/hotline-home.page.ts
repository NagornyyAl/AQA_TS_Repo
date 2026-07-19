import { Locator, Page } from 'playwright';
import { CatalogMenuComponent, SearchBoxComponent } from './components';

export class HotlineHomePage {
    private readonly _path = 'https://hotline.ua/';

    public readonly catalogMenu: CatalogMenuComponent;
    public readonly searchBox: SearchBoxComponent;

    public constructor(private readonly page: Page) {
        this.catalogMenu = new CatalogMenuComponent(page);
        this.searchBox = new SearchBoxComponent(page);
    }

    public get logo(): Locator {
        return this.page.locator('.logo-container a');
    }

    public get citySelector(): Locator {
        return this.page.locator('.location__city');
    }

    public get footer(): Locator {
        return this.page.locator('footer');
    }

    public async goto(): Promise<void> {
        await this.page.goto(this._path, { waitUntil: 'domcontentloaded' });
        await this.logo.waitFor({ state: 'visible' });
    }
}
