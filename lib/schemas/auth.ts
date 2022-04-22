import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
export type TLoginFormData = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty(),
});
export type TRegisterFormData = z.infer<typeof registerFormSchema>
