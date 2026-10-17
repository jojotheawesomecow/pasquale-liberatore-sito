import type { ReactNode } from "react";
import "./gestione.css";

export const metadata = {
  title: "Le opere di Pasquale",
  robots: { index: false, follow: false },
};

export default function LayoutGestione({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
