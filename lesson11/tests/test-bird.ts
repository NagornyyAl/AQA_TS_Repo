import { Bird } from '../src/bird.js';
import { type IMovementStrategy } from '../src/movement-strategy.js';

export class TestBird extends Bird {
    public constructor(name: string, movementStrategy: IMovementStrategy) {
        super(name, 'Test bird', movementStrategy);
    }

    public makeSound(): string {
        return `${this.getName()} whistles.`;
    }
}
