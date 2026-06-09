import { z } from "zod";

export const CSchema = z.object({
    prompt: z.string()
        .trim()
        .min(1, "A Prompt is Required!")
        .max(1000, "Max 1000 Characters."),
    convId: z.uuid()
});

export type CType = z.infer<typeof CSchema>;


