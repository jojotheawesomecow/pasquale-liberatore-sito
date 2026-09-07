import Link from "next/link";
import type { VoceMenu } from "./Header";
import { Seme } from "./Seme";
import { url, type Lang } from "@/lib/rotte";
import { t } from "@/lib/i18n";
import type { Impostazioni } from "@/lib/contenuti";

export function Footer({ lang, voci, impostazioni }: { lang: Lang; voci: VoceMenu[]; impostazioni: Impostazioni }) {
  const d = t(lang);
  const anno = new Date().getFullYear();
  const tagline = (lang === "en" && impostazioni.tagline_en) || impostazioni.tagline;
  const utente = (u: string | null) => (u ? "@" + u.replace(/\/+$/, "").split("/").pop() : "");
  return (
    <footer className="mt-24 bg-ardesia text-carta sm:mt-32">
      <div className="contenitore grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Seme className="text-pietra" size={34} />
          <p className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{impostazioni.nome}</p>
          {tagline ? <p className="mt-2 font-sans text-sm text-pietra">{tagline}</p> : null}
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 lg:col-span-3" aria-label="Sezioni">
          {voci.map((v) => (
            <Link key={v.href} href={v.href} className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
              {v.label}
            </Link>
          ))}
          <Link href={url(lang, "privacy")} className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
            {d.nav.privacy}
          </Link>
        </nav>
        <div className="flex flex-col gap-2 lg:col-span-3">
          {impostazioni.instagram ? (
            <a href={impostazioni.instagram} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
              Instagram {utente(impostazioni.instagram)}
            </a>
          ) : null}
          {impostazioni.instagram_secondario ? (
            <a href={impostazioni.instagram_secondario} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
              Instagram {utente(impostazioni.instagram_secondario)}
            </a>
          ) : null}
          {impostazioni.youtube ? (
            <a href={impostazioni.youtube} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
              YouTube
            </a>
          ) : null}
          {impostazioni.email ? (
            <a href={`mailto:${impostazioni.email}`} className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
              {impostazioni.email}
            </a>
          ) : null}
          <Link href={url(lang, "contatti")} className="font-sans text-sm text-carta/80 transition-colors hover:text-carta">
            {d.nav.contatti}
          </Link>
        </div>
      </div>
      <div className="border-t border-carta/10">
        <div className="contenitore flex flex-col gap-2 py-6 font-sans text-xs text-pietra sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anno} {impostazioni.nome}. {d.footer.diritti}
          </p>
          <p>{d.footer.realizzato}</p>
        </div>
      </div>
    </footer>
  );
}
