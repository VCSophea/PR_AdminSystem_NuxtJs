// features/auth/auth.schema.ts
import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    username: z.string().min(1, t("username") + " is required"),
    password: z.string().min(1, t("password") + " is required"),
  });
};

export type LoginFormInput = z.infer<ReturnType<typeof createLoginSchema>>;
