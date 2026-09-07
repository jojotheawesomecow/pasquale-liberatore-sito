# Note per Marco — cosa c'è, cosa manca, cosa verificare

Aggiornato alla notte tra il 7 e l'8 settembre 2026.

## Cosa trovi

- **Anteprima online**: https://jojotheawesomecow.github.io/pasquale-liberatore-sito/ (repo pubblico `jojotheawesomecow/pasquale-liberatore-sito`, pubblicazione automatica a ogni push, `noindex` attivo).
- **In locale**: `npm install` poi `npm run dev` → sito su http://localhost:3000, pannello su http://localhost:3000/keystatic. Tutto è spiegato nel `README.md`.
- **Sezioni**: Home, Opere (16 schede con filtri per categoria e decennio), Chi sono (bio + cronologia di 65 voci + critici + bibliografia), Riflessioni (il manifesto «I semi sono il territorio»), Il mio giardino, Video (2 filmati del 2025), Contatti, Privacy. Tutto in italiano e inglese.
- **Contenuti recuperati dal vecchio sito**: tutti i testi, le 21 immagini (ritagliate dalle schede di catalogo: le didascalie incorporate nelle foto sono diventate dati della scheda) e 2 immagini dalla pagina MU.SP.A.C.
- **Vecchi indirizzi** (`/about`, `/contact-me`, `/i-semi-sono-il-territorio`) reindirizzano alle nuove pagine, così i link esterni non si rompono quando il dominio passerà al nuovo sito.

## Testi scritti da me, da far leggere a Pasquale

Tutto ciò che non era già sul vecchio sito è una mia proposta e va riletto:

1. **Descrizioni delle 16 opere** (`content/opere/*/index.yaml`, campi `descrizione` e `descrizione_en`): brevi testi basati su didascalie e biografia. Le interpretazioni («due tempi geologici», «un frutto, un cervello, un corpo raccolto»…) sono mie.
2. **Presentazione in home** (`content/home/index.yaml`, `presentazione`) e citazione scelta dal manifesto.
3. **Il mio giardino** (`content/giardino/index.mdoc`): scritto con le poche informazioni disponibili; **mancano le foto del giardino** (per ora c'è la foto di «Meditazione», scattata nel giardino). La frase sulle visite dice solo di scrivere dai Contatti: confermare se il giardino è visitabile.
4. **Biografia**: riordinata in capitoli, corretti refusi («Instanbul», «Parteners», «Universty»…), «laureandosi» → «si diploma» (prima del 1999 le Accademie rilasciavano diplomi). La versione inglese è tradotta da me a partire da quella del vecchio sito.
5. **Traduzioni inglesi** di tutto (manifesto compreso: la versione del sito attuale non lo aveva in inglese).
6. **Titoli inglesi delle opere** (Sprout, Seed, Exodus, Claw…): da confermare o togliere.

## Fatti da verificare con Pasquale

- **Quadriennale di Roma 1986**: l'archivio ufficiale ArBiQ non elenca Pasquale Liberatore (solo Bruno, Fausto Maria e Nicola). La bio del vecchio sito cita «Ricognizione Sud» nell'ambito della XI Quadriennale. Chiedere il catalogo prima di lasciarlo.
- **Premio Michetti**: il sito dice «XXXVIII Premio Michetti 1987, primo premio»; Wikipedia lo elenca tra gli artisti dell'edizione **1986** («Il mare»). Chiarire anno ed eventuale premio.
- **Monumento alle vittime del sisma** (Villa Sant'Angelo, inaugurato il 10 gennaio 2010, pietra bianca della Majella): titolo ufficiale («Germoglio»?) e dimensioni. Non abbiamo una foto: sarebbe l'opera pubblica più importante da mostrare.
- **Anno di pensionamento** dall'Accademia e denominazione esatta della cattedra (MIUR 2010: «ABAV09 – Tecniche del marmo e delle pietre dure, 1ª fascia»).
- **Instagram**: quale account va sul sito. Ora ci sono entrambi (pasqualeliberatorescultore in primo piano, frontieradicampagna in secondo). Non sono riuscito a verificarli (login richiesto).
- **Video citati nella bio** («Spartiacque entropico», «Uomo Albero», «Il sole sotto la neve», «Attrattore di energia»): non esistono online. Se avete i file, si possono caricare su YouTube (anche come «non in elenco») e aggiungere dal pannello.
- **Targa per piazza De André** (2008): fonte Adnkronos non più raggiungibile; da confermare.
- **Fanano 1999**: il simposio è confermato ma il nome di Liberatore non compare nell'archivio online del simposio.
- **Condensatore di rugiada** (2015): confermare che sia ancora al Museo delle Acque e recuperare una foto.
- Le **voci senza data** della cronologia (in fondo alla pagina Chi sono) vengono dal vecchio sito, che non le datava.
- **Opere da MU.SP.A.C.** («Senza titolo» in legno, «Una montagna di ricordi»): foto prese dal sito del museo; verificare titoli, anni e che si possano usare.
- **Omonimi** da tenere fuori: Bruno Liberatore (scultore, temi simili), Pasquale Liberatore giurista (1763–1842), un coach e un sacerdote con lo stesso nome. Nei titoli delle pagine uso sempre «Pasquale Liberatore» + «scultore» + «Villa Sant'Angelo».

## Materiali che servono

- Foto in alta risoluzione delle opere (le attuali arrivano da schede A4 ritagliate: buone ma non ottime) e soprattutto del **monumento del 2010**, del **Condensatore di rugiada**, delle **opere pubbliche in situ**.
- Foto del **giardino** e dello **studio**; un ritratto recente.
- I **quadri** (50-100): usa `import/` come spiegato nel README; servono almeno titolo e anno per ognuno.
- Gli **scritti dei quaderni**: per ogni testo servono trascrizione (o dettatura) e, se volete, le foto delle pagine. La sezione si chiama «Riflessioni» come chiesto.
- **Testi critici** (Crispolti, Trucchi, Ciavoliello…): si possono pubblicare in Riflessioni o in una nuova sezione «Testi critici», previa autorizzazione degli autori/editori.
- **Email pubblica** e scelta del servizio per il modulo contatti (Formspree o Web3Forms): 5 minuti, vedi README §5.

## Decisioni di design (facili da cambiare)

- Caratteri: **Newsreader** (titoli e testi lunghi) + **Geist** (interfaccia). Alternative pronte: Fraunces + Inter, Cormorant Garamond + Manrope. Si cambiano in `src/lib/fonts.ts`.
- Palette dai materiali: carta/bianco Carrara `#f4f1ea`, travertino `#ece7db`, pietra `#cfc8b9`, ardesia `#22272d` (footer e finestra immagini), muschio `#55663f` (accento). In `src/app/globals.css`.
- Nessun logo: marchio tipografico. Motivo del seme/germoglio come piccola icona (favicon e footer).
- Le opere nella griglia mantengono le proporzioni originali (stile catalogo); in home sono quelle segnate «In evidenza».
- Animazioni minime: apparizione dolce allo scorrimento, zoom leggero al passaggio, finestra ingrandimento con frecce/Esc/tocco.

## Prossimi passi consigliati

1. Far leggere testi e schede a Pasquale; correggere dal pannello.
2. Caricare i quadri con l'import massivo, poi completare le schede.
3. Scegliere l'hosting definitivo (consiglio Vercel o Cloudflare Pages, gratuiti) e collegare `pasqualeliberatore.com` dal DNS di Aruba. A quel punto si può attivare il pannello **online** (Keystatic in modalità GitHub) così tu e i familiari modificate il sito dal browser.
4. Rimuovere `NEXT_PUBLIC_NOINDEX` nella build del dominio definitivo (è impostato solo per l'anteprima su GitHub Pages).

## Cose tecniche da sapere

- Il pannello funziona solo in sviluppo (`npm run dev`); nella build statica non esiste.
- In sviluppo gli URL non hanno la barra finale, nella build sì (`/opere/`): è voluto, serve a GitHub Pages.
- `public/media/` e `src/generated/` sono generati e non stanno in git: la build li ricrea (`npm run immagini`).
- Il repository conterrà anche le foto originali (`content/media/`): con 100 quadri da 3-5 MB ciascuno crescerà di qualche centinaio di MB, accettabile per GitHub. Se dovesse pesare troppo, si passa a Git LFS o a un archivio immagini esterno.
- Il file `scratchpad` della sessione con le trascrizioni delle schede e il rapporto di ricerca (video, stampa, riferimenti di design) è in `docs/ricerca/`.
