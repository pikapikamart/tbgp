import { TypeOf, z } from "zod";


export const baseUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Use a proper email" }),
  password: z
    .string({ required_error: "Password is require" })
    .min(1, "Password should not be empty")
})

export type BaseUserSchema = TypeOf<typeof baseUserSchema>;