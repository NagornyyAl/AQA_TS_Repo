export class HttpError extends Error {
    public constructor(
        message: string,
        public readonly status: number,
        public readonly responseBody: unknown
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

export async function parseResponseBody(response: Response): Promise<unknown> {
    const text = await response.text();

    if (text.trim().length === 0) {
        return undefined;
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}
