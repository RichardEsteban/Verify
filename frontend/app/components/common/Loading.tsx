export function Loading({ label = "Cargando…" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-muted">
      <span className="flex gap-1">
        {[0, 150, 300].map((d) => (
          <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${d}ms` }} />
        ))}
      </span>
      {label}
    </div>
  );
}
