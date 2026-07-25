import { z } from 'zod';

const positiveId = z.number().int().positive();

export const BrandSchema = z
    .object({
        id: positiveId,
        name: z.string().trim().min(1),
        slug: z.string().trim().min(1)
    })
    .passthrough();

export const CategorySchema = z
    .object({
        id: positiveId,
        parent_id: z.number().int().positive().nullable(),
        name: z.string().trim().min(1),
        slug: z.string().trim().min(1)
    })
    .passthrough();

export const ProductImageSchema = z
    .object({
        id: positiveId,
        file_name: z.string().trim().min(1),
        title: z.string().trim().min(1)
    })
    .passthrough();

export const ProductSchema = z
    .object({
        id: positiveId,
        name: z.string().trim().min(1),
        description: z.string().trim().min(1),
        price: z.number().finite().nonnegative(),
        brand: BrandSchema,
        category: CategorySchema,
        product_image: ProductImageSchema
    })
    .passthrough();

export const ProductSummarySchema = z
    .object({
        id: positiveId,
        name: z.string().trim().min(1),
        description: z.string().trim().min(1),
        price: z.number().finite().nonnegative(),
        product_image: ProductImageSchema
    })
    .passthrough();

const PaginationSchema = z
    .object({
        current_page: z.number().int().positive(),
        from: z.number().int().positive().nullable(),
        last_page: z.number().int().positive(),
        per_page: z.number().int().positive(),
        to: z.number().int().positive().nullable(),
        total: z.number().int().positive()
    })
    .passthrough();

export const PaginatedProductsSchema = PaginationSchema.extend({
    data: z.array(ProductSchema).min(1)
});

export const PaginatedProductSearchSchema = PaginationSchema.extend({
    data: z.array(ProductSummarySchema).min(1)
});

export const ApiErrorSchema = z
    .object({
        message: z.string().trim().min(1)
    })
    .passthrough();

export const parseProduct = (payload: unknown): z.infer<typeof ProductSchema> => ProductSchema.parse(payload);
export const parsePaginatedProducts = (payload: unknown): z.infer<typeof PaginatedProductsSchema> => PaginatedProductsSchema.parse(payload);
export const parsePaginatedProductSearch = (payload: unknown): z.infer<typeof PaginatedProductSearchSchema> =>
    PaginatedProductSearchSchema.parse(payload);
export const parseProducts = (payload: unknown): z.infer<typeof ProductSchema>[] => z.array(ProductSchema).parse(payload);
export const parseApiError = (payload: unknown): z.infer<typeof ApiErrorSchema> => ApiErrorSchema.parse(payload);
