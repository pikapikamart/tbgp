import z, { TypeOf } from "zod"


export const baseArticlePaginateSchema = z.object({
  number: z.number({ required_error: "Pagination number is required" }),
  lastId: z.any({ required_error: "Document's last id is required" })
}).optional()

export const searchSchema = z
  .object({
    query: z
      .string({ required_error: "Search query is required" })
      .min(1, "Search query should not be empty"),
    paginate: baseArticlePaginateSchema
})

export const visitAuthorSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(1, "Username should not be empty")
  })

export type SearchSchema = TypeOf<typeof searchSchema>
export type BaseArticlePaginateSchema = TypeOf<typeof baseArticlePaginateSchema>
export type VisitAuthorSchema = TypeOf<typeof visitAuthorSchema>