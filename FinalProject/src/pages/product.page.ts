import type { Locator, Page, Response } from '@playwright/test';

export interface ProductPageLoad {
    productResponse: Response;
    relatedProductsResponse: Response;
}

export interface RenderedProductDetails {
    name: string;
    price: number;
    description: string;
}

export class ProductPage {
    public readonly name: Locator;
    public readonly price: Locator;
    public readonly description: Locator;
    public readonly relatedProductLinks: Locator;
    public readonly quantity: Locator;
    public readonly increaseQuantityButton: Locator;

    public constructor(
        private readonly page: Page,
        private readonly uiApiBaseUrl: string
    ) {
        this.name = page.getByTestId('product-name');
        this.price = page.getByTestId('unit-price');
        this.description = page.getByTestId('product-description');
        this.relatedProductLinks = page.locator('a[href^="/product/"]');
        this.quantity = page.getByTestId('quantity');
        this.increaseQuantityButton = page.getByTestId('increase-quantity');
    }

    // Client-side navigation via a catalogue card click: a second full-page
    // load (page.goto) from CI runner IPs is intercepted by the Cloudflare
    // bot challenge, while SPA route changes and XHR calls pass through.
    public async openFromCatalogue(productCard: Locator, productId: string): Promise<ProductPageLoad> {
        const productResponse = this.waitForStorefrontResponse(`/products/${productId}`);
        const relatedProductsResponse = this.waitForStorefrontResponse(`/products/${productId}/related`);
        await productCard.click();
        const responses = {
            productResponse: await productResponse,
            relatedProductsResponse: await relatedProductsResponse
        };
        await this.name.waitFor({ state: 'visible' });
        return responses;
    }

    public async openMissing(productId: string): Promise<ProductPageLoad> {
        return this.openRoute(productId);
    }

    public async getDetails(): Promise<RenderedProductDetails> {
        return {
            name: (await this.name.innerText()).trim(),
            price: Number((await this.price.innerText()).replace(/[^0-9.]/g, '')),
            description: (await this.description.innerText()).trim()
        };
    }

    public async getRelatedProductIds(): Promise<string[]> {
        const hrefs = await this.relatedProductLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
        return hrefs
            .filter((href): href is string => href !== null)
            .map((href) => href.split('/').at(-1))
            .filter((id): id is string => id !== undefined && id.length > 0);
    }

    public async getQuantity(): Promise<number> {
        return Number(await this.quantity.inputValue());
    }

    public async increaseQuantity(): Promise<void> {
        await this.increaseQuantityButton.click();
    }

    private async openRoute(productId: string): Promise<ProductPageLoad> {
        const productResponse = this.waitForStorefrontResponse(`/products/${productId}`);
        const relatedProductsResponse = this.waitForStorefrontResponse(`/products/${productId}/related`);
        await this.page.goto(`/product/${productId}`, { waitUntil: 'domcontentloaded' });
        return {
            productResponse: await productResponse,
            relatedProductsResponse: await relatedProductsResponse
        };
    }

    private waitForStorefrontResponse(pathname: string): Promise<Response> {
        return this.page.waitForResponse((response) => {
            const url = new URL(response.url());
            return url.origin === this.uiApiBaseUrl && url.pathname === pathname && response.request().method() === 'GET';
        });
    }
}
