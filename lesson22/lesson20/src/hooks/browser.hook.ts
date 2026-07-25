import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { HotlineWorld } from '../world/hotline.world';

export function browserHook(): void {
    BeforeAll(async function () {
        HotlineWorld.browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    });

    AfterAll(async function () {
        await HotlineWorld.browser.close();
    });
}
