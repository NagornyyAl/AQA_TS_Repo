import { Bird } from './bird.js';
import { FlyingStrategy, IMovementStrategy } from './movement-strategy.js';

export class Falcon extends Bird {
  public constructor(name: string, movementStrategy: IMovementStrategy = new FlyingStrategy(320)) {
    super(name, 'Falcon', movementStrategy);
  }

  public makeSound(): string {
    return `${this.getName()} screams.`;
  }
}
