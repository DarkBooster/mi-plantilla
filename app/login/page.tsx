"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message ?? "Error al iniciar sesión");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Iniciar sesión</Button>
            <p className="text-center text-sm text-zinc-500">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="underline text-zinc-900 dark:text-zinc-100">
                Regístrate
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}