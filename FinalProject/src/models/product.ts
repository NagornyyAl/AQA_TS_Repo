export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brand: {
        id: number;
        name: string;
        slug: string;
    };
    category: {
        id: number;
        parent_id: number | null;
        name: string;
        slug: string;
    };
    product_image: {
        id: number;
        file_name: string;
        title: string;
    };
}

export interface PaginatedProducts {
    current_page: number;
    data: Product[];
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}

export interface ProductSummary {
    id: number;
    name: string;
    description: string;
    price: number;
    product_image: Product['product_image'];
}

export type PaginatedProductSearch = Omit<PaginatedProducts, 'data'> & {
    data: ProductSummary[];
};
