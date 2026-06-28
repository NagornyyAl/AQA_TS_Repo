import { randomUUID } from 'node:crypto';
import { expect } from 'chai';
import { CatApiClient } from '../../src/cat-api/cat-api-client';
import { CatBreed, CatFavourite, CatImage, CatImageSummary, CatVote } from '../../src/cat-api/cat-api.types';
import { loadLocalEnv } from '../../src/shared/load-local-env';

loadLocalEnv();

const catApiKey = process.env.CAT_API_KEY;
const describeWithCatApiKey = catApiKey ? describe : describe.skip;
const suiteName = catApiKey
    ? 'The Cat API integration: breeds -> images -> votes -> favourites'
    : 'The Cat API integration: breeds -> images -> votes -> favourites (skipped: set CAT_API_KEY)';

describeWithCatApiKey(suiteName, () => {
    const client = new CatApiClient({ apiKey: catApiKey as string });
    const createdResourceIds: { voteId?: number; favouriteId?: number } = {};

    afterEach(async () => {
        const cleanupTasks: Promise<unknown>[] = [];

        if (createdResourceIds.favouriteId !== undefined) {
            cleanupTasks.push(client.deleteFavourite(createdResourceIds.favouriteId));
            createdResourceIds.favouriteId = undefined;
        }

        if (createdResourceIds.voteId !== undefined) {
            cleanupTasks.push(client.deleteVote(createdResourceIds.voteId));
            createdResourceIds.voteId = undefined;
        }

        const results = await Promise.allSettled(cleanupTasks);
        const rejectedCleanup = results.find((result) => result.status === 'rejected');

        if (rejectedCleanup) {
            throw (rejectedCleanup as PromiseRejectedResult).reason;
        }
    });

    it('uses one breed image as the shared entity for a vote and a favourite', async () => {
        const subId = `lesson13-${randomUUID()}`;
        const breeds = await client.searchBreeds('siberian');
        const breed = breeds.find((item) => item.id === 'sibe') ?? breeds[0];

        expect(breed, 'expected at least one Siberian breed result').to.not.equal(undefined);
        expectBreedContract(breed);
        expectReferenceImageContract(breed);

        const directBreed = await client.getBreed(breed.id);

        expect(directBreed.id).to.equal(breed.id);
        expect(directBreed.name).to.equal(breed.name);
        expect(directBreed.temperament).to.equal(breed.temperament);
        expect(directBreed.origin).to.equal(breed.origin);
        expect(directBreed.description).to.equal(breed.description);
        expect(directBreed.life_span).to.equal(breed.life_span);
        expect(directBreed.reference_image_id).to.equal(breed.reference_image_id);
        expectBreedContract(directBreed);

        const images = await client.searchImages({
            breedIds: breed.id,
            hasBreeds: true,
            limit: 1
        });
        const image = images[0];

        expect(image, `expected an image for breed ${breed.id}`).to.not.equal(undefined);
        expectImageContract(image);

        const imageBreed = image.breeds.find((item) => item.id === breed.id);

        expect(imageBreed, `expected image ${image.id} to include breed ${breed.id}`).to.not.equal(undefined);
        expectBreedContract(imageBreed as CatBreed);
        expect(imageBreed?.name).to.equal(breed.name);
        expect(imageBreed?.origin).to.equal(breed.origin);
        expect(imageBreed?.reference_image_id).to.equal(breed.reference_image_id);

        const createdVote = await client.createVote({
            image_id: image.id,
            sub_id: subId,
            value: 1
        });
        createdResourceIds.voteId = createdVote.id;

        expect(createdVote).to.include({
            image_id: image.id,
            sub_id: subId,
            value: 1
        });
        expect(createdVote.id).to.be.a('number');

        const votes = await client.listVotes(subId);
        const persistedVote = findById(votes, createdVote.id);

        expect(persistedVote, `expected vote ${createdVote.id} to be returned by /votes`).to.not.equal(undefined);
        expect(persistedVote?.image_id).to.equal(image.id);
        expect(persistedVote?.sub_id).to.equal(subId);
        expectLinkedImageContract(persistedVote?.image, image);

        const createdFavourite = await client.createFavourite({
            image_id: image.id,
            sub_id: subId
        });
        createdResourceIds.favouriteId = createdFavourite.id;

        expect(createdFavourite.message).to.match(/success/i);
        expect(createdFavourite.id).to.be.a('number');

        const favouriteDetails = await client.getFavourite(createdFavourite.id);

        expect(favouriteDetails.image_id).to.equal(image.id);
        expect(favouriteDetails.sub_id).to.equal(subId);
        expectLinkedImageContract(favouriteDetails.image, image);

        const favourites = await client.listFavourites(subId);
        const persistedFavourite = findById(favourites, createdFavourite.id);

        expect(
            persistedFavourite,
            `expected favourite ${createdFavourite.id} to be returned by /favourites`
        ).to.not.equal(undefined);
        expect(persistedFavourite?.image_id).to.equal(image.id);
        expect(persistedFavourite?.sub_id).to.equal(subId);
        expectLinkedImageContract(persistedFavourite?.image, image);
    });
});

function findById<T extends CatVote | CatFavourite>(items: T[], id: number): T | undefined {
    return items.find((item) => item.id === id);
}

function expectBreedContract(breed: CatBreed): void {
    expect(breed.id).to.be.a('string').and.not.empty;
    expect(breed.name).to.be.a('string').and.not.empty;
    expect(breed.temperament).to.be.a('string').and.not.empty;
    expect(breed.origin).to.be.a('string').and.not.empty;
    expect(breed.country_codes).to.be.a('string').and.not.empty;
    expect(breed.country_code).to.be.a('string').and.not.empty;
    expect(breed.description).to.be.a('string').and.not.empty;
    expect(breed.life_span).to.match(/^\d+\s-\s\d+$/);
    expect(breed.reference_image_id).to.be.a('string').and.not.empty;
    expect(breed.weight.imperial).to.be.a('string').and.not.empty;
    expect(breed.weight.metric).to.be.a('string').and.not.empty;

    for (const score of [
        breed.adaptability,
        breed.affection_level,
        breed.child_friendly,
        breed.dog_friendly,
        breed.energy_level,
        breed.grooming,
        breed.health_issues,
        breed.intelligence,
        breed.shedding_level,
        breed.social_needs,
        breed.stranger_friendly,
        breed.vocalisation
    ]) {
        expect(score).to.be.a('number').and.greaterThanOrEqual(1).and.lessThanOrEqual(5);
    }

    for (const flag of [
        breed.indoor,
        breed.experimental,
        breed.hairless,
        breed.natural,
        breed.rare,
        breed.rex,
        breed.suppressed_tail,
        breed.short_legs,
        breed.hypoallergenic
    ]) {
        expect(flag).to.be.a('number').and.greaterThanOrEqual(0).and.lessThanOrEqual(1);
    }
}

function expectReferenceImageContract(breed: CatBreed): void {
    expect(breed.image, `expected /breeds/search result for ${breed.id} to include image`).to.not.equal(undefined);
    expect(breed.image?.id).to.equal(breed.reference_image_id);
    expect(breed.image?.url).to.match(/^https:\/\//);
    expect(breed.image?.width).to.be.a('number').and.greaterThan(0);
    expect(breed.image?.height).to.be.a('number').and.greaterThan(0);
}

function expectImageContract(image: CatImage): void {
    expect(image.id).to.be.a('string').and.not.empty;
    expect(image.url).to.match(/^https:\/\//);
    expect(image.width).to.be.a('number').and.greaterThan(0);
    expect(image.height).to.be.a('number').and.greaterThan(0);
    expect(image.breeds).to.be.an('array').and.not.empty;
}

function expectLinkedImageContract(actualImage: CatImageSummary | undefined, expectedImage: CatImage): void {
    expect(actualImage, `expected read endpoint to return linked image ${expectedImage.id}`).to.not.equal(undefined);
    expect(actualImage?.id).to.equal(expectedImage.id);
    expect(actualImage?.url).to.equal(expectedImage.url);
}
