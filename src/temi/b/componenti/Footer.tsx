import Link from "next/link";
import { Marquee } from "@/componenti/Marquee";
import type { Impostazioni } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import { url, type Lang } from "@/lib/rotte";
import type { VoceMenu } from "./Header";

const MATERIALI = ["Pietra della Majella", "Marmo bianco di Carrara", "Ardesia", "Travertino romano", "Pietra Perla d'Abruzzo", "Arenaria serena", "Resina", "Legno"];

export function Footer({ lang, voci, impostazioni }: { lang: Lang; voci: VoceMenu[]; impostazioni: Impostazioni }) {
  const d = t(lang);
  const anno = new Date().getFullYear();
  const utente = (u: string | null) => (u ? "@" + u.replace(/\/+$/, "").split("/").pop() : "");
  return (
    <footer className="mt-32 border-t border-linea">
      <Marquee className="border-b border-linea py-4" durata={50}>
        {MATERIALI.map((m) => (
          <span key={m} className="mono flex items-center gap-12 text-testo-2">
            {m} <span className="h-1 w-1 rounded-full bg-accento" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
      <div className="contenitore grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="mono">{d.contattami}</p>
          <Link href={url(lang, "contatti")} className="titolo-xl mt-4 inline-block uppercase transition-colors hover:text-accento">
            {d.scrivi}
          </Link>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 lg:col-span-3" aria-label="Sezioni">
          {voci.map((v) => (
            <Link key={v.href} href={v.href} className="mono text-testo-2 transition-colors hover:text-testo">{v.label}</Link>
          ))}
          <Link href={url(lang, "privacy")} className="mono text-testo-2 transition-colors hover:text-testo">{d.nav.privacy}</Link>
        </nav>
        <div className="flex flex-col gap-3 lg:col-span-2">
          {impostazioni.instagram ? <a href={impostazioni.instagram} target="_blank" rel="noopener noreferrer" className="mono text-testo-2 transition-colors hover:text-testo">Instagram ↗<br /><span className="normal-case tracking-normal">{utente(impostazioni.instagram)}</span></a> : null}
          {impostazioni.instagram_secondario ? <a href={impostazioni.instagram_secondario} target="_blank" rel="noopener noreferrer" className="mono text-testo-2 transition-colors hover:text-testo">Instagram ↗<br /><span className="normal-case tracking-normal">{utente(impostazioni.instagram_secondario)}</span></a> : null}
          {impostazioni.email ? <a href={`mailto:${impostazioni.email}`} className="mono text-testo-2 hover:text-testo">{impostazioni.email}</a> : null}
        </div>
      </div>
      <div className="contenitore flex flex-col gap-2 border-t border-linea py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="mono">© {anno} {impostazioni.nome} · {d.footer.diritti}</p>
        <p className="mono">{d.footer.realizzato}</p>
      </div>
    </footer>
  );
}
