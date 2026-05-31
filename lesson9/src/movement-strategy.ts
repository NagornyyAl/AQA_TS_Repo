export interface IMovementStrategy {
    move(name: string): string;
}

export class FlyingStrategy implements IMovementStrategy {
    public constructor(private readonly maxSpeedLevel: number) {}

    public move(name: string): string {
        return `${name} flies with max speed ${this.maxSpeedLevel} km/h.`;
    }
}

export class RunningStrategy implements IMovementStrategy {
    public constructor(private readonly maxSpeedLevel: number) {}

    public move(name: string): string {
        return `${name} runs with max speed ${this.maxSpeedLevel} km/h.`;
    }
}
