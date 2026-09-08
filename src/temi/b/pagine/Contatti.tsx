import { ModuloContatti } from "@/componenti/ModuloContatti";
import { getContatti, getImpostazioni } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { paragrafi } from "@/pagine/utili";
import { Titolo } from "../componenti/Titolo";

export async function Contatti({ lang }: { lang: Lang }) {
  const [c, imp] = await Promise.all([getContatti(), getImpostazioni()]);
  const d = t(lang);
  const testo = paragrafi(lang === "en" && c.en ? c.en : c.it);
  const utente = (u: string | null) => (u ? "@" + u.replace(/\/+$/, "").split("/").pop() : "");
  const canali: { nome: string; valore: string; href: string }[] = [];
  if (imp.instagram) canali.push({ nome: "Instagram", valore: utente(imp.instagram), href: imp.instagram });
  if (imp.instagram_secondario) canali.push({ nome: "Instagram", valore: utente(imp.instagram_secondario), href: imp.instagram_secondario });
  if (imp.youtube) canali.push({ nome: "YouTube", valore: "↗", href: imp.youtube });
  if (imp.email) canali.push({ nome: "Email", valore: imp.email, href: `mailto:${imp.email}` });
  if (imp.telefono) canali.push({ nome: "Tel.", valore: imp.telefono, href: `tel:${imp.telefono.replace(/\s+/g, "")}` });

  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.contatti} intro={d.contattiIntro} />
      <section className="contenitore grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6" data-rivela>
          <div className="voce text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] text-testo">
            {testo.map((p, i) => <p key={i} className={i ? "mt-6" : ""}>{p}</p>)}
          </div>
          {c.firma ? <p className="mono mt-8">{c.firma}</p> : null}
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-rivela data-ritardo="1">
          <h2 className="mono riga pt-5">{d.doveTrovarmi}</h2>
          <ul className="mt-2">
            {canali.map((k, i) => (
              <li key={i} className="border-b border-linea">
                <a href={k.href} target={k.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-baseline justify-between gap-6 py-4">
                  <span className="mono text-testo-2">{k.nome}</span>
                  <span className="font-sans text-lg text-testo transition-colors group-hover:text-accento">{k.valore} <span aria-hidden="true">↗</span></span>
                </a>
              </li>
            ))}
          </ul>
          {imp.indirizzo ? <p className="mono mt-6 whitespace-pre-line normal-case tracking-normal">{imp.indirizzo}</p> : null}
          {imp.form_endpoint ? (
            <div className="mt-12">
              <h2 className="mono mb-6">{d.scrivi}</h2>
              <ModuloContatti endpoint={imp.form_endpoint} chiave={imp.form_chiave} etichette={d.form} />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
