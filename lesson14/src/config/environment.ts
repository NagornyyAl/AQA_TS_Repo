import config from '../../config.json';

interface ConfigFile {
  api: {
    officialJokeApi: {
      baseUrl: string;
    };
  };
  request: {
    timeoutMs: number;
  };
}

export interface TestEnvironment {
  apiBaseUrl: string;
  requestTimeoutMs: number;
}

const configFile = config as ConfigFile;

export function getEnvironment(): TestEnvironment {
  return {
    apiBaseUrl: process.env.API_BASE_URL ?? configFile.api.officialJokeApi.baseUrl,
    requestTimeoutMs: Number(process.env.API_TIMEOUT_MS ?? configFile.request.timeoutMs)
  };
}
