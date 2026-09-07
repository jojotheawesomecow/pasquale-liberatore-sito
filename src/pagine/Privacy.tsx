import { Titolo } from "@/componenti/Titolo";
import type { Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";

export function Privacy({ lang }: { lang: Lang }) {
  const x = testi(lang).privacy;
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={x.titolo} intro={x.intro} />
      <section className="contenitore grid lg:grid-cols-12">
        <div className="prosa lg:col-span-7 lg:col-start-3" data-rivela>
          {x.paragrafi.map((p, i) => <p key={i}>{p}</p>)}
          <p className="mt-8 font-sans text-sm text-pietra-2">{x.titolare}</p>
        </div>
      </section>
    </>
  );
}
