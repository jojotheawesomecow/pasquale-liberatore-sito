import type { ReactNode } from "react";

type Props = { etichetta?: string; titolo: ReactNode; intro?: ReactNode; className?: string; azioni?: ReactNode };

/** Testata di pagina: etichetta piccola, titolo grande in serif, introduzione. */
export function Titolo({ etichetta, titolo, intro, className = "", azioni }: Props) {
  return (
    <header className={`contenitore pt-10 pb-8 sm:pt-16 sm:pb-12 ${className}`}>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {etichetta ? <p className="etichetta mb-4" data-rivela>{etichetta}</p> : null}
          <h1 className="titolo-display" data-rivela data-ritardo="1">{titolo}</h1>
        </div>
        {intro ? (
          <div className="lg:col-span-4 lg:pb-2" data-rivela data-ritardo="2">
            <p className="font-serif text-xl leading-snug text-inchiostro-2 md:text-2xl">{intro}</p>
            {azioni ? <div className="mt-5">{azioni}</div> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
