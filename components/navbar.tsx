import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
      <span className="font-bold text-lg">Mi Plantilla</span>
      <ThemeToggle />
    </nav>
  );
}