import { defineConfig, devices } from '@playwright/test';
import { environment } from './src/config/environment.js';

export default defineConfig({
    testDir: './tests',
    testIgnore: ['**/defects/**'],
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    timeout: 30_000,
    expect: {
        timeout: 10_000
    },
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: false }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['json', { outputFile: 'test-results/results.json' }]
    ],
    use: {
        baseURL: environment.uiBaseUrl,
        testIdAttribute: 'data-test',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        {
            // Primary project: runs the full suite (api, e2e, contracts).
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            // Cross-browser coverage is scoped to E2E only: API/contract tests
            // exercise HTTP endpoints, not a real browser, so re-running them
            // per browser would duplicate work without adding coverage.
            name: 'firefox',
            testDir: './tests/e2e',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            testDir: './tests/e2e',
            use: { ...devices['Desktop Safari'] }
        }
    ]
});
