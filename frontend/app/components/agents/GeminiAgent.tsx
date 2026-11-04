"use client";

import { cn } from "@/app/lib/verify/utils";

type Props = {
  name: string;
  progress: number;
  status: string;
  eta: number | null;
  decision?: string | null;
  confidence?: number | null;
  accent?: "gemini" | "claude";
};

export function AgentCard({ name, progress, status, eta, decision, confidence, accent = "gemini" }: Props) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs eyebrow">{accent === "gemini" ? "Agent 1" : "Agent 2"}</p>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        {decision ? (
          <span className="rounded-full chip-ok px-2.5 py-1 text-xs font-bold">
            {decision} {confidence != null ? `· ${confidence}%` : ""}
          </span>
        ) : (
          <span className="text-xs text-muted">{eta != null ? `${eta}s` : "—"}</span>
        )}
      </div>
      <div className="mb-2 h-2 overflow-hidden rounded-full bg-accent">
        <div
          className={cn("h-full rounded-full transition-all duration-300", accent === "gemini" ? "bg-success" : "bg-lime")}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted">{status}</p>
      <p className="mt-1 text-right text-xs tabular-nums text-muted-foreground">{progress}%</p>
    </div>
  );
}

export function GeminiAgent(props: Omit<Props, "name" | "accent">) {
  return <AgentCard name="Gemini" accent="gemini" {...props} />;
}

export function ClaudeAgent(props: Omit<Props, "name" | "accent">) {
  return <AgentCard name="Claude" accent="claude" {...props} />;
}
