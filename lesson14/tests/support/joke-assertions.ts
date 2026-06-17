import { expect } from 'vitest';

import type { JokeDto } from '../../src/api/dto/joke.dto';

export function expectValidJoke(joke: JokeDto): void {
  expect(joke.id).toEqual(expect.any(Number));
  expect(joke.type).toEqual(expect.any(String));
  expect(joke.setup).toEqual(expect.any(String));
  expect(joke.punchline).toEqual(expect.any(String));
  expect(joke.setup.length).toBeGreaterThan(0);
  expect(joke.punchline.length).toBeGreaterThan(0);
}
