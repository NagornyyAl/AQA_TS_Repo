import { Bird } from './bird';
import { RunningStrategy } from './movement-strategy';

export class Ostrich extends Bird {
    public constructor(name: string) {
        super(name, 'Ostrich', new RunningStrategy(65));
    }

    public makeSound(): void {
        console.log(`${this.getName()} chirps.`);
    }
}
