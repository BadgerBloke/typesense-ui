import { z } from 'zod';

export const MatchEnum = z.enum(['exact', 'contains']);

export const OverridesSchema = z
    .object({
        id: z.string(),
        rule: z
            .object({
                curateByQuery: z.boolean().default(false).optional(), // only for ui controls
                curateByFilter: z.boolean().default(false).optional(), // only for ui controls
                curateByTags: z.boolean().default(false).optional(), // only for ui controls
                query: z.string().optional(),
                match: MatchEnum.optional(),
                filter_by: z.string().optional(),
                tags: z.array(z.string()).optional(),
            })
            .optional()
            .refine(
                data => {
                    return (
                        data?.curateByQuery !== undefined ||
                        data?.curateByFilter !== undefined ||
                        data?.curateByTags !== undefined
                    );
                },
                {
                    message:
                        'At least one of "Curate by Search Query", "Curate by Filter", or "Curate by Tags" must be provided',
                    path: ['curateByQuery'],
                }
            )
            .refine(
                data => {
                    if (data?.curateByQuery) {
                        return Boolean(data.query && data.match);
                    }
                    return true;
                },
                { message: 'Search by field is required', path: ['query'] }
            )
            .refine(
                data => {
                    if (data?.curateByFilter) {
                        return Boolean(data.filter_by);
                    }
                    return true;
                },
                { message: 'Filter by is required', path: ['filter_by'] }
            )
            .refine(
                data => {
                    if (data?.curateByTags) {
                        return Boolean(data.tags && data.tags.length);
                    }
                    return true;
                },
                { message: 'Tags is required', path: ['tags'] }
            ),
        pinDocuments: z.boolean().default(false).optional(), // only for ui controls
        includes: z
            .array(z.object({ id: z.string(), position: z.union([z.number(), z.string().transform(Number)]) }))
            .optional(),
        hideDocuments: z.boolean().default(false).optional(), // only for ui controls
        excludes: z.array(z.object({ id: z.string() })).optional(),
        filterDocuments: z.boolean().default(false).optional(), // only for ui controls
        filter_by: z.string().optional(),
        sortDocuments: z.boolean().default(false).optional(), // only for ui controls
        sort_by: z.string().optional(),
        replaceDocuments: z.boolean().default(false).optional(), // only for ui controls
        replace_query: z.string().optional(),
        customMetadata: z.boolean().default(false).optional(), // only for ui controls
        metadata: z.string().optional(),
        remove_matched_tokens: z.boolean().default(false).optional(),
        filter_curated_hits: z.boolean().default(false).optional(),
        stop_processing: z.boolean().default(false).optional(),
        effectiveFrom: z.boolean().default(false).optional(), // only for ui controls
        effective_from_ts: z.union([z.date().transform(date => Math.floor(date.getTime() / 1000)), z.number()]).optional(),
        effectiveTo: z.boolean().default(false).optional(), // only for ui controls
        effective_to_ts: z.union([z.date().transform(date => Math.floor(date.getTime() / 1000)), z.number()]).optional(),
    })
    .refine(
        data => {
            if (
                !data.pinDocuments &&
                !data.hideDocuments &&
                !data.customMetadata &&
                !data.filterDocuments &&
                !data.sortDocuments &&
                !data.remove_matched_tokens &&
                !data.replaceDocuments
            ) {
                return false;
            }
            return true;
        },
        {
            message:
                'At least one of `includes`, `excludes`, `metadata`, `filter_by`, `sort_by`, `remove_matched_tokens`, `replace_query` should be present',
            path: ['pinDocuments'],
        }
    )
    .refine(
        data => {
            if (data.pinDocuments) {
                return Boolean(data.includes?.length);
            }
            return true;
        },
        { message: 'Pin document id is required', path: ['includes'] }
    )
    .refine(
        data => {
            if (data.hideDocuments) {
                return Boolean(data.excludes?.length);
            }
            return true;
        },
        { message: 'Hidding document id is required', path: ['excludes'] }
    )
    .refine(
        data => {
            if (data.replaceDocuments) {
                return Boolean(data.replace_query);
            }
            return true;
        },
        { message: 'Replace query is required', path: ['replace_query'] }
    )
    .refine(
        data => {
            if (data.customMetadata) {
                if (data.metadata) {
                    try {
                        const schema = z.record(z.union([z.string(), z.number()]));
                        const result = schema.safeParse(JSON.parse(data.metadata.convertToJson()));
                        return result.success;
                    } catch (error) {
                        return false;
                    }
                }
                return false;
            }
            return true;
        },
        { message: 'Metadata needs to be a valid Object', path: ['metadata'] }
    )
    .refine(
        data => {
            if (data.filterDocuments) {
                return !!data.filter_by;
            }
            return true;
        },
        { message: 'Filter by is required', path: ['filter_by'] }
    )
    .refine(
        data => {
            if (data.sortDocuments) {
                return !!data.sort_by;
            }
            return true;
        },
        { message: 'Sort by is required', path: ['sort_by'] }
    )
    .refine(
        data => {
            if (data.effectiveFrom) {
                return !!data.effective_from_ts;
            }
            return true;
        },
        { message: 'Effective from date is required', path: ['effective_from_ts'] }
    )
    .refine(
        data => {
            if (data.effectiveTo) {
                return !!data.effective_to_ts;
            }
            return true;
        },
        { message: 'Effective to date is required', path: ['effective_to_ts'] }
    )
    .refine(
        data => {
            if (data.effectiveFrom && data.effectiveTo) {
                return data.effective_from_ts! < data.effective_to_ts!;
            }
            return true;
        },
        { message: 'Effective to date cannot be before Effective from date', path: ['effective_to_ts'] }
    );

export type OverridesType = z.infer<typeof OverridesSchema>;
