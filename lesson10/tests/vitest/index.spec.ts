import { assert, beforeEach, describe, expect, it } from 'vitest';
import { expect as expectChai } from 'chai';
import { addBirdTag, enrichBirdProfile, renameBird, type BirdProfile } from '../../src/index';

describe('index object manipulation functions with Vitest', () => {
    let profile: BirdProfile;

    beforeEach(() => {
        profile = {
            name: 'Sapsan',
            species: 'Falcon',
            maxSpeed: 320,
            canFly: true,
            tags: ['predator']
        };
    });

    it('renameBird should mutate and return the same profile object', () => {
        const updatedProfile = renameBird(profile, 'Ares');

        expect(updatedProfile).toBe(profile);
        expect(updatedProfile.name).toBe('Ares');
        expectChai(profile.name).to.equal('Ares');
    });

    it('addBirdTag should add a unique tag to profile tags', () => {
        const updatedProfile = addBirdTag(profile, 'fast');

        expect(updatedProfile.tags).toContain('fast');
        expectChai(updatedProfile.tags).to.have.lengthOf(2);
    });

    it('addBirdTag should not duplicate an existing tag', () => {
        const updatedProfile = addBirdTag(profile, 'predator');

        assert.lengthOf(updatedProfile.tags, 1);
        expectChai(updatedProfile.tags).to.deep.equal(['predator']);
    });

    it('enrichBirdProfile should add info and flying movement description', () => {
        const updatedProfile = enrichBirdProfile(profile);

        expect(updatedProfile.info).toBe('Sapsan is a Falcon.');
        expect(updatedProfile.movement).toBe('Sapsan can fly up to 320 km/h.');
        expectChai(updatedProfile).to.include({
            info: 'Sapsan is a Falcon.',
            movement: 'Sapsan can fly up to 320 km/h.'
        });
    });

    it('enrichBirdProfile should add running movement description for non-flying birds', () => {
        const ostrichProfile: BirdProfile = {
            name: 'Oscar',
            species: 'Ostrich',
            maxSpeed: 65,
            canFly: false,
            tags: []
        };

        const updatedProfile = enrichBirdProfile(ostrichProfile);

        expect(updatedProfile.movement).toBe('Oscar can run up to 65 km/h.');
        expectChai(updatedProfile.info).to.equal('Oscar is a Ostrich.');
    });
});
