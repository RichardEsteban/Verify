"use client";

import { useEffect, useMemo, useState } from "react";
import { DealTable } from "@/app/components/deals/DealTable";
import { fetchMyDeals } from "@/app/lib/verify/api";
import type { Deal, DealStatus } from "@/app/lib/verify/types";
import { Loading } from "@/app/components/common/Loading";

const FILTERS: Array<{ id: "all" | DealStatus; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "escrowed", label: "Escrow" },
  { id: "arbitrating", label: "Arbitrando" },
  { id: "disputed", label: "Disputa" },
  { id: "completed", label: "Completados" },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[] | null>(null);
  const [status, setStatus] = useState<"all" | DealStatus>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    setDeals(null);
    fetchMyDeals({ status, q }).then(setDeals);
  }, [status, q]);

  const pages = useMemo(() => {
    if (!deals) return 1;
    return Math.max(1, Math.ceil(deals.length / pageSize));
  }, [deals]);

  const slice = deals?.slice((page - 1) * pageSize, page * pageSize) ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 rise-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Deals</h1>
        <p className="text-sm text-muted">Todos tus tratos, del escrow al payout.</p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          placeholder="Buscar servicio, id o cliente"
          className="field md:max-w-sm"
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
        />
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={status === f.id}
              onClick={() => {
                setPage(1);
                setStatus(f.id);
              }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                status === f.id ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      {!deals ? <Loading /> : <DealTable deals={slice} />}
      <div className="flex items-center justify-end gap-3 text-sm">
        <button type="button" disabled={page <= 1} className="btn-ghost !px-4 !py-2" onClick={() => setPage((p) => p - 1)}>
          Anterior
        </button>
        <span className="font-semibold tabular-nums text-muted">
          {page}/{pages}
        </span>
        <button type="button" disabled={page >= pages} className="btn-ghost !px-4 !py-2" onClick={() => setPage((p) => p + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
