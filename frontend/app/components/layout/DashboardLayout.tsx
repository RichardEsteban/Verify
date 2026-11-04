"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, isAuthenticated, logout } from "@/app/lib/verify/auth";
import { cn } from "@/app/lib/verify/utils";
import type { User } from "@/app/lib/verify/types";
import { BellIcon, ChartIcon, DealsIcon, HomeIcon, LogoMark, LogoutIcon, UserIcon, WalletIcon } from "@/app/components/common/Icons";
import { useBackendStatus } from "@/app/lib/verify/useBackendStatus";
import { ThemeToggle } from "@/app/components/common/ThemeToggle";

const NAV = [
  { href: "/dashboard", label: "Inicio", icon: HomeIcon },
  { href: "/dashboard/deals", label: "Deals", icon: DealsIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartIcon },
  { href: "/dashboard/withdraw", label: "Retirar", icon: WalletIcon },
  { href: "/dashboard/profile", label: "Perfil", icon: UserIcon },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
}

function Avatar({ name }: { name?: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-base font-extrabold text-[#0a2a1e]">
      {(name?.trim()[0] ?? "V").toUpperCase()}
    </span>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const backend = useBackendStatus();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    setUser(getUser());
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-sm text-muted">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
        Cargando dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (escritorio) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-border bg-card px-4 py-6 md:flex">
        <Link href="/" className="mb-8 flex items-center gap-2.5 px-2 text-lg font-bold tracking-tight">
          <LogoMark />
          Verify
        </Link>
        <nav className="flex flex-1 flex-col gap-1.5">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition",
                  active ? "bg-primary text-primary-foreground" : "text-muted hover:bg-accent hover:text-foreground",
                )}
              >
                <item.icon width={20} height={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-3xl bg-accent p-4">
          <div className="flex items-center gap-3">
            <Avatar name={user?.display_name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{user?.display_name}</p>
              <p className="truncate text-xs text-muted">{user?.whatsapp_number}</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
          >
            <LogoutIcon width={18} height={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-background/80 px-5 py-4 backdrop-blur-xl md:px-10">
          <div className="flex items-center gap-3">
            <span className="md:hidden">
              <Avatar name={user?.display_name} />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-muted">Bienvenido de vuelta</p>
              <p className="text-base font-extrabold">{user?.display_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              role="status"
              className={cn(
                "hidden items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold sm:inline-flex",
                backend === "offline" ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  backend === "online" ? "bg-success" : backend === "offline" ? "bg-destructive" : "animate-pulse bg-muted-foreground",
                )}
              />
              {backend === "online" ? "Backend conectado" : backend === "offline" ? "Backend sin conexión" : "Conectando…"}
            </span>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Notificaciones"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:bg-accent"
            >
              <BellIcon />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
            </button>
          </div>
        </header>

        <main className="px-5 pb-32 pt-2 md:px-10 md:pb-12">{children}</main>
      </div>

      {/* Barra inferior flotante (móvil) */}
      <nav className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-full border border-border bg-card/95 p-1.5 shadow-[0_16px_40px_-12px_rgba(7,42,30,0.35)] backdrop-blur md:hidden">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-full px-3 py-2 text-[10px] font-bold transition-all",
                active ? "min-w-[64px] bg-lime text-[#0a2a1e]" : "min-w-[48px] text-muted",
              )}
            >
              <item.icon width={20} height={20} />
              {active && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
