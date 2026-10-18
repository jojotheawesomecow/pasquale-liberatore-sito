import type { ReactNode } from "react";
import { mono, sans } from "@/temi/veste/fonts";
import "./gestione.css";

export const metadata = {
  title: "Le opere di Pasquale",
  robots: { index: false, follow: false },
};

export default function LayoutGestione({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
