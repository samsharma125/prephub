import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  role: z.enum(["student", "admin"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["student", "admin"]),
});
