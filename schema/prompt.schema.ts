import { z } from "zod";

export const CreatePromptSchema = z.object({
  prompt: z
    .string()
    .min(10, "Prompt must be at least 10 characters long.")
    .max(500, "Prompt cannot exceed 500 characters."),
  tag: z
    .string()
    .min(1, "Tag is required.")
    .min(3, 'Tag must be at least 3 letters.')
    .max(50, "Tag cannot exceed 50 characters."),
  private: z.string().transform((val) => val === "private"),
});

export type FormDataType = z.infer<typeof CreatePromptSchema>;

export type PromptActionState = FormActionState<FormDataType>;

