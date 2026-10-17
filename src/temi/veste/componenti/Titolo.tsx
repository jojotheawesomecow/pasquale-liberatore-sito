import type { ReactNode } from "react";
import { TestoRivela } from "@/componenti/TestoRivela";

type Props = { etichetta?: string; titolo: string; intro?: string; numero?: string; azioni?: ReactNode };

/** Testata di pagina del tema B: etichetta mono, titolo enorme, introduzione in corsivo. */
export function Titolo({ etichetta, titolo, intro, numero, azioni }: Props) {
  return (
    <header className="contenitore pt-12 pb-10 sm:pt-20 sm:pb-14">
      <div className="flex items-baseline justify-between gap-6">
        {etichetta ? <p className="mono" data-rivela>{etichetta}</p> : <span />}
        {numero ? <p className="mono" data-rivela>{numero}</p> : null}
      </div>
      <TestoRivela testo={titolo} come="h1" className="titolo-xxl mt-4" passo={70} />
      {intro || azioni ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {intro ? <p className="voce text-2xl text-testo-2 sm:text-3xl lg:col-span-7 lg:col-start-6" data-rivela data-ritardo="2">{intro}</p> : null}
          {azioni ? <div className="lg:col-span-12">{azioni}</div> : null}
        </div>
      ) : null}
    </header>
  );
}
