import { Locator, Page } from '@playwright/test';
import { BreadcrumbsComponent } from './components';

export class HotlineCategoryPage {
    public readonly breadcrumbs: BreadcrumbsComponent;

    public constructor(private readonly page: Page) {
        this.breadcrumbs = new BreadcrumbsComponent(page);
    }

    public get heading(): Locator {
        return this.page.locator('h1').first();
    }
}
