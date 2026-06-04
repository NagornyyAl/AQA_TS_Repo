import type { IBird } from './i-bird';

export interface BirdProfile {
    name: string;
    species: string;
    maxSpeed: number;
    canFly: boolean;
    tags: string[];
    info?: string;
    movement?: string;
}

export function showBirdInfo(bird: IBird): string[] {
    const output = [
        bird.getInfo(),
        bird.move()
    ];

    bird.eat();
    bird.makeSound();

    return output;
}

export function renameBird(profile: BirdProfile, newName: string): BirdProfile {
    profile.name = newName;

    return profile;
}

export function addBirdTag(profile: BirdProfile, tag: string): BirdProfile {
    if (!profile.tags.includes(tag)) {
        profile.tags.push(tag);
    }

    return profile;
}

export function enrichBirdProfile(profile: BirdProfile): BirdProfile {
    profile.info = `${profile.name} is a ${profile.species}.`;
    profile.movement = profile.canFly
        ? `${profile.name} can fly up to ${profile.maxSpeed} km/h.`
        : `${profile.name} can run up to ${profile.maxSpeed} km/h.`;

    return profile;
}
