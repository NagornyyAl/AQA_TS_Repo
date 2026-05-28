import { Bird } from './bird';

export class Ostrich extends Bird {
    public constructor(name: string) {
        super(name, 'Ostrich', 65);
    }
    public makeSound(): void {
        console.log(`${this.name} chirps.`);
    }

    public move(): string {
        return `${this.name} runs with max speed ${this.getMaxSpeedLevel()} km/h.`;
    }
}
