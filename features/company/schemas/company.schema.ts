// features/company/schemas/company.schema.ts
import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  status: z.boolean().default(false),
  logo: z.instanceof(File).optional(),
});

export type CompanyFormInput = z.infer<typeof companySchema>;
