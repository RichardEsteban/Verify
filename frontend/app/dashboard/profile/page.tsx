"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/verify/auth";
import type { User } from "@/app/lib/verify/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setName(u?.display_name ?? "");
  }, []);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg space-y-6 rise-in md:mx-0">
      <h1 className="text-2xl font-extrabold tracking-tight">Perfil</h1>
      <div className="hero-card flex items-center gap-4 p-6">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lime text-2xl font-extrabold text-[#0a2a1e]">
          {(user.display_name?.trim()[0] ?? "V").toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xl font-extrabold">{user.display_name}</p>
          <p className="text-sm text-white/70">
            ★ {user.rating} · {user.deal_count} deals
          </p>
        </div>
      </div>
      <div className="card space-y-5 p-6">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">WhatsApp</dt>
            <dd className="font-semibold">{user.whatsapp_number}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Wallet custodial</dt>
            <dd className="truncate font-mono text-xs font-semibold">{user.wallet_address || "—"}</dd>
          </div>
        </dl>
        <label className="block text-sm font-semibold">
          Nombre para mostrar
          <input className="field mt-1.5 font-normal" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button
          type="button"
          className="btn-primary w-full py-3.5"
          onClick={() => {
            const next = { ...user, display_name: name };
            localStorage.setItem("verify_user", JSON.stringify(next));
            setUser(next);
            setSaved(true);
          }}
        >
          Guardar
        </button>
        {saved && <p className="text-center text-sm font-semibold text-success">Guardado en este navegador.</p>}
      </div>
    </div>
  );
}
