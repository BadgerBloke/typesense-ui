import { record, z } from 'zod';

export const OverridesSchema = z.object({
    id: z.string().optional(),
    curateByQuery: z.boolean(), // only for ui controls
    curateByFilter: z.boolean(), // only for ui controls
    curateByTags: z.boolean(), // only for ui controls
    rule: z.object({
        query: z.string(),
        match: z.enum(['exact', 'contains']),
        filter_by: z.string(),
        tags: z.array(z.string()),
    }),
    pinDocuments: z.boolean(), // only for ui controls
    includes: z.array(z.object({ id: z.string(), position: z.string().transform(Number) })),
    hideDocuments: z.boolean(), // only for ui controls
    excludes: z.array(z.object({ id: z.string() })),
    filterDocuments: z.boolean(), // only for ui controls
    filter_by: z.string(),
    sortDocuments: z.boolean(), // only for ui controls
    sort_by: z.string(),
    replaceDocuments: z.boolean(), // only for ui controls
    replace_query: z.string(),
    customMetadata: z.boolean(), // only for ui controls
    metadata: z.string().transform(record),
    remove_matched_tokens: z.boolean(),
    filter_curated_hits: z.boolean(),
    stop_processing: z.boolean(),
    effectiveFrom: z.boolean(), // only for ui controls
    effective_from_ts: z.string().transform(Number),
    effectiveTo: z.boolean(), // only for ui controls
    effective_to_ts: z.string().transform(Number),
});

export type OverridesType = z.infer<typeof OverridesSchema>;
