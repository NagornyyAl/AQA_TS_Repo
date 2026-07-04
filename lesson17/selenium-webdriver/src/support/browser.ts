import { Builder, Locator, until, WebDriver, WebElement } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export async function createDriver(): Promise<WebDriver> {
    const options = new chrome.Options();

    if (process.env.HEADLESS !== 'false') {
        options.addArguments('--headless=new');
    }

    options.addArguments(
        '--window-size=1440,900',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--lang=uk-UA'
    );

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().setTimeouts({ implicit: 0, pageLoad: 30000, script: 30000 });

    return driver;
}

export async function closeDriver(driver: WebDriver): Promise<void> {
    await driver.quit();
}

export async function waitForVisible(driver: WebDriver, locator: Locator, timeout = 30000): Promise<WebElement> {
    const element = await driver.wait(until.elementLocated(locator), timeout);

    return driver.wait(until.elementIsVisible(element), timeout);
}
