import { z } from "zod";
export const signUpSchema = z.object({
    username: z.string(),
    password: z.string(),
    type: z.enum(["admin", "user"]),
});

export const signInSchema = z.object({
    username: z.string(),
    password: z.string(),
});
