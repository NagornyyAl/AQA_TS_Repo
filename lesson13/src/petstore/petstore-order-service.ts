import { HttpError, parseResponseBody } from '../shared/http-error';
import { PetstoreOrder } from './order.types';

export class PetstoreOrderService {
    public constructor(private readonly baseUrl: string) {}

    public async placeOrder(order: PetstoreOrder): Promise<PetstoreOrder> {
        const response = await fetch(`${this.baseUrl}/v2/store/order`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        const responseBody = await parseResponseBody(response);

        if (!response.ok) {
            throw new HttpError(
                `Petstore request failed: ${response.status} ${response.statusText}`,
                response.status,
                responseBody
            );
        }

        return responseBody as PetstoreOrder;
    }
}
