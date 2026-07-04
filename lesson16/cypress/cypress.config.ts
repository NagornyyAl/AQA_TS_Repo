import { defineConfig } from 'cypress';

export default defineConfig({
    allowCypressEnv: false,

    e2e: {
        supportFile: 'cypress/support/e2e.ts',
        specPattern: 'cypress/e2e/**/*.cy.ts',
        viewportHeight: 900,
        viewportWidth: 1440,
        defaultCommandTimeout: 20000,
        pageLoadTimeout: 90000,
        retries: {
            runMode: 1,
            openMode: 0
        }
    }
});
