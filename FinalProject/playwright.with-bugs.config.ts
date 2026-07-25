import { defineConfig, devices } from '@playwright/test';
import baseConfig from './playwright.config.js';
import { defectEnvironment } from './src/config/environment.js';

export default defineConfig(baseConfig, {
    testDir: './tests/defects',
    testIgnore: [],
    fullyParallel: false,
    outputDir: 'test-results-with-bugs/artifacts',
    // Overridden explicitly: the base config's firefox/webkit projects pin their
    // own testDir to tests/e2e, which would silently ignore the testDir above.
    // This demo is defect evidence, not cross-browser coverage, so one browser is enough.
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report-with-bugs', open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results-with-bugs', detail: true, suiteTitle: false }],
        ['junit', { outputFile: 'test-results-with-bugs/junit.xml' }],
        ['json', { outputFile: 'test-results-with-bugs/results.json' }]
    ],
    use: {
        ...baseConfig.use,
        baseURL: defectEnvironment.uiBaseUrl
    }
});
