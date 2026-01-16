import { z, defineCollection } from "astro:content";

const adkins = defineCollection({
  type: "content",
  schema: z.object({
    year: z.number(),
    edition: z.number(),
    date: z.string().optional(),
    theme: z.string().optional(),
    poster: z.string().optional(),
    highlights: z
      .object({
        best_picture: z.string().optional(),
        best_director: z.string().optional(),
        best_actor: z.string().optional(),
        best_actress: z.string().optional(),
      })
      .optional(),
  }),
});

const lists = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    updated: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { adkins, lists };
