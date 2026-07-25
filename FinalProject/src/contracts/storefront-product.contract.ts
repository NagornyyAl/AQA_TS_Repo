import { z } from 'zod';

export const UlidSchema = z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, 'Expected a 26-character ULID');

const StorefrontBrandSchema = z
    .object({
        id: UlidSchema,
        name: z.string().trim().min(1)
    })
    .passthrough();

const StorefrontCategorySummarySchema = z
    .object({
        id: UlidSchema,
        name: z.string().trim().min(1),
        parent_id: UlidSchema.nullable().optional()
    })
    .passthrough();

const StorefrontCategorySchema = StorefrontCategorySummarySchema.extend({
    slug: z.string().trim().min(1)
});

const StorefrontProductImageSchema = z
    .object({
        id: UlidSchema,
        file_name: z.string().trim().min(1),
        title: z.string().trim().min(1)
    })
    .passthrough();

const StorefrontProductBaseSchema = z
    .object({
        id: UlidSchema,
        name: z.string().trim().min(1),
        description: z.string().trim().min(1),
        price: z.number().finite().nonnegative(),
        is_location_offer: z.boolean(),
        is_rental: z.boolean(),
        in_stock: z.boolean(),
        is_eco_friendly: z.boolean(),
        product_image: StorefrontProductImageSchema,
        brand: StorefrontBrandSchema
    })
    .passthrough();

export const StorefrontCatalogueProductSchema = StorefrontProductBaseSchema.extend({
    co2_rating: z.enum(['A', 'B', 'C', 'D', 'E']),
    category: StorefrontCategorySchema
});

export const StorefrontSearchProductSchema = StorefrontProductBaseSchema.extend({
    co2_rating: z.enum(['A', 'B', 'C', 'D', 'E']),
    category: StorefrontCategorySummarySchema
});

export const StorefrontProductDetailSchema = StorefrontCatalogueProductSchema.extend({
    specs: z.array(z.unknown())
});

const StorefrontPaginationSchema = z
    .object({
        current_page: z.number().int().nonnegative(),
        from: z.number().int().positive().nullable(),
        last_page: z.number().int().positive(),
        per_page: z.number().int().positive(),
        to: z.number().int().positive().nullable(),
        total: z.number().int().nonnegative()
    })
    .passthrough();

export const StorefrontPaginatedProductsSchema = StorefrontPaginationSchema.extend({
    data: z.array(StorefrontCatalogueProductSchema)
});

export const StorefrontPaginatedSearchSchema = StorefrontPaginationSchema.extend({
    data: z.array(StorefrontSearchProductSchema)
});

export const StorefrontRelatedProductSchema = StorefrontProductBaseSchema.extend({
    category: StorefrontCategorySummarySchema
});

export const parseStorefrontPaginatedProducts = (payload: unknown): z.infer<typeof StorefrontPaginatedProductsSchema> =>
    StorefrontPaginatedProductsSchema.parse(payload);
export const parseStorefrontPaginatedSearch = (payload: unknown): z.infer<typeof StorefrontPaginatedSearchSchema> =>
    StorefrontPaginatedSearchSchema.parse(payload);
export const parseStorefrontProduct = (payload: unknown): z.infer<typeof StorefrontProductDetailSchema> =>
    StorefrontProductDetailSchema.parse(payload);
export const parseStorefrontRelatedProducts = (payload: unknown): z.infer<typeof StorefrontRelatedProductSchema>[] =>
    z.array(StorefrontRelatedProductSchema).parse(payload);
