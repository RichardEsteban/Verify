import Link from "next/link";
import { LogoMark } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <LogoMark />
          Verify
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/login" className="hidden rounded-full px-4 py-2 font-medium text-muted hover:text-foreground sm:block">
            Entrar
          </Link>
          <Link href="/dashboard" className="btn-primary !py-2.5">
            Dashboard
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-8 text-center text-xs text-muted">
      Verify · garantía P2P con arbitraje por IA · Kapso + WDK
    </footer>
  );
}
