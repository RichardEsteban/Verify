"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
