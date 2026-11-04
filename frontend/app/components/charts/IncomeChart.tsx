import type { ReactNode } from "react";
import type { CategorySlice, EarningsPoint } from "@/app/lib/verify/types";

export function StatsCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{label}</p>
        {icon && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">{icon}</span>}
      </div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function IncomeChart({ data }: { data: EarningsPoint[] }) {
  const max = Math.max(...data.map((d) => d.earnings), 1);
  const w = 560;
  const h = 200;
  const pad = 28;
  const xy = data.map((d, i) => ({
    x: pad + (i * (w - pad * 2)) / Math.max(data.length - 1, 1),
    y: h - pad - (d.earnings / max) * (h - pad * 2),
    d,
  }));
  const line = xy.map((p) => `${p.x},${p.y}`).join(" ");
  const area = xy.length ? `${pad},${h - pad} ${line} ${w - pad},${h - pad}` : "";

  return (
    <div className="card p-6">
      <h3 className="mb-4 font-extrabold">Ingresos / mes (USDT)</h3>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-52 w-full" role="img" aria-label="Ingresos por mes">
        <defs>
          <linearGradient id="income-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c6f432" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c6f432" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={w - pad} y1={h - pad - g * (h - pad * 2)} y2={h - pad - g * (h - pad * 2)} stroke="var(--border)" strokeDasharray="4 6" />
        ))}
        <polygon points={area} fill="url(#income-fill)" />
        <polyline fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={line} />
        {xy.map((p) => (
          <g key={p.d.month}>
            <circle cx={p.x} cy={p.y} r="5" fill="var(--card)" stroke="var(--success)" strokeWidth="3" />
            <text x={p.x} y={h - 8} textAnchor="middle" className="fill-muted text-[10px] font-semibold">
              {p.d.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function CategoryPie({ data }: { data: CategorySlice[] }) {
  const total = data.reduce((s, d) => s + d.amount, 0) || 1;
  let acc = 0;
  const colors = ["#0f8a5a", "#c6f432", "#7dd3c0"];

  return (
    <div className="card p-6">
      <h3 className="mb-4 font-extrabold">Ingresos por categoría</h3>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 32 32" className="h-32 w-32 shrink-0 -rotate-90" role="img" aria-label="Ingresos por categoría">
          <circle r="10" cx="16" cy="16" fill="transparent" stroke="var(--accent)" strokeWidth="6" />
          {data.map((d, i) => {
            const dash = (d.amount / total) * 62.83;
            const offset = acc;
            acc += dash;
            return (
              <circle
                key={d.category}
                r="10"
                cx="16"
                cy="16"
                fill="transparent"
                stroke={colors[i % colors.length]}
                strokeWidth="6"
                strokeDasharray={`${dash} ${62.83 - dash}`}
                strokeDashoffset={-offset}
              />
            );
          })}
        </svg>
        <ul className="space-y-2 text-sm">
          {data.map((d, i) => (
            <li key={d.category} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
              <span className="font-semibold">{d.category}</span>
              <span className="text-muted">· {d.amount} USDT</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Montos en USDT (mock)</p>
    </div>
  );
}
