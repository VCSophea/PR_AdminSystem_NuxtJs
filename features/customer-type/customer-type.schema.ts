import { z } from "zod";

// * Customer Type Schema
export const customerTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameOther: z.string().optional(),
  description: z.string().optional(),
  isActive: z.any().optional(),
});

export type CustomerTypeFormInput = z.infer<typeof customerTypeSchema>;
