export interface CatBreedWeight {
    imperial: string;
    metric: string;
}

export interface CatImageSummary {
    id: string;
    url: string;
    width?: number;
    height?: number;
}

export interface CatBreed {
    weight: CatBreedWeight;
    id: string;
    name: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    indoor: number;
    lap?: number;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    wikipedia_url?: string;
    hypoallergenic: number;
    reference_image_id: string;
    image?: CatImageSummary;
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
    image?: CatImageSummary;
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
    image?: CatImageSummary;
}
