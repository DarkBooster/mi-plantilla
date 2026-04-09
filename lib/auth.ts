import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resend } from "./resend";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Mi Plantilla <onboarding@resend.dev>",
        to: user.email,
        subject: "Restablecer contraseña",
        html: `
          <h2>Restablecer contraseña</h2>
          <p>Hola ${user.name}, hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href="${url}" style="background:#18181b;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">
            Restablecer contraseña
          </a>
          <p style="color:#71717a;font-size:14px;margin-top:16px;">Si no solicitaste esto, ignorá este email.</p>
        `,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
    },
  },
});