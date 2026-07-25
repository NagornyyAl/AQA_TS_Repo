import { test as base } from '@playwright/test';
import { environment, type FrameworkEnvironment } from '../config/environment.js';
import { TestReporter } from '../reporting/test-reporter.js';

export interface ServicesFixtures {
    reporter: TestReporter;
    _reportArtifacts: void;
}

export interface ServicesWorkerFixtures {
    frameworkConfig: FrameworkEnvironment;
}

export const test = base.extend<ServicesFixtures, ServicesWorkerFixtures>({
    frameworkConfig: [
        async ({}, use) => {
            await use(environment);
        },
        { scope: 'worker' }
    ],
    reporter: async ({ frameworkConfig }, use, testInfo) => {
        await use(new TestReporter(testInfo, frameworkConfig));
    },
    _reportArtifacts: [
        async ({ reporter }, use) => {
            await reporter.attachRunContext();
            await use();
            await reporter.attachOutcome();
        },
        { auto: true }
    ]
});
