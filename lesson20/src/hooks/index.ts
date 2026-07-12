import { browserHook } from './browser.hook';
import { pageHook } from './page.hook';
import { attachResultsHook } from './attach-results.hook';

browserHook();
pageHook();
attachResultsHook();
