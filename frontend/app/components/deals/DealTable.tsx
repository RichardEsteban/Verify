"use client";

import Link from "next/link";
import type { Deal } from "@/app/lib/verify/types";
import { DEAL_STATUS_LABEL, cn, formatPen, statusTone } from "@/app/lib/verify/utils";
import { ArrowUpRightIcon, DealsIcon, ShieldIcon } from "@/app/components/common/Icons";

function Badge({ status }: { status: string }) {
  const tone = statusTone(status);
  const cls = tone === "ok" ? "chip-ok" : tone === "warn" ? "chip-warn" : "chip-muted";
  return (
    <span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold", cls)}>
      {DEAL_STATUS_LABEL[status as Deal["status"]] ?? status}
    </span>
  );
}

export function DealCard({ deal }: { deal: Deal }) {
  const done = deal.milestones.filter((m) => m.status === "completed").length;
  const total = deal.milestones.length || 1;
  const pct = deal.is_milestone_based ? Math.round((done / total) * 100) : deal.status === "completed" ? 100 : 40;

  return (
    <Link
      href={`/dashboard/deals/${deal.id}`}
      className="card group block p-4 transition hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          {deal.deal_type === "deposit" ? <ShieldIcon /> : <DealsIcon />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{deal.service}</p>
          <p className="truncate text-xs text-muted">
            {deal.deal_type === "deposit" ? "Huésped" : "Cliente"}: {deal.buyer.display_name}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <p className="font-extrabold tabular-nums">{formatPen(deal.amount_pen)}</p>
          <Badge status={deal.status} />
        </div>
      </div>
      {deal.is_milestone_based && (
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-muted">
            <span>
              Hito {Math.min(done + 1, total)}/{total}
            </span>
            <span className="tabular-nums">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-accent">
            <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </Link>
  );
}

export function DealTable({ deals }: { deals: Deal[] }) {
  return (
    <>
      {/* Móvil: lista de tarjetas */}
      <div className="space-y-3 md:hidden">
        {deals.map((d) => (
          <DealCard key={d.id} deal={d} />
        ))}
      </div>

      {/* Escritorio: tabla */}
      <div className="card hidden overflow-hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-accent/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3.5 font-bold">Deal</th>
              <th className="px-5 py-3.5 font-bold">Tipo</th>
              <th className="px-5 py-3.5 font-bold">Monto</th>
              <th className="px-5 py-3.5 font-bold">Estado</th>
              <th className="px-5 py-3.5 font-bold">Contraparte</th>
              <th className="w-10 px-3" />
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-t border-border transition hover:bg-accent/40">
                <td className="px-5 py-4">
                  <Link href={`/dashboard/deals/${deal.id}`} className="font-bold hover:underline">
                    {deal.service}
                  </Link>
                  <p className="text-xs text-muted">{deal.id}</p>
                </td>
                <td className="px-5 py-4 text-muted">
                  {deal.deal_type === "deposit" ? "Depósito" : deal.is_milestone_based ? "Hitos" : "Servicio"}
                </td>
                <td className="px-5 py-4 font-bold tabular-nums">{formatPen(deal.amount_pen)}</td>
                <td className="px-5 py-4">
                  <Badge status={deal.status} />
                </td>
                <td className="px-5 py-4 text-muted">{deal.buyer.display_name}</td>
                <td className="px-3 text-muted-foreground">
                  <ArrowUpRightIcon width={18} height={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deals.length === 0 && <p className="card px-4 py-10 text-center text-sm text-muted">No hay deals con estos filtros.</p>}
    </>
  );
}
