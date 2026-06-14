import { randomUUID } from 'node:crypto';
import { expect } from 'chai';
import { CatApiClient } from '../../src/cat-api/cat-api-client';
import { CatFavourite, CatVote } from '../../src/cat-api/cat-api.types';
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
        expect(breed.id).to.be.a('string').and.not.empty;

        const directBreed = await client.getBreed(breed.id);

        expect(directBreed.id).to.equal(breed.id);
        expect(directBreed.name).to.equal(breed.name);

        const images = await client.searchImages({
            breedIds: breed.id,
            hasBreeds: true,
            limit: 1
        });
        const image = images[0];

        expect(image, `expected an image for breed ${breed.id}`).to.not.equal(undefined);
        expect(image.id).to.be.a('string').and.not.empty;
        expect(image.url).to.match(/^https:\/\//);
        expect(image.breeds.some((imageBreed) => imageBreed.id === breed.id)).to.equal(true);

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

        const favourites = await client.listFavourites(subId);
        const persistedFavourite = findById(favourites, createdFavourite.id);

        expect(
            persistedFavourite,
            `expected favourite ${createdFavourite.id} to be returned by /favourites`
        ).to.not.equal(undefined);
        expect(persistedFavourite?.image_id).to.equal(image.id);
    });
});

function findById<T extends CatVote | CatFavourite>(items: T[], id: number): T | undefined {
    return items.find((item) => item.id === id);
}
