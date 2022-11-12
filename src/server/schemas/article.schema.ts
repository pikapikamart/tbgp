import z, { TypeOf } from "zod"


export const searchSchema = z
  .object({
    query: z
      .string({ required_error: "Search query is required" })
      .min(1, "Search query should not be empty"),
    paginate: z.object({
      number: z.number({ required_error: "Pagination number is required" }),
      lastId: z.any({ required_error: "Document's last id is required" })
    }).optional()
  })

export type SearchSchema = TypeOf<typeof searchSchema>