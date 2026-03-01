"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "./cart-provider";
import { ShoppingCart } from "lucide-react";

export function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  const initials = session?.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">
        Mi Plantilla
      </Link>
      <div className="flex items-center gap-3">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-zinc-500">
                {session.user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/orders")}>
                Mis pedidos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/login")}
            >
              Iniciar sesión
            </Button>
            <Button size="sm" onClick={() => router.push("/register")}>
              Registrarse
            </Button>
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/cart")}
          className="relative"
        >
          <ShoppingCart className="h-4 w-4" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
