import { IBird } from './i-bird';
import { IMovementStrategy } from './movement-strategy';

export abstract class Bird implements IBird {
    public constructor(
        private readonly name: string,
        private readonly species: string,
        private readonly movementStrategy: IMovementStrategy
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

    public abstract makeSound(): void;

    public move(): string {
        return this.movementStrategy.move(this.name);
    }
}
