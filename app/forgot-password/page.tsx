"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <main className="max-w-sm mx-auto px-6 py-20 flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold">Revisá tu email</h1>
        <p className="text-zinc-500">
          Si el email existe en nuestra base de datos, recibirás un enlace para
          restablecer tu contraseña.
        </p>
        <Link href="/login" className="text-sm underline text-zinc-500">
          Volver al login
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-20 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Olvidé mi contraseña</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Ingresá tu email y te enviaremos un enlace para restablecerla.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>
      <Link
        href="/login"
        className="text-sm underline text-zinc-500 text-center"
      >
        Volver al login
      </Link>
    </main>
  );
}
