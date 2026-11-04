"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { DealCard } from "@/app/components/deals/DealCard";
import { StatsCard } from "@/app/components/charts/StatsCard";
import { Loading } from "@/app/components/common/Loading";
import { ArrowRightIcon, ChartIcon, CheckIcon, CopyIcon, DealsIcon, EyeIcon, EyeOffIcon, WalletIcon } from "@/app/components/common/Icons";
import { fetchMyDeals, fetchStats } from "@/app/lib/verify/api";
import { getUser } from "@/app/lib/verify/auth";
import type { AnalyticsStats, Deal, User } from "@/app/lib/verify/types";

const ACTIONS = [
  { href: "/dashboard/withdraw", label: "Retirar", icon: WalletIcon },
  { href: "/dashboard/deals", label: "Mis deals", icon: DealsIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartIcon },
];

function splitAmount(amount: number) {
  const [int, dec = "00"] = amount.toFixed(2).split(".");
  return { int: Number(int).toLocaleString("en-US"), dec };
}

function BalanceCard({ total, user }: { total: number; user: User | null }) {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);
  const { int, dec } = splitAmount(total);
  const account = user?.wallet_address || user?.whatsapp_number || "—";

  async function copy() {
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      toast.success("Copiado al portapapeles");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("No se pudo copiar");
    }
  }

  return (
    <section className="hero-card p-6 md:p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/70">Total ganado</p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-wide text-lime">USDT</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <p className="text-5xl font-extrabold tracking-tight tabular-nums md:text-6xl">
          {hidden ? (
            "••••••"
          ) : (
            <>
              <span className="text-white/60">$</span>
              {int}
              <span className="text-white/45">.{dec}</span>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => setHidden((h) => !h)}
          aria-label={hidden ? "Mostrar saldo" : "Ocultar saldo"}
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          {hidden ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3 pl-4 backdrop-blur">
        <div className="min-w-0">
          <p className="text-[11px] text-white/60">{user?.wallet_address ? "Wallet custodial WDK" : "Cuenta WhatsApp"}</p>
          <p className="truncate font-mono text-sm font-semibold">{account}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-xs font-bold text-[#0a2a1e] transition active:scale-95"
        >
          {copied ? <CheckIcon width={15} height={15} strokeWidth={2.4} /> : <CopyIcon width={15} height={15} />}
          {copied ? "Listo" : "Copiar"}
        </button>
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <section className="card grid grid-cols-3 gap-2 p-5">
      {ACTIONS.map((a) => (
        <Link key={a.href} href={a.href} className="group flex flex-col items-center gap-2.5 rounded-2xl py-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-[#0a2a1e] shadow-[0_8px_16px_-8px_rgba(124,160,0,0.9)] transition group-hover:scale-105 group-active:scale-95">
            <a.icon width={22} height={22} strokeWidth={2} />
          </span>
          <span className="text-xs font-bold">{a.label}</span>
        </Link>
      ))}
    </section>
  );
}

function SuccessBanner({ rate }: { rate: number }) {
  return (
    <section className="relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-accent p-6">
      <div className="relative z-10 max-w-[60%]">
        <p className="text-lg font-extrabold leading-snug">Tus deals cierran con garantía.</p>
        <p className="mt-1 text-sm text-muted">Tasa de éxito con arbitraje por IA.</p>
        <Link href="/dashboard/deals" className="btn-primary mt-4 !px-4 !py-2.5 text-xs">
          Ver deals <ArrowRightIcon width={15} height={15} />
        </Link>
      </div>
      <p
        aria-label={`${rate}% de éxito`}
        className="select-none text-7xl font-black leading-none tracking-tighter text-primary drop-shadow-[4px_6px_0_rgba(198,244,50,0.9)] md:text-8xl"
      >
        {rate}
        <span className="text-5xl md:text-6xl">%</span>
      </p>
    </section>
  );
}

export default function DashboardPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
    fetchMyDeals().then(setDeals);
    fetchStats().then(setStats);
  }, []);

  if (!stats) return <Loading />;

  return (
    <div className="mx-auto max-w-6xl space-y-6 rise-in">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <BalanceCard total={stats.total_earned} user={user} />
          <div className="grid gap-4 sm:grid-cols-3">
            <StatsCard label="Deals completados" value={String(stats.deals_completed)} />
            <StatsCard label="Rating" value={stats.rating.toFixed(1)} hint="sobre 5" />
            <StatsCard label="Tiempo a payout" value={stats.avg_time_to_payout > 0 ? `${stats.avg_time_to_payout} min` : "—"} hint={`${stats.success_rate}% éxito`} />
          </div>
        </div>
        <div className="space-y-6">
          <QuickActions />
          <SuccessBanner rate={Math.round(stats.success_rate)} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <h2 className="text-lg font-extrabold">Actividad reciente</h2>
        <Link href="/dashboard/deals" className="text-sm font-bold text-primary hover:underline">
          Ver todo
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {deals.map((d) => (
          <DealCard key={d.id} deal={d} />
        ))}
        {deals.length === 0 && (
          <p className="card col-span-full p-8 text-center text-sm text-muted">
            Aún no tienes deals. Escribe <b>/crear_deal</b> al bot de WhatsApp para empezar.
          </p>
        )}
      </div>
    </div>
  );
}
