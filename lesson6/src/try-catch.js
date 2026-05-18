const unavailableResourceUrl = 'https://jsonplaceholder.typicode.com/not-existing-service';
const availableResourceUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=4';

export class FallbackRequestError extends Error {
    constructor(status) {
        super(`Fallback request failed with status ${status}`);
        this.name = 'FallbackRequestError';
    }
}

export async function fetchWithFallback() {
    try {
        const response = await fetch(unavailableResourceUrl);

        if (!response.ok) {
            throw new Error(`Primary request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log(`Primary service is unavailable: ${error.message}`);
        return fetchFromAvailableResource();
    }
}

async function fetchFromAvailableResource() {
    const response = await fetch(availableResourceUrl);

    if (!response.ok) {
        throw new FallbackRequestError(response.status);
    }

    return await response.json();
}
