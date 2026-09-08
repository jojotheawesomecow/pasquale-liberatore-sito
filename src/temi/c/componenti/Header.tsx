"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { altraLingua, risolvi, url, type Lang } from "@/lib/rotte";

export type VoceMenu = { href: string; label: string };
type Props = {
  lang: Lang;
  nome: string;
  voci: VoceMenu[];
  etichette: { menu: string; chiudi: string; cambiaLingua: string; cambiaLinguaLabel: string; salta: string; ruolo: string };
};
const norm = (p: string) => p.replace(/\/+$/, "") || "/";

export function Header({ lang, nome, voci, etichette }: Props) {
  const pathname = usePathname() ?? "/";
  const [aperto, setAperto] = useState(false);
  const testata = useRef<HTMLElement>(null);
  const parti = pathname.split("/").filter(Boolean);
  const langCorrente: Lang = parti[0] === "en" ? "en" : "it";
  const rotta = risolvi(langCorrente, langCorrente === "en" ? parti.slice(1) : parti);
  const altra = altraLingua(lang);
  const altUrl = rotta ? url(altra, rotta.sezione, rotta.slug) : url(altra, "home");

  useEffect(() => {
    const onScroll = () => testata.current?.toggleAttribute("data-scorso", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = aperto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aperto]);

  const attivo = (href: string) => {
    const h = norm(href);
    const p = norm(pathname);
    return h === "/" || h === "/en" ? p === h : p === h || p.startsWith(`${h}/`);
  };
  const chiudi = () => setAperto(false);

  return (
    <>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-sfondo focus:px-4 focus:py-2">{etichette.salta}</a>
      <header ref={testata} className="testata-c">
        <div className="contenitore flex h-16 items-center justify-between gap-6">
          <Link href={url(lang, "home")} onClick={chiudi} className="font-serif text-[1.35rem] tracking-[-0.02em] text-testo" aria-label={nome}>{nome}</Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principale">
            {voci.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                aria-current={attivo(v.href) ? "page" : undefined}
                className={`relative py-1 font-sans text-[0.88rem] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-accento after:transition-transform after:duration-300 hover:text-testo hover:after:scale-x-100 ${attivo(v.href) ? "text-testo after:scale-x-100" : "text-testo-2 after:scale-x-0"}`}
              >
                {v.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href={altUrl} hrefLang={altra} lang={altra} aria-label={etichette.cambiaLinguaLabel} className="mono text-testo-3 transition-colors hover:text-testo">
              <span className={lang === "it" ? "text-testo" : ""}>IT</span><span className="mx-1">/</span><span className={lang === "en" ? "text-testo" : ""}>EN</span>
            </Link>
            <button type="button" onClick={() => setAperto(true)} aria-expanded={aperto} aria-controls="menu-mobile" className="bottone h-9 px-4 text-[0.75rem] lg:hidden">{etichette.menu}</button>
          </div>
        </div>
      </header>

      <div id="menu-mobile" className={`fixed inset-0 z-50 flex flex-col bg-sfondo transition-[opacity,visibility] duration-400 lg:hidden ${aperto ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!aperto}>
        <div className="contenitore flex h-16 items-center justify-between">
          <span className="font-serif text-[1.35rem] tracking-[-0.02em]">{nome}</span>
          <button type="button" onClick={chiudi} className="bottone h-9 px-4 text-[0.75rem]">{etichette.chiudi}</button>
        </div>
        <nav className="contenitore flex flex-1 flex-col justify-center gap-2 pb-20" aria-label="Principale (mobile)">
          {voci.map((v, i) => (
            <Link key={v.href} href={v.href} onClick={chiudi} style={{ transitionDelay: aperto ? `${120 + i * 55}ms` : "0ms" }} className={`titolo-xl transition-[opacity,transform] duration-600 ${aperto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${attivo(v.href) ? "text-accento" : "text-testo"}`}>
              {v.label}
            </Link>
          ))}
          <p className="mono mt-10">{etichette.ruolo}</p>
        </nav>
      </div>
    </>
  );
}
