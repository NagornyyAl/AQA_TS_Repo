import { Bird } from './bird';
import { FlyingStrategy } from './movement-strategy';

export class Falcon extends Bird {
    public constructor(name: string) {
        super(name, 'Falcon', new FlyingStrategy(320));
    }

    public makeSound(): void {
        console.log(`${this.getName()} screams.`);
    }
}
