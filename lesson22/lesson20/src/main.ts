import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { HotlineWorld } from './world/hotline.world';

setDefaultTimeout(30_000);
setWorldConstructor(HotlineWorld);
