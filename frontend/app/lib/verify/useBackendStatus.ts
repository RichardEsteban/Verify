"use client";

import { useEffect, useState } from "react";
import { API_URL } from "./backend";

export type BackendStatus = "checking" | "online" | "offline";

/** Consulta GET /health cada `intervalMs` para reflejar si el backend responde de verdad. */
export function useBackendStatus(intervalMs = 15000): BackendStatus {
  const [status, setStatus] = useState<BackendStatus>("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      try {
        const res = await fetch(`${API_URL}/health`, { signal: ctrl.signal, cache: "no-store" });
        if (!cancelled) setStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setStatus("offline");
      } finally {
        clearTimeout(timer);
      }
    }

    check();
    const id = setInterval(check, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs]);

  return status;
}
