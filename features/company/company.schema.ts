import { z } from "zod";

// * Company Schema
export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  contactPerson: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  isActive: z.any().optional(), // * Handle default in form level
  logo: z.any().optional(),
});

export type CompanyFormInput = z.infer<typeof companySchema>;
