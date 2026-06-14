import path from 'node:path';
import { Verifier } from '@pact-foundation/pact';

describe('Petstore /store/order provider verification', () => {
    it('satisfies the PetstoreOrderConsumer contract', async () => {
        await new Verifier({
            providerBaseUrl: 'https://petstore.swagger.io',
            stateHandlers: {
                'the Petstore accepts a purchase order': () => Promise.resolve(undefined)
            },
            pactUrls: [path.resolve(process.cwd(), 'pacts', 'PetstoreOrderConsumer-PetstoreOrderApi.json')]
        }).verifyProvider();
    });
});
