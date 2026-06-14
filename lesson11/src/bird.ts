import { IBird } from './i-bird.js';
import { IMovementStrategy } from './movement-strategy.js';

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

  public eat(): string {
    return `${this.name} eats.`;
  }

  public abstract makeSound(): string;

  public move(): string {
    return this.movementStrategy.move(this.name);
  }
}
