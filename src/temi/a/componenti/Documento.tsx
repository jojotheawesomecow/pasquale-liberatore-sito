import type { ReactNode } from "react";
import { serif, sans } from "@/temi/a/fonts";
import { getImpostazioni, getVideo } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import { url, type Lang, type Sezione } from "@/lib/rotte";
import { Header, type VoceMenu } from "@/temi/a/componenti/Header";
import { Footer } from "@/temi/a/componenti/Footer";
import { RivelaOsservatore } from "@/componenti/Rivela";
import "@/temi/a/stile.css";

/** Struttura comune a tutte le pagine: <html>, testata, contenuto, piè di pagina. */
export async function Documento({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [impostazioni, video] = await Promise.all([getImpostazioni(), getVideo()]);
  const d = t(lang);
  const sezioni: Sezione[] = ["opere", "chiSono", "riflessioni"];
  if (impostazioni.mostra_giardino) sezioni.push("giardino");
  if (impostazioni.mostra_video && video.length > 0) sezioni.push("video");
  sezioni.push("contatti");
  const voci: VoceMenu[] = sezioni.map((s) => ({ href: url(lang, s), label: d.nav[s] }));

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <RivelaOsservatore />
        <Header
          lang={lang}
          nome={impostazioni.nome}
          voci={voci}
          etichette={{ menu: d.menu, chiudi: d.chiudi, cambiaLingua: d.cambiaLingua, cambiaLinguaLabel: d.cambiaLinguaLabel, salta: d.saltaAlContenuto, ruolo: d.ruolo }}
        />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} voci={voci} impostazioni={impostazioni} />
      </body>
    </html>
  );
}
