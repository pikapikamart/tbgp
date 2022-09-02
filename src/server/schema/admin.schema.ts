import { TypeOf, z } from "zod";


export const createAdminSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  email: z.string({ required_error: "Email is required" })
    .email({ message: "Use a proper email" }),
  password: z.string({ required_error: "Password is require" })
    .min(10, "Should have 10 minimum character")
})

export type CreateAdminSchema = TypeOf<typeof createAdminSchema>;