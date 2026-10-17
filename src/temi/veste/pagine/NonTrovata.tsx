import Link from "next/link";
import { t } from "@/lib/i18n";
import { mono, sans, serif } from "../fonts";
import "../stile.css";
import "@/componenti/primitivi.css";

export function NonTrovata() {
  const it = t("it").nonTrovata;
  const en = t("en").nonTrovata;
  return (
    <html lang="it" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <main className="contenitore flex flex-1 flex-col justify-center py-24">
          <p className="mono">404</p>
          <h1 className="titolo-xxl mt-4">{it.titolo}</h1>
          <p className="prosa mt-6">{it.testo}</p>
          <p className="mt-8"><Link href="/" className="bottone">{it.torna} →</Link></p>
          <div className="riga mt-16 pt-8" lang="en">
            <h2 className="titolo-l">{en.titolo}</h2>
            <p className="prosa mt-3">{en.testo}</p>
            <p className="mt-6"><Link href="/en/" className="bottone">{en.torna} →</Link></p>
          </div>
        </main>
      </body>
    </html>
  );
}
