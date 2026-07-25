import { ToolshopApiClient } from '../api/toolshop-api.client.js';
import { defectEnvironment } from '../config/environment.js';
import { BugShopPage } from '../pages/bug-shop.page.js';
import { test as base } from './pages.fixture.js';

export interface DefectFixtures {
    bugShopPage: BugShopPage;
}

export interface DefectWorkerFixtures {
    bugApi: ToolshopApiClient;
    bugConfig: typeof defectEnvironment;
}

export const test = base.extend<DefectFixtures, DefectWorkerFixtures>({
    frameworkConfig: [
        async ({}, use) => {
            await use(defectEnvironment);
        },
        { scope: 'worker' }
    ],
    bugConfig: [
        async ({}, use) => {
            await use(defectEnvironment);
        },
        { scope: 'worker' }
    ],
    bugApi: [
        async ({ playwright, bugConfig }, use) => {
            const request = await playwright.request.newContext({
                baseURL: bugConfig.apiBaseUrl,
                extraHTTPHeaders: { Accept: 'application/json' }
            });

            await use(new ToolshopApiClient(request));
            await request.dispose();
        },
        { scope: 'worker' }
    ],
    bugShopPage: async ({ page, bugConfig }, use) => {
        await use(new BugShopPage(page, bugConfig.uiBaseUrl));
    }
});

export { expect } from '@playwright/test';
