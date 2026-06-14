import { Bird } from './bird.js';
import { IMovementStrategy, RunningStrategy } from './movement-strategy.js';

export class Ostrich extends Bird {
  public constructor(name: string, movementStrategy: IMovementStrategy = new RunningStrategy(65)) {
    super(name, 'Ostrich', movementStrategy);
  }

  public makeSound(): string {
    return `${this.getName()} chirps.`;
  }
}
