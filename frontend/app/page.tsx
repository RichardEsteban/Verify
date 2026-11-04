import { Header, Footer } from "@/app/components/common/Header";
import { ArrowRightIcon, ChatIcon, CheckIcon, ShieldIcon, SparkIcon, WalletIcon } from "@/app/components/common/Icons";
import Link from "next/link";

const FEATURES = [
  {
    icon: ChatIcon,
    t: "Todo por WhatsApp",
    d: "Kapso cobra con QR o transferencia. El usuario nunca ve blockchain ni necesita una wallet.",
  },
  {
    icon: SparkIcon,
    t: "Arbitraje por IA",
    d: "Gemini y Claude votan sobre la evidencia. El consenso se ve en vivo desde el dashboard.",
  },
  {
    icon: WalletIcon,
    t: "Payout automático",
    d: "PayBot libera USDT por hitos o con split de depósito estilo Airbnb, sin intermediarios.",
  },
];

const STEPS = [
  { n: "01", t: "Crea el trato", d: "Escribe /crear_deal y comparte el link con tu cliente." },
  { n: "02", t: "El pago queda en escrow", d: "El comprador paga y los fondos se bloquean hasta cerrar el trabajo." },
  { n: "03", t: "Sube la evidencia", d: "Fotos con hash en IPFS como prueba de entrega." },
  { n: "04", t: "Cobra al instante", d: "Las IAs validan y PayBot libera el pago a tu cuenta." },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-lime/30 blur-3xl" />
      <div className="rounded-[2.6rem] border-[6px] border-[#0c3b2b] bg-[#e9efe7] p-0 shadow-[0_30px_60px_-20px_rgba(7,42,30,0.55)]">
        <div className="flex items-center gap-3 rounded-t-[2rem] bg-[#0c3b2b] px-4 py-3.5 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-[#0a2a1e]">
            <ShieldIcon width={18} height={18} strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">Verify Bot</p>
            <p className="text-[11px] text-white/70">en línea</p>
          </div>
        </div>
        <div className="space-y-2.5 px-3 py-4 text-[13px] text-[#0a2a1e]">
          <p className="mx-auto w-fit rounded-full bg-white/70 px-3 py-0.5 text-[10px] font-semibold text-[#54695f]">Hoy</p>
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-md bg-[#c6f432] px-3.5 py-2 font-medium">/crear_deal</div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2 shadow-sm">
            Trato creado: <b>Gasfitería · S/ 450</b>
            <br />
            <span className="text-[#0f8a5a]">Esperando pago del cliente…</span>
          </div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2 shadow-sm">
            <span className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-[#0f8a5a]">
              <CheckIcon width={14} height={14} strokeWidth={2.4} /> Pago en escrow
            </span>
            Sube tus fotos del trabajo para liberar el pago.
          </div>
          <div className="ml-auto w-fit rounded-2xl rounded-tr-md bg-[#c6f432] px-3.5 py-2 font-medium">📷 4 fotos enviadas</div>
        </div>
        <div className="mx-3 mb-4 rounded-2xl bg-[#0c3b2b] p-3.5 text-white">
          <p className="text-[10px] uppercase tracking-widest text-white/60">Payout liberado</p>
          <p className="mt-0.5 text-xl font-extrabold tabular-nums">
            120.<span className="text-white/50">00 USDT</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5">
        <section className="grid items-center gap-14 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="rise-in">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-lime ring-2 ring-primary/30" />
              Aleph Hackathon · WDK Track
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Cobra seguro por WhatsApp.{" "}
              <span className="rounded-2xl bg-lime px-2 text-[#0a2a1e]">Sin wallet.</span> Con arbitraje por IA.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Garantía P2P para el mercado informal. El plomero, el taxista o la constructora pagan y cobran desde el chat; el
              dashboard muestra en vivo a Gemini, Claude y PayBot resolviendo el escrow.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/login" className="btn-primary px-6 py-3.5">
                Entrar al dashboard <ArrowRightIcon width={18} height={18} />
              </Link>
              <a href="#como-funciona" className="btn-ghost px-6 py-3.5">
                Cómo funciona
              </a>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4">
              {[
                ["~2 min", "a payout"],
                ["2 IAs", "votan el caso"],
                ["0", "wallets del usuario"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-extrabold tracking-tight">{v}</dt>
                  <dd className="text-xs text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rise-in [animation-delay:120ms]">
            <PhoneMockup />
          </div>
        </section>

        <section className="grid gap-4 pb-20 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="card p-6 transition hover:-translate-y-1">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-[#0a2a1e]">
                <f.icon />
              </span>
              <h2 className="text-lg font-bold">{f.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
            </div>
          ))}
        </section>

        <section id="como-funciona" className="hero-card mb-20 p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">Cómo funciona</p>
          <h2 className="mt-2 max-w-md text-3xl font-extrabold tracking-tight">De la charla al pago en cuatro pasos</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="text-4xl font-extrabold text-lime/90">{s.n}</span>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
