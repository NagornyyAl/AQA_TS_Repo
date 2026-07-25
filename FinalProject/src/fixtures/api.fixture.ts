import { test as base } from './services.fixture.js';
import { ToolshopApiClient } from '../api/toolshop-api.client.js';

export interface ApiFixtures {
    api: ToolshopApiClient;
}

export const test = base.extend<NonNullable<unknown>, ApiFixtures>({
    api: [
        async ({ playwright, frameworkConfig }, use) => {
            const request = await playwright.request.newContext({
                baseURL: frameworkConfig.apiBaseUrl,
                extraHTTPHeaders: { Accept: 'application/json' }
            });

            await use(new ToolshopApiClient(request));
            await request.dispose();
        },
        { scope: 'worker' }
    ]
});
