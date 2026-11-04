import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const HomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1v-9" />
  </Base>
);

export const DealsIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="3" />
    <path d="M8 9h8M8 13h8M8 17h4" />
  </Base>
);

export const ChartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 19V5" />
    <path d="m7 15 4-4 3 3 5-6" />
    <path d="M4 19h16" />
  </Base>
);

export const WalletIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2" />
    <path d="M4 7.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 1 4 6.5" />
    <circle cx="16" cy="14" r="1" fill="currentColor" />
  </Base>
);

export const UserIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c.8-3.4 3.4-5 7-5s6.2 1.6 7 5" />
  </Base>
);

export const BellIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15z" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </Base>
);

export const CopyIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v5.5c0 4.2 2.8 7.6 7 9.5 4.2-1.9 7-5.3 7-9.5V6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Base>
);

export const SparkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </Base>
);

export const ChatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 18.5 3.5 21l.5-4A8 8 0 1 1 8 19z" />
    <path d="M8.5 11h7M8.5 14h4" />
  </Base>
);

export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
  </Base>
);

export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
  </Base>
);

export const LogoutIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H10" />
    <path d="M15 8l4 4-4 4M19 12H9" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const EyeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </Base>
);

export const EyeOffIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4l16 16" />
    <path d="M9.9 5.8A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.7M6.4 7.4A15.6 15.6 0 0 0 2.5 12S6 18.5 12 18.5c1.5 0 2.8-.4 4-1" />
    <path d="M10 10a2.8 2.8 0 0 0 4 4" />
  </Base>
);

/** Logo: escudo con check sobre un cuadrado lima/bosque. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[0.8rem] bg-[#0c3b2b] text-[#c6f432]"
      style={{ width: size, height: size }}
    >
      <ShieldIcon width={size * 0.58} height={size * 0.58} strokeWidth={2} />
    </span>
  );
}
