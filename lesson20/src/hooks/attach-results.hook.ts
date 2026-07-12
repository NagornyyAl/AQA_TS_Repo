import { After, Status } from '@cucumber/cucumber';
import { HotlineWorld } from '../world/hotline.world';

export function attachResultsHook(): void {
    After(async function (this: HotlineWorld, { result }) {
        if (!result || result.status === Status.PASSED || !this.page) {
            return;
        }

        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png');
    });
}
