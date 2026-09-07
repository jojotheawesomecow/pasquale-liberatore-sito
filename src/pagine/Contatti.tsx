import { ModuloContatti } from "@/componenti/ModuloContatti";
import { Titolo } from "@/componenti/Titolo";
import { getContatti, getImpostazioni } from "@/lib/contenuti";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/rotte";
import { paragrafi } from "./utili";

export async function Contatti({ lang }: { lang: Lang }) {
  const [c, imp] = await Promise.all([getContatti(), getImpostazioni()]);
  const d = t(lang);
  const testo = paragrafi(lang === "en" && c.en ? c.en : c.it);
  const utente = (u: string | null) => (u ? "@" + u.replace(/\/+$/, "").split("/").pop() : "");
  const voce = "group flex items-baseline justify-between gap-6 border-b border-pietra/70 py-4 font-sans text-[0.95rem] transition-colors hover:text-muschio";

  const canali: { etichetta: string; valore: string; href: string; esterno?: boolean }[] = [];
  if (imp.instagram) canali.push({ etichetta: "Instagram", valore: utente(imp.instagram), href: imp.instagram, esterno: true });
  if (imp.instagram_secondario) canali.push({ etichetta: "Instagram", valore: utente(imp.instagram_secondario), href: imp.instagram_secondario, esterno: true });
  if (imp.youtube) canali.push({ etichetta: "YouTube", valore: lang === "it" ? "Canale" : "Channel", href: imp.youtube, esterno: true });
  if (imp.email) canali.push({ etichetta: "Email", valore: imp.email, href: `mailto:${imp.email}` });
  if (imp.telefono) canali.push({ etichetta: lang === "it" ? "Telefono" : "Phone", valore: imp.telefono, href: `tel:${imp.telefono.replace(/\s+/g, "")}` });

  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={d.nav.contatti} intro={d.contattiIntro} />
      <section className="contenitore grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6" data-rivela>
          <div className="prosa prosa-lg">
            {testo.map((p, i) => <p key={i}>{p}</p>)}
            {c.firma ? <p className="mt-6 font-serif italic text-pietra-2">{c.firma}</p> : null}
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-rivela data-ritardo="1">
          <h2 className="etichetta riga pt-6">{d.canali}</h2>
          <ul className="mt-2">
            {canali.map((k, i) => (
              <li key={i}>
                <a href={k.href} target={k.esterno ? "_blank" : undefined} rel={k.esterno ? "noopener noreferrer" : undefined} className={voce}>
                  <span className="text-pietra-2">{k.etichetta}</span>
                  <span className="text-right text-inchiostro group-hover:text-muschio">{k.valore} {k.esterno ? <span aria-hidden="true">↗</span> : null}</span>
                </a>
              </li>
            ))}
          </ul>
          {imp.indirizzo ? (
            <p className="mt-6 whitespace-pre-line font-sans text-sm text-inchiostro-2">
              <span className="etichetta block">{lang === "it" ? "Indirizzo" : "Address"}</span>
              {imp.indirizzo}
            </p>
          ) : null}
        </div>
        {imp.form_endpoint ? (
          <div className="lg:col-span-6" data-rivela>
            <h2 className="etichetta riga mb-8 pt-6">{d.scrivi}</h2>
            <ModuloContatti endpoint={imp.form_endpoint} chiave={imp.form_chiave} etichette={d.form} />
          </div>
        ) : null}
      </section>
    </>
  );
}
