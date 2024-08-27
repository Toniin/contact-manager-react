import {z} from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, {message: "Please enter name"}),
    phoneNumber: z.string().min(9, {message: "Please enter valid phone number"})
})

export type Contact = z.infer<typeof contactSchema>;