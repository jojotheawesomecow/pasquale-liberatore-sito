/** Piccolo motivo decorativo: un seme/germoglio disegnato a linea sottile. */
export function Seme({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 44c-8.5 0-14-6.2-14-14.5C10 20 17 12.5 24 6c7 6.5 14 14 14 23.5C38 37.8 32.5 44 24 44Z" />
      <path d="M24 44V18" />
      <path d="M24 26c-3.2-1.2-6-3.6-7.4-7.2M24 31c3.4-1 6.4-3.6 7.8-7.4" />
      <path d="M24 6c1.2-2.4 3.1-3.6 5.4-3.6-0.2 2.6-1.5 4.3-3.6 5.1" />
    </svg>
  );
}
