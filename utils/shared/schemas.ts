import { z } from "zod";

// * Auth Schema
export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    username: z.string().min(1, t("username") + " is required"),
    password: z.string().min(1, t("password") + " is required"),
  });
};
export type LoginFormInput = z.infer<ReturnType<typeof createLoginSchema>>;

// * Company Schema
export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  isActive: z.any().optional(),
  logo: z.any().refine((val) => !!val, "Logo is required"),
});
export type CompanyFormInput = z.infer<typeof companySchema>;

// * Service Type Schema
export const serviceTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameOther: z.string().optional(),
  description: z.string().optional(),
  isActive: z.any().optional(),
});
export type ServiceTypeFormInput = z.infer<typeof serviceTypeSchema>;

// * Customer Type Schema
export const customerTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameOther: z.string().optional(),
  description: z.string().optional(),
  isActive: z.any().optional(),
});
export type CustomerTypeFormInput = z.infer<typeof customerTypeSchema>;

// * News Feed Schema
export const newsFeedSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().optional(),
  isActive: z.any().optional(),
});
export type NewsFeedFormInput = z.infer<typeof newsFeedSchema>;
