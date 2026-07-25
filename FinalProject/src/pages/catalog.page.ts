import type { Locator, Page, Response } from '@playwright/test';
import { CatalogFiltersComponent } from './components/catalog-filters.component.js';

export interface RenderedProductCard {
    id: string;
    name: string;
    price: number;
}

export class CatalogPage {
    public readonly homeLink: Locator;
    public readonly categoryMenu: Locator;
    public readonly contactLink: Locator;
    public readonly productCards: Locator;
    public readonly filters: CatalogFiltersComponent;

    public constructor(
        private readonly page: Page,
        private readonly uiApiBaseUrl: string
    ) {
        this.homeLink = page.getByTestId('nav-home');
        this.categoryMenu = page.getByTestId('nav-categories');
        this.contactLink = page.getByTestId('nav-contact');
        this.productCards = page.locator('a[data-test^="product-"]');
        this.filters = new CatalogFiltersComponent(page, uiApiBaseUrl);
    }

    public async open(): Promise<Response> {
        const productsResponse = this.waitForStorefrontResponse('/products', 'QUERY');
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        await this.productCards.first().waitFor({ state: 'visible' });
        return productsResponse;
    }

    public productCard(productId: string): Locator {
        return this.page.getByTestId(`product-${productId}`);
    }

    public async getFirstProductId(): Promise<string> {
        const testId = await this.productCards.first().getAttribute('data-test');
        const productId = testId?.replace('product-', '');
        if (productId === undefined || productId.length === 0) {
            throw new Error('The first catalogue card does not expose a product id');
        }
        return productId;
    }

    public async getRenderedProducts(): Promise<RenderedProductCard[]> {
        const cards = await this.productCards.all();
        return Promise.all(
            cards.map(async (card) => {
                const testId = await card.getAttribute('data-test');
                const priceText = await card.getByTestId('product-price').innerText();
                return {
                    id: testId?.replace('product-', '') ?? '',
                    name: (await card.getByTestId('product-name').innerText()).trim(),
                    price: Number(priceText.replace(/[^0-9.]/g, ''))
                };
            })
        );
    }

    private waitForStorefrontResponse(pathname: string, method: string): Promise<Response> {
        return this.page.waitForResponse((response) => {
            const url = new URL(response.url());
            return url.origin === this.uiApiBaseUrl && url.pathname === pathname && response.request().method() === method;
        });
    }
}
