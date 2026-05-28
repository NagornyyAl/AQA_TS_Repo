import { IBird } from './i-bird';

export abstract class Bird implements IBird {
    public constructor(
        public name: string,
        protected species: string,
        private maxSpeedLevel: number
    ) {}
    public getInfo(): string {
        return `Name: ${this.name}, Species: ${this.species}`;
    }

    public eat(): void {
        console.log(`${this.name} eats.`);
    }

    public abstract makeSound(): void;

    public abstract move(): string;

    protected getMaxSpeedLevel(): number {
        return this.maxSpeedLevel;
    }
}
