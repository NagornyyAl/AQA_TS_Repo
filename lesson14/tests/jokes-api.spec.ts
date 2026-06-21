import { beforeAll, describe, expect, it } from 'vitest';

import type { ApiContext } from '../src/api/api-context';
import type { ApiErrorDto } from '../src/api/dto/error.dto';
import type { JokeDto, JokeType } from '../src/api/dto/joke.dto';
import { createApiContext } from '../src/api/api-context';
import { expectValidJoke } from './support/joke-assertions';

describe('Official Joke API', () => {
    let api: ApiContext;

    beforeAll(() => {
        api = createApiContext();
    });

    it('returns pong from the health endpoint', async () => {
        const response = await api.healthApi.ping();

        expect(response.status).toBe(200);
        expect(response.body).toBe('pong');
    });

    it('returns the available joke types', async () => {
        const response = await api.jokeTypesApi.getTypes();

        expect(response.status).toBe(200);
        expect(response.body).toEqual<JokeType[]>(['general', 'knock-knock', 'programming', 'dad']);
    });

    it('returns a valid random joke DTO', async () => {
        const response = await api.jokesApi.getRandomJoke();

        expect(response.status).toBe(200);
        expectValidJoke(response.body);
    });

    it('returns the requested number of random jokes', async () => {
        const response = await api.jokesApi.getRandomJokes(5);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const jokes = response.body as JokeDto[];
        const jokeIds = jokes.map(joke => joke.id);

        expect(jokes).toHaveLength(5);
        expect(new Set(jokeIds)).toHaveLength(5);
        jokes.forEach(expectValidJoke);
    });

    it('returns a structured 404 error for a missing joke', async () => {
        const response = await api.jokesApi.getJokeById(999_999);
        const body = response.body as ApiErrorDto;

        expect(response.status).toBe(404);
        expect(body).toEqual({
            type: 'error',
            message: 'joke not found'
        });
    });
});
