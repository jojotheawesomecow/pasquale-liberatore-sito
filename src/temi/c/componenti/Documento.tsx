import type { ReactNode } from "react";
import { RivelaOsservatore } from "@/componenti/Rivela";
import { SelettoreTemi } from "@/componenti/SelettoreTemi";
import { Transizione } from "@/componenti/Transizione";
import { getImpostazioni, getVideo } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import { url, type Lang, type Sezione } from "@/lib/rotte";
import { mono, sans, serif } from "../fonts";
import "../stile.css";
import "@/componenti/primitivi.css";
import { Footer } from "./Footer";
import { Header, type VoceMenu } from "./Header";

export async function Documento({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [impostazioni, video] = await Promise.all([getImpostazioni(), getVideo()]);
  const d = t(lang);
  const sezioni: Sezione[] = ["opere", "archivio", "chiSono", "riflessioni"];
  if (impostazioni.mostra_giardino) sezioni.push("giardino");
  if (impostazioni.mostra_video && video.length > 0) sezioni.push("video");
  sezioni.push("contatti");
  const voci: VoceMenu[] = sezioni.map((s) => ({ href: url(lang, s), label: d.nav[s] }));
  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <RivelaOsservatore />
        <Header lang={lang} nome={impostazioni.nome} voci={voci} etichette={{ menu: d.menu, chiudi: d.chiudi, cambiaLingua: d.cambiaLingua, cambiaLinguaLabel: d.cambiaLinguaLabel, salta: d.saltaAlContenuto, ruolo: d.ruolo }} />
        <main id="contenuto" className="flex-1">
          <Transizione>{children}</Transizione>
        </main>
        <Footer lang={lang} voci={voci} impostazioni={impostazioni} />
        <SelettoreTemi />
      </body>
    </html>
  );
}
