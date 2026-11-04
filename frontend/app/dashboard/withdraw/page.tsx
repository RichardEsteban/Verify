"use client";

import { useState } from "react";
import { confirmWithdraw, prepareWithdraw } from "@/app/lib/verify/api";
import { toast } from "sonner";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("200");
  const [method, setMethod] = useState<"kapso" | "internal">("kapso");
  const [account, setAccount] = useState("CCI 002-...-321");
  const [withdrawId, setWithdrawId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  async function prepare() {
    setBusy(true);
    try {
      const res = await prepareWithdraw(Number(amount), method, account);
      setWithdrawId(res.withdraw_id);
      toast.success("Retiro preparado. Ingresa el código 2FA mock (cualquier 6 dígitos).");
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    if (!withdrawId) return;
    setBusy(true);
    try {
      const res = await confirmWithdraw(withdrawId, code);
      toast.success(`Procesando · ${res.tx_hash}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 rise-in md:mx-0">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Retirar</h1>
        <p className="mt-1 text-sm text-muted">Kapso envía soles a tu cuenta. Internal deja USDT en wallet custodial WDK.</p>
      </div>
      <div className="card space-y-5 p-6">
        <div className="hero-card p-5">
          <label className="block text-xs font-semibold text-white/70" htmlFor="amount">
            Monto a retirar (USDT)
          </label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            className="mt-1 w-full bg-transparent text-4xl font-extrabold tabular-nums text-white outline-none placeholder:text-white/30"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <label className="block text-sm font-semibold">
          Método
          <select
            className="field mt-1.5 font-normal"
            value={method}
            onChange={(e) => setMethod(e.target.value as "kapso" | "internal")}
          >
            <option value="kapso">Kapso (PEN a banco)</option>
            <option value="internal">Wallet interna USDT</option>
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Cuenta / destino
          <input className="field mt-1.5 font-normal" value={account} onChange={(e) => setAccount(e.target.value)} />
        </label>
        <button type="button" disabled={busy} onClick={prepare} className="btn-primary w-full py-3.5">
          Preparar retiro
        </button>
        {withdrawId && (
          <div className="space-y-4 border-t border-border pt-5">
            <p className="rounded-full bg-accent px-3 py-1.5 text-center text-xs font-semibold text-accent-foreground">ID {withdrawId}</p>
            <label className="block text-sm font-semibold">
              Código 2FA
              <input
                className="field mt-1.5 text-center font-mono text-lg tracking-[0.4em]"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                inputMode="numeric"
              />
            </label>
            <button type="button" disabled={busy || code.length < 4} onClick={confirm} className="btn-lime w-full py-3.5">
              Confirmar retiro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
