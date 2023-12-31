import { z } from "zod";

export const NewsletterValidator = z.object({
  email: z.string().email(),
});

export type FormData = z.infer<typeof NewsletterValidator>;
