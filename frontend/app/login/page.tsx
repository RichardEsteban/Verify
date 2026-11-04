"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header, Footer } from "@/app/components/common/Header";
import { ChatIcon } from "@/app/components/common/Icons";
import { login } from "@/app/lib/verify/auth";

export default function LoginPage() {
  const router = useRouter();
  const [whatsapp, setWhatsapp] = useState("+51 987 654 321");
  const [name, setName] = useState("Constructora Andes");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!whatsapp.trim()) {
      setError("Número de WhatsApp inválido");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await login(whatsapp.trim(), name.trim());
      router.push("/dashboard");
    } catch {
      setError("No se pudo conectar con el backend. ¿Está corriendo en " + (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <div className="card rise-in p-7 md:p-9">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-[#0a2a1e]">
            <ChatIcon width={26} height={26} />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">Entrar con WhatsApp</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Usa el mismo número del bot: si ya creaste un deal por WhatsApp con este número, lo verás aquí.
          </p>
          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <label className="block text-sm font-semibold">
              Número
              <input className="field mt-1.5 font-normal" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} inputMode="tel" />
            </label>
            <label className="block text-sm font-semibold">
              Nombre
              <input className="field mt-1.5 font-normal" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            {error && (
              <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className="btn-primary w-full py-3.5">
              {busy ? "Entrando…" : "Continuar"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
