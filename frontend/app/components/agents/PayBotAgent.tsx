import { shortHash } from "@/app/lib/verify/utils";

type Props = {
  status: string;
  ready: boolean;
  tx_hash: string | null;
  amount_usdt: number | null;
};

export function PayBotAgent({ status, ready, tx_hash, amount_usdt }: Props) {
  return (
    <div className="card p-5">
      <p className="text-xs eyebrow">PayBot + WDK</p>
      <h3 className="mb-3 text-lg font-semibold">Payout</h3>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-accent">
        <div
          className="h-full rounded-full bg-success transition-all"
          style={{ width: tx_hash ? "100%" : ready ? "70%" : "18%" }}
        />
      </div>
      <p className="text-sm">{status}</p>
      {amount_usdt != null && <p className="mt-1 text-sm text-muted">{amount_usdt} USDT</p>}
      {tx_hash && (
        <p className="mt-2 font-mono text-xs text-success">TX {shortHash(tx_hash)}</p>
      )}
    </div>
  );
}
