import { afterEach, describe, expect, it, vi, type Mocked } from 'vitest';
import { AviaryService, type BirdNotifier, type BirdRepository } from '../src/aviary-service.js';
import { showBirdInfo } from '../src/bird-presenter.js';
import { Falcon } from '../src/falcon.js';
import { type IBird } from '../src/i-bird.js';
import { type IMovementStrategy } from '../src/movement-strategy.js';
import { Ostrich } from '../src/ostrich.js';
import { TestBird } from './test-bird.js';

describe('lesson11 task mocking examples', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('delegates bird movement to a mocked strategy object', () => {
        const movementStrategy: Mocked<IMovementStrategy> = {
            move: vi.fn().mockReturnValue('Mocky teleports.')
        };
        const bird = new TestBird('Mocky', movementStrategy);

        const result = bird.move();

        expect(result).toBe('Mocky teleports.');
        expect(movementStrategy.move).toHaveBeenCalledOnce();
        expect(movementStrategy.move).toHaveBeenCalledWith('Mocky');
    });

    it('passes all bird messages to a mocked output function', () => {
        const bird: Mocked<IBird> = {
            getInfo: vi.fn().mockReturnValue('Name: Sky, Species: Mock'),
            eat: vi.fn().mockReturnValue('Sky eats.'),
            makeSound: vi.fn().mockReturnValue('Sky sings.'),
            move: vi.fn().mockReturnValue('Sky flies.')
        };
        const output = vi.fn();

        const messages = showBirdInfo(bird, output);

        expect(messages).toEqual(['Name: Sky, Species: Mock', 'Sky eats.', 'Sky sings.', 'Sky flies.']);
        expect(output).toHaveBeenCalledTimes(4);
        expect(output).toHaveBeenNthCalledWith(1, 'Name: Sky, Species: Mock');
        expect(bird.makeSound).toHaveBeenCalledOnce();
    });

    it('uses an injected movement strategy mock in Falcon', () => {
        const movementStrategy: Mocked<IMovementStrategy> = {
            move: vi.fn().mockReturnValue('Hunter glides silently.')
        };
        const falcon = new Falcon('Hunter', movementStrategy);

        expect(falcon.getInfo()).toBe('Name: Hunter, Species: Falcon');
        expect(falcon.move()).toBe('Hunter glides silently.');
        expect(movementStrategy.move).toHaveBeenCalledWith('Hunter');
    });

    it('can spy on an object method and replace its implementation', () => {
        const ostrich = new Ostrich('Oscar');
        const soundSpy = vi.spyOn(ostrich, 'makeSound').mockReturnValue('Oscar makes a mocked sound.');

        const result = ostrich.makeSound();

        expect(result).toBe('Oscar makes a mocked sound.');
        expect(soundSpy).toHaveBeenCalledOnce();
    });

    it('registers a bird using mocked repository and notifier objects', async () => {
        const bird: Mocked<IBird> = {
            getInfo: vi.fn().mockReturnValue('Name: Oscar, Species: Ostrich'),
            eat: vi.fn(),
            makeSound: vi.fn(),
            move: vi.fn()
        };
        const repository: Mocked<BirdRepository> = {
            findByName: vi.fn(),
            save: vi.fn().mockResolvedValue(bird)
        };
        const notifier: Mocked<BirdNotifier> = {
            notify: vi.fn().mockResolvedValue(true)
        };
        const service = new AviaryService(repository, notifier);

        const registeredBird = await service.register(bird);

        expect(registeredBird).toBe(bird);
        expect(repository.save).toHaveBeenCalledWith(bird);
        expect(notifier.notify).toHaveBeenCalledWith('Name: Oscar, Species: Ostrich registered');
    });

    it('describes a found bird without calling save or notify', async () => {
        const bird: Mocked<IBird> = {
            getInfo: vi.fn().mockReturnValue('Name: Sapsan, Species: Falcon'),
            eat: vi.fn(),
            makeSound: vi.fn(),
            move: vi.fn().mockReturnValue('Sapsan flies with max speed 320 km/h.')
        };
        const repository: Mocked<BirdRepository> = {
            findByName: vi.fn().mockResolvedValue(bird),
            save: vi.fn()
        };
        const notifier: Mocked<BirdNotifier> = {
            notify: vi.fn()
        };
        const service = new AviaryService(repository, notifier);

        const description = await service.describeByName('Sapsan');

        expect(description).toBe('Name: Sapsan, Species: Falcon | Sapsan flies with max speed 320 km/h.');
        expect(repository.findByName).toHaveBeenCalledWith('Sapsan');
        expect(repository.save).not.toHaveBeenCalled();
        expect(notifier.notify).not.toHaveBeenCalled();
    });
});
