import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
  email: z.string()
    .email("Email inválido"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[a-zA-Z]/, "Debe tener al menos una letra")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[!@#$%^&*]/, "Debe tener al menos un carácter especial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const productSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres"),
  price: z.coerce.number().positive("Debe ser mayor a 0"),
  stock: z.coerce.number().int().min(0, "No puede ser negativo"),
  description: z.string().optional(),
  categoryId: z.string().optional(),
});

export type ProductForm = {
  name: string;
  price: number;
  stock: number;
  description?: string;
  categoryId?: string;
};