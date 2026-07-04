const chromeArguments = [
    '--window-size=1440,900',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--lang=uk-UA'
];

if (process.env.HEADLESS !== 'false') {
    chromeArguments.push('--headless=new');
}

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: chromeArguments
            }
        }
    ],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 2,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 90000
    }
};
