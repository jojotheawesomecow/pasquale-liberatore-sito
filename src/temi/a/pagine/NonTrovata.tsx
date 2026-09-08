import Link from "next/link";
import { serif, sans } from "@/temi/a/fonts";
import { t } from "@/lib/i18n";
import "@/temi/a/stile.css";

/** Pagina 404 bilingue (ha un proprio <html> perché il sito usa due layout radice). */
export function NonTrovata() {
  const it = t("it").nonTrovata;
  const en = t("en").nonTrovata;
  return (
    <html lang="it" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <main className="contenitore flex flex-1 flex-col justify-center py-24">
          <p className="etichetta">404</p>
          <h1 className="titolo-display mt-5">{it.titolo}</h1>
          <p className="prosa mt-6 max-w-lg">{it.testo}</p>
          <p className="mt-8"><Link href="/" className="link-freccia"><span>{it.torna}</span><span aria-hidden="true">→</span></Link></p>
          <div className="riga mt-16 pt-8" lang="en">
            <h2 className="font-serif text-3xl font-light">{en.titolo}</h2>
            <p className="prosa mt-3 max-w-lg">{en.testo}</p>
            <p className="mt-6"><Link href="/en/" className="link-freccia"><span>{en.torna}</span><span aria-hidden="true">→</span></Link></p>
          </div>
        </main>
      </body>
    </html>
  );
}
