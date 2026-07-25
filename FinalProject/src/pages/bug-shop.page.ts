import type { Locator, Page } from '@playwright/test';

export class BugShopPage {
    public readonly homeLink: Locator;
    public readonly quantityInput: Locator;
    public readonly increaseQuantityButton: Locator;

    public constructor(
        private readonly page: Page,
        private readonly baseUrl: string
    ) {
        this.homeLink = page.locator('[data-test="nav-home"]');
        this.quantityInput = page.locator('[data-test="quantity"]');
        this.increaseQuantityButton = page.locator('[data-test="increase-quantity"]');
    }

    public async openHome(): Promise<void> {
        await this.page.goto(`${this.baseUrl}/#/`, { waitUntil: 'domcontentloaded' });
        await this.homeLink.waitFor({ state: 'visible' });
    }

    public async openProduct(productId: number): Promise<void> {
        await this.page.goto(`${this.baseUrl}/#/product/${productId}`, { waitUntil: 'domcontentloaded' });
        await this.quantityInput.waitFor({ state: 'visible' });
    }
}
