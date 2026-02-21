import { z } from "zod";

// * Service Type Schema
export const serviceTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameOther: z.string().optional(),
  description: z.string().optional(),
  isActive: z.any().optional(),
});

export type ServiceTypeFormInput = z.infer<typeof serviceTypeSchema>;
