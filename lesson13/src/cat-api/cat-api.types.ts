export interface CatBreed {
    id: string;
    name: string;
    temperament?: string;
    reference_image_id?: string;
    image?: CatImage;
}

export interface CatImage {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: CatBreed[];
    categories?: unknown[];
}

export interface CreateVoteRequest {
    image_id: string;
    sub_id: string;
    value: 1 | -1;
}

export interface CatVote {
    id: number;
    image_id: string;
    sub_id: string;
    value: number;
    country_code?: string;
    image?: Partial<CatImage>;
}

export interface CreateFavouriteRequest {
    image_id: string;
    sub_id: string;
}

export interface CreateFavouriteResponse {
    message: string;
    id: number;
}

export interface CatFavourite {
    id: number;
    user_id?: string;
    image_id: string;
    sub_id?: string;
    created_at?: string;
    image?: Partial<CatImage>;
}
