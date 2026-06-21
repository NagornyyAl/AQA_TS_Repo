import config from '../../config.json';

import type { ConfigFile } from './models/config-file';
import type { TestEnvironment } from './models/test-environment';

const configFile = config as ConfigFile;

export function getEnvironment(): TestEnvironment {
    return {
        apiBaseUrl: process.env.API_BASE_URL ?? configFile.api.officialJokeApi.baseUrl,
        requestTimeoutMs: Number(process.env.API_TIMEOUT_MS ?? configFile.request.timeoutMs)
    };
}
