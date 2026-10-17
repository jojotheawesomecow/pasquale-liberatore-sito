import type { Lang } from "@/lib/rotte";
import { testi } from "@/lib/testi";
import { Titolo } from "../componenti/Titolo";

export function Privacy({ lang }: { lang: Lang }) {
  const x = testi(lang).privacy;
  return (
    <>
      <Titolo etichetta="Pasquale Liberatore" titolo={x.titolo} intro={x.intro} />
      <section className="contenitore grid lg:grid-cols-12">
        <div className="prosa lg:col-span-7 lg:col-start-4" data-rivela>
          {x.paragrafi.map((p, i) => <p key={i}>{p}</p>)}
          <p className="mono mt-8 normal-case tracking-normal">{x.titolare}</p>
        </div>
      </section>
    </>
  );
}
