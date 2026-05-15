import { z } from "zod";

export const registerSchema = z
  .object({
    tipo_conta: z.enum(["C", "P"]),
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Formato de e-mail inválido"),
    whatsapp: z.string().min(10, "Informe um número de telefone válido"),
    nome_propriedade: z.string().optional(),
    endereco_rural: z.string().optional(),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número")
      .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.tipo_conta !== "P") {
      return;
    }

    if (!data.nome_propriedade?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe o nome da propriedade",
        path: ["nome_propriedade"],
      });
    }

    if (!data.endereco_rural?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe o endereço rural",
        path: ["endereco_rural"],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
