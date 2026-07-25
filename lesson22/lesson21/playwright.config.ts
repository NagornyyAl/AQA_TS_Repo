import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    /* Multiple HTML reporters: built-in Playwright HTML, Allure and Mochawesome. */
    reporter: [
        ['html', { open: 'never' }],
        ['list'],
        ['allure-playwright', { resultsDir: 'allure-results' }],
        [
            'pwmochawesome',
            {
                generateHTML: true,
                reportDir: 'mochawesome-report',
                reportTitle: 'Hotline.ua - Playwright report',
                charts: true
            }
        ]
    ],
    use: {
        baseURL: 'https://hotline.ua',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
