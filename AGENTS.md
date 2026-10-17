# Note per chi lavora sul codice

- Leggi `README.md` per struttura, comandi e flusso di pubblicazione; `NOTE-PER-MARCO.md` per le cose ancora da verificare.
- Lingua del codice e dei contenuti: italiano (nomi di file, componenti, campi). L'inglese è la seconda lingua del sito, con fallback automatico all'italiano (`campo()` in `src/lib/i18n.ts`).
- Il sito è un **export statico** (`output: "export"`): niente API o server component dinamici in produzione. Il pannello Keystatic vive solo in sviluppo (file `*.dev.tsx` / `*.dev.ts`, inclusi via `pageExtensions` in `next.config.ts`).
- Le immagini dei contenuti stanno in `content/media/**` e vengono ottimizzate da `scripts/immagini.mjs` in `public/media/**` (ignorate da git). Nei componenti usa `foto(src)` da `src/lib/immagini.ts` e il componente `<Foto>`; mai `<img>` diretti verso `content/`.
- I percorsi pubblici passano da `conBase()` (prefisso `NEXT_PUBLIC_BASE_PATH` per GitHub Pages). I link interni usano `url(lang, sezione, slug)` da `src/lib/rotte.ts`.
- Prima di un commit: `npm run typecheck` e `npm run build`.
