import { expect } from 'vitest';

import type { JokeDto } from '../../src/api/dto/joke.dto';

export function expectValidJoke(joke: JokeDto): void {
    expect.soft(joke.id).toEqual(expect.any(Number));
    expect.soft(joke.type).toEqual(expect.any(String));
    expect.soft(joke.setup).toEqual(expect.any(String));
    expect.soft(joke.punchline).toEqual(expect.any(String));
    expect.soft(joke.setup.length).toBeGreaterThan(0);
    expect.soft(joke.punchline.length).toBeGreaterThan(0);
}
