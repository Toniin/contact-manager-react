import {z} from "zod";

export const userSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter username"
    }),
    isSignIn: z.boolean(),
})

export const signUpSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter username"
    }),
    password: z.string().min(1, {
        message: "Please enter password"
    }),
    role: z.enum(["USER", "ADMIN"], {
        required_error: "You need to select a role.",
    }),
})

export const signInSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter username"
    }),
    password: z.string().min(1, {
        message: "Please enter password"
    })
})

export type SignUpFormUser = z.infer<typeof signUpSchema>;

export type SignInFormUser = z.infer<typeof signInSchema>;

export type User = z.infer<typeof userSchema>;