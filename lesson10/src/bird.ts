import type { IBird } from './i-bird';
import type { MovementStrategy } from './movement-strategy';

export abstract class Bird implements IBird {
    protected constructor(
        private readonly name: string,
        private readonly species: string,
        private readonly movementStrategy: MovementStrategy
    ) {}

    public getName(): string {
        return this.name;
    }

    public getInfo(): string {
        return `Name: ${this.name}, Species: ${this.species}`;
    }

    public eat(): void {
        console.log(`${this.name} eats.`);
    }

    public move(): string {
        return this.movementStrategy.move(this.name);
    }

    public abstract makeSound(): void;
}
