import { expect } from 'chai';
import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import { PetstoreOrderService } from '../../src/petstore/petstore-order-service';
import { PetstoreOrder } from '../../src/petstore/order.types';

describe('Petstore /store/order consumer contract', () => {
    const provider = new PactV3({
        consumer: 'PetstoreOrderConsumer',
        provider: 'PetstoreOrderApi'
    });

    const orderRequest: PetstoreOrder = {
        id: 10,
        petId: 198_772,
        quantity: 2,
        shipDate: '2026-06-14T19:30:00.000Z',
        status: 'placed',
        complete: false
    };

    const orderResponse = MatchersV3.like(orderRequest);

    it('creates a contract for placing a store order', async () => {
        await provider
            .given('the Petstore accepts a purchase order')
            .uponReceiving('a request to place a store order')
            .withRequest({
                method: 'POST',
                path: '/v2/store/order',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: orderRequest
            })
            .willRespondWith({
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: orderResponse
            })
            .executeTest(async (mockServer) => {
                const orderService = new PetstoreOrderService(mockServer.url);
                const createdOrder = await orderService.placeOrder(orderRequest);

                expect(createdOrder.id).to.equal(orderRequest.id);
                expect(createdOrder.petId).to.equal(orderRequest.petId);
                expect(createdOrder.quantity).to.equal(orderRequest.quantity);
                expect(createdOrder.status).to.equal('placed');
                expect(createdOrder.complete).to.equal(false);
                expect(createdOrder.shipDate).to.be.a('string').and.not.empty;
            });
    });
});
