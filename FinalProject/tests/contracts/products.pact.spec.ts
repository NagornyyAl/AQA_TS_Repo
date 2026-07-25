import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import { request as playwrightRequest } from '@playwright/test';
import path from 'node:path';
import { ToolshopApiClient } from '../../src/api/toolshop-api.client.js';
import { parseProduct } from '../../src/contracts/product.contract.js';
import { environment } from '../../src/config/environment.js';
import { expect, test } from '../../src/fixtures/test.js';
import { Verifier } from '@pact-foundation/pact';

test.describe('Toolshop API consumer contract', () => {
    test.describe.configure({ mode: 'serial' });

    test('creates a Pact contract for retrieving a product', async ({ reporter }) => {
        const provider = new PactV3({
            consumer: 'playwright-toolshop-tests',
            provider: 'toolshop-api-v2',
            dir: path.resolve(process.cwd(), 'pacts'),
            logLevel: 'warn'
        });

        provider
            .uponReceiving('a request for product 1')
            .withRequest({
                method: 'GET',
                path: '/products/1',
                headers: { Accept: 'application/json' }
            })
            .willRespondWith({
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    id: MatchersV3.integer(1),
                    name: MatchersV3.string('Combination Pliers'),
                    description: MatchersV3.string('Versatile combination pliers'),
                    price: MatchersV3.decimal(14.15),
                    brand: {
                        id: MatchersV3.integer(1),
                        name: MatchersV3.string('Brand name 1'),
                        slug: MatchersV3.string('brand-name-1')
                    },
                    category: {
                        id: MatchersV3.integer(7),
                        parent_id: MatchersV3.integer(1),
                        name: MatchersV3.string('Pliers'),
                        slug: MatchersV3.string('pliers')
                    },
                    product_image: {
                        id: MatchersV3.integer(1),
                        file_name: MatchersV3.string('pliers01.jpeg'),
                        title: MatchersV3.string('Combination pliers')
                    }
                }
            });

        await provider.executeTest(async (mockServer) => {
            const request = await playwrightRequest.newContext({
                baseURL: mockServer.url,
                extraHTTPHeaders: { Accept: 'application/json' }
            });
            const api = new ToolshopApiClient(request);

            const { response, body: product } = await api.getProduct(1);
            expect(response.status()).toBe(200);
            parseProduct(product);
            expect(product).toMatchObject({
                id: 1,
                name: expect.any(String),
                price: expect.any(Number),
                brand: { name: expect.any(String) },
                category: { name: expect.any(String) }
            });

            await request.dispose();
        });

        await reporter.attachFile(
            'Generated Pact contract',
            path.resolve(process.cwd(), 'pacts', 'playwright-toolshop-tests-toolshop-api-v2.json'),
            'application/json'
        );
    });

    test('verifies the generated contract against the public API v2 provider', async ({ reporter }) => {
        const verificationResult = await new Verifier({
            provider: 'toolshop-api-v2',
            providerBaseUrl: environment.apiBaseUrl,
            pactUrls: [path.resolve(process.cwd(), 'pacts', 'playwright-toolshop-tests-toolshop-api-v2.json')],
            logLevel: 'warn'
        }).verifyProvider();

        await reporter.attachText('Pact provider verification', verificationResult);
        expect(verificationResult).toBeTruthy();
    });
});
