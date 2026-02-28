"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      setError(error.message ?? "Error al registrarse");
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}