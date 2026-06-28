import { HttpError, parseResponseBody } from '../shared/http-error';
import {
    CatBreed,
    CatFavourite,
    CatImage,
    CatVote,
    CreateFavouriteRequest,
    CreateFavouriteResponse,
    CreateVoteRequest
} from './cat-api.types';

interface CatApiClientOptions {
    baseUrl?: string;
    apiKey: string;
}

interface SearchImagesOptions {
    breedIds?: string;
    hasBreeds?: boolean;
    limit?: number;
}

export class CatApiClient {
    private readonly baseUrl: string;

    public constructor(private readonly options: CatApiClientOptions) {
        this.baseUrl = options.baseUrl ?? 'https://api.thecatapi.com/v1';
    }

    public searchBreeds(query: string, attachImage = true): Promise<CatBreed[]> {
        return this.request<CatBreed[]>('/breeds/search', {
            searchParams: {
                q: query,
                attach_image: attachImage ? '1' : '0'
            }
        });
    }

    public getBreed(breedId: string): Promise<CatBreed> {
        return this.request<CatBreed>(`/breeds/${encodeURIComponent(breedId)}`);
    }

    public searchImages(options: SearchImagesOptions): Promise<CatImage[]> {
        return this.request<CatImage[]>('/images/search', {
            searchParams: {
                limit: String(options.limit ?? 1),
                has_breeds: options.hasBreeds ? 'true' : 'false',
                ...(options.breedIds ? { breed_ids: options.breedIds } : {})
            }
        });
    }

    public createVote(body: CreateVoteRequest): Promise<CatVote> {
        return this.request<CatVote>('/votes', {
            method: 'POST',
            body
        });
    }

    public listVotes(subId?: string): Promise<CatVote[]> {
        return this.request<CatVote[]>('/votes', {
            searchParams: {
                limit: '100',
                ...(subId ? { sub_id: subId } : {})
            }
        });
    }

    public deleteVote(voteId: number): Promise<unknown> {
        return this.request(`/votes/${voteId}`, {
            method: 'DELETE'
        });
    }

    public createFavourite(body: CreateFavouriteRequest): Promise<CreateFavouriteResponse> {
        return this.request<CreateFavouriteResponse>('/favourites', {
            method: 'POST',
            body
        });
    }

    public getFavourite(favouriteId: number): Promise<CatFavourite> {
        return this.request<CatFavourite>(`/favourites/${favouriteId}`);
    }

    public listFavourites(subId?: string): Promise<CatFavourite[]> {
        return this.request<CatFavourite[]>('/favourites', {
            searchParams: {
                limit: '100',
                ...(subId ? { sub_id: subId } : {})
            }
        });
    }

    public deleteFavourite(favouriteId: number): Promise<unknown> {
        return this.request(`/favourites/${favouriteId}`, {
            method: 'DELETE'
        });
    }

    private async request<T>(
        path: string,
        options: {
            method?: 'GET' | 'POST' | 'DELETE';
            body?: unknown;
            searchParams?: Record<string, string>;
        } = {}
    ): Promise<T> {
        const url = new URL(`${this.baseUrl}${path}`);

        for (const [key, value] of Object.entries(options.searchParams ?? {})) {
            url.searchParams.set(key, value);
        }

        const response = await fetch(url, {
            method: options.method ?? 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': this.options.apiKey
            },
            body: options.body === undefined ? undefined : JSON.stringify(options.body)
        });
        const responseBody = await parseResponseBody(response);

        if (!response.ok) {
            throw new HttpError(
                `Cat API request failed: ${response.status} ${response.statusText}`,
                response.status,
                responseBody
            );
        }

        return responseBody as T;
    }
}
