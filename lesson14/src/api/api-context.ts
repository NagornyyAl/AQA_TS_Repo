import { getEnvironment } from '../config/environment';
import { HttpClient } from '../framework/http-client';
import { HealthApi } from './objects/health.api';
import { JokesApi } from './objects/jokes.api';
import { JokeTypesApi } from './objects/joke-types.api';

export interface ApiContext {
    healthApi: HealthApi;
    jokesApi: JokesApi;
    jokeTypesApi: JokeTypesApi;
}

export function createApiContext(baseUrl?: string): ApiContext {
    const environment = getEnvironment();
    const http = new HttpClient({
        baseUrl: baseUrl ?? environment.apiBaseUrl,
        timeoutMs: environment.requestTimeoutMs
    });

    return {
        healthApi: new HealthApi(http),
        jokesApi: new JokesApi(http),
        jokeTypesApi: new JokeTypesApi(http)
    };
}
