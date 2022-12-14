import z, { TypeOf } from "zod"


export const baseArticlePaginateSchema = z.object({
  lastId: z.any({ required_error: "Document's last id is required" }),
  number: z.number({ required_error: "Pagination number is required" })
}).optional()

export const searchSchema = z
  .object({
    query: z
      .string({ required_error: "Search query is required" })
      .min(1, "Search query should not be empty"),
    paginate: baseArticlePaginateSchema
})

export const visitAuthorSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username should not be empty")
  })

export const viewArticleSchema = z.object({
  linkPath: z
    .string({ required_error: "Linkpath is required" })
    .min(1, "Linkpath should not be empty"),
  fingerprint: z
    .string({ required_error: "Fingerprint is required" })
    .min(1, "Fingerprint should not be empty")
})

export const moreCategoryArticlesSchema = z.object({
  category: z 
    .string({ required_error: "Category is required" })
    .min(1, "Category should not be empty"),
  paginate: baseArticlePaginateSchema
})

export const paginateAuthorSchema = z.object({
  paginate: baseArticlePaginateSchema,
  id: z
    .string({ required_error: "Author Id is required" })
    .min(1, "Author Id should not be empty"),
})

export type SearchSchema = TypeOf<typeof searchSchema>
export type BaseArticlePaginateSchema = TypeOf<typeof baseArticlePaginateSchema>
export type VisitAuthorSchema = TypeOf<typeof visitAuthorSchema>
export type ViewArticleSchema = TypeOf<typeof viewArticleSchema>
export type MoreCategoryArticlesSchema = TypeOf<typeof moreCategoryArticlesSchema>
export type PaginateAuthorArticleSchema = TypeOf<typeof paginateAuthorSchema>