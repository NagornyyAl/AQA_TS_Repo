import { After, Before } from '@cucumber/cucumber';
import { HotlineWorld } from '../world/hotline.world';

export function pageHook(): void {
    Before(async function (this: HotlineWorld) {
        this.browserContext = await HotlineWorld.browser.newContext({ viewport: { width: 1600, height: 900 } });
        this.page = await this.browserContext.newPage();
    });

    After(async function (this: HotlineWorld) {
        await this.browserContext.close();
    });
}
