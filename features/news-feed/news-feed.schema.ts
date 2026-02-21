import { z } from "zod";

// * News Feed Schema
export const newsFeedSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().optional(),
  isActive: z.any().optional(),
});

export type NewsFeedFormInput = z.infer<typeof newsFeedSchema>;
