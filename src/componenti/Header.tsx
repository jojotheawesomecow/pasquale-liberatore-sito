"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { altraLingua, risolvi, url, type Lang } from "@/lib/rotte";

export type VoceMenu = { href: string; label: string };

type Props = {
  lang: Lang;
  nome: string;
  voci: VoceMenu[];
  etichette: { menu: string; chiudi: string; cambiaLingua: string; cambiaLinguaLabel: string; salta: string; ruolo: string };
};

function Lingua({ href, altra, label, className = "" }: { href: string; altra: Lang; label: string; className?: string }) {
  return (
    <Link
      href={href}
      hrefLang={altra}
      lang={altra}
      aria-label={label}
      className={`inline-flex h-8 items-center rounded-full border border-pietra px-3 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-inchiostro-2 transition-colors hover:border-inchiostro hover:text-inchiostro ${className}`}
    >
      {altra}
    </Link>
  );
}

export function Header({ lang, nome, voci, etichette }: Props) {
  const pathname = usePathname() ?? "/";
  const [aperto, setAperto] = useState(false);
  const [scorso, setScorso] = useState(false);

  // URL della stessa pagina nell'altra lingua
  const parti = pathname.split("/").filter(Boolean);
  const langCorrente: Lang = parti[0] === "en" ? "en" : "it";
  const percorso = langCorrente === "en" ? parti.slice(1) : parti;
  const rotta = risolvi(langCorrente, percorso);
  const altra = altraLingua(lang);
  const altUrl = rotta ? url(altra, rotta.sezione, rotta.slug) : url(altra, "home");

  useEffect(() => setAperto(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScorso(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = aperto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aperto]);

  const norm = (p: string) => p.replace(/\/+$/, "") || "/";
  const attivo = (href: string) => {
    const h = norm(href);
    const p = norm(pathname);
    return h === "/" || h === "/en" ? p === h : p === h || p.startsWith(`${h}/`);
  };

  return (
    <>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-carta focus:px-4 focus:py-2">
        {etichette.salta}
      </a>
      <header
        className={`sticky top-0 z-40 border-b transition-[border-color,background-color] duration-300 ${
          scorso ? "border-pietra/70 bg-carta/90 backdrop-blur-md" : "border-transparent bg-carta"
        }`}
      >
        <div className="contenitore flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link href={url(lang, "home")} className="group flex flex-col leading-none" aria-label={nome}>
            <span className="font-serif text-[1.35rem] tracking-tight sm:text-2xl">{nome}</span>
            <span className="mt-1 hidden font-sans text-[0.66rem] uppercase tracking-[0.16em] text-pietra-2 sm:block">{etichette.ruolo}</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principale">
            {voci.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                aria-current={attivo(v.href) ? "page" : undefined}
                className={`relative py-1 font-sans text-[0.9rem] tracking-[0.01em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 hover:text-inchiostro hover:after:scale-x-100 ${
                  attivo(v.href) ? "text-inchiostro after:scale-x-100" : "text-inchiostro-2 after:scale-x-0"
                }`}
              >
                {v.label}
              </Link>
            ))}
            <Lingua href={altUrl} altra={altra} label={etichette.cambiaLinguaLabel} className="ml-2" />
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <Lingua href={altUrl} altra={altra} label={etichette.cambiaLinguaLabel} />
            <button
              type="button"
              onClick={() => setAperto(true)}
              aria-expanded={aperto}
              aria-controls="menu-mobile"
              className="inline-flex h-8 items-center gap-2 rounded-full border border-pietra px-3 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-inchiostro-2 hover:border-inchiostro hover:text-inchiostro"
            >
              {etichette.menu}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`fixed inset-0 z-50 flex flex-col bg-carta transition-opacity duration-300 lg:hidden ${aperto ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!aperto}
      >
        <div className="contenitore flex h-16 items-center justify-between sm:h-20">
          <span className="font-serif text-[1.35rem] tracking-tight sm:text-2xl">{nome}</span>
          <button
            type="button"
            onClick={() => setAperto(false)}
            className="inline-flex h-8 items-center rounded-full border border-pietra px-3 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-inchiostro-2 hover:border-inchiostro"
          >
            {etichette.chiudi}
          </button>
        </div>
        <nav className="contenitore flex flex-1 flex-col justify-center gap-2 pb-24" aria-label="Principale (mobile)">
          {voci.map((v, i) => (
            <Link
              key={v.href}
              href={v.href}
              aria-current={attivo(v.href) ? "page" : undefined}
              style={{ transitionDelay: aperto ? `${80 + i * 50}ms` : "0ms" }}
              className={`font-serif text-4xl leading-tight tracking-tight transition-all duration-500 sm:text-5xl ${
                aperto ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } ${attivo(v.href) ? "text-inchiostro" : "text-inchiostro-2"}`}
            >
              {v.label}
            </Link>
          ))}
          <Link href={altUrl} hrefLang={altra} lang={altra} className="mt-8 font-sans text-sm uppercase tracking-[0.14em] text-pietra-2">
            {etichette.cambiaLingua} →
          </Link>
        </nav>
      </div>
    </>
  );
}
