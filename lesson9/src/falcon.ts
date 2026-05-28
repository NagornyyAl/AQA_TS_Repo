import { Bird } from './bird';

export class Falcon extends Bird {
    public constructor(name: string) {
        super(name, 'Falcon', 320);
    }

    public makeSound(): void {
        console.log(`${this.name} screams.`);
    }

    public move(): string {
        return `${this.name} flies with max speed ${this.getMaxSpeedLevel()} km/h.`;
    }
}
