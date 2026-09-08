# Note per Marco

## I 208 quadri: come sono entrati e come si gestiscono

Sono dentro tutti e 208, pubblicati, nella categoria «Pittura e grafica». Insieme alle 16 sculture il sito conta **224 opere**.

**Cosa è successo ai tuoi file.** Gli originali della cartella `cartella senza nome 4` non sono stati toccati né spostati: restano dove sono, 2 GB. Il progetto ne ha ricavato una copia leggera da 2000 px, in tutto 98 MB. Nei 118 quadri già scontornati ho tolto il bordo trasparente vuoto attorno all'opera, così nella griglia si vede il dipinto e non il vuoto intorno. Il sito li mostra interi invece di ritagliarli.

**Ogni opera ha un numero d'archivio**: da P-001 a P-208 per i dipinti, da S-001 a S-016 per sculture e opere pubbliche. Serve a ritrovare l'opera finché non ha un titolo, e resta anche dopo. Compare sotto la miniatura e nella scheda.

**Tre modi di guardarle**, con il selettore in alto a destra della pagina Opere:
- **Griglia**: le immagini grandi, una accanto all'altra.
- **Indice**: elenco tipografico con l'anteprima che segue il cursore. Buono per scorrere in fretta.
- **Provino**: miniature fitte, sette o nove per riga. È la vista giusta per 208 quadri: la pagina si abbraccia con un colpo d'occhio.

Ci sono poi la **ricerca** (per titolo, numero, materiale, luogo) e i filtri per categoria e decennio. Le opere si caricano a gruppi di 48 con il pulsante «Mostra altre», così la pagina resta leggera anche su telefono.

**Per aggiungere i dati con calma.** Ho preparato due strumenti che si rigenerano con `npm run schede`:
- `provino-opere.html`, un provino stampabile con tutte le miniature e i numeri. Si può stampare e annotare a mano con Pasquale.
- `schede-opere.csv`, un foglio da aprire con Excel o Numbers, una riga per opera. Si riempiono solo le caselle che si conoscono: titolo, anno, tecnica, misure, luogo. Le caselle lasciate vuote non cambiano nulla.

Quando il foglio è compilato, anche solo in parte, si lancia `npm run schede -- --applica` e le schede si aggiornano da sole. Si può ripetere quante volte si vuole, un po' alla volta.

**Pesi, per sapere dove siamo.**

| Cosa | Peso |
|---|---|
| I tuoi originali, intatti | 2,0 GB |
| Copie leggere dentro al progetto | 98 MB |
| Sito pubblicato, immagini comprese | 365 MB |

Le immagini sono in una sola copia condivisa dai tre temi: senza questo accorgimento sarebbero state moltiplicate per tre e avremmo sfiorato il limite di GitHub Pages.

**Una cosa su cui decidere.** 208 dipinti senza titolo, tutti insieme, rischiano di sommergere le sculture. Appena scegli il tema propongo di dividere in due: una pagina «Opere» con una selezione curata e una pagina «Archivio» con tutto, dichiarata come tale. La struttura è già pronta, è questione di un pomeriggio.

## Il nastro scorrevole (tema B): due versioni, tutte e due pronte

La barra che scorre sotto l'immagine di apertura esiste in due vesti, entrambe già nel codice. Nell'anteprima le trovi tutte e due nella stessa pagina, così le confronti:

- **Corsivo** (in home, sotto l'apertura): nomi dei materiali in corsivo serif, separati da un piccolo rombo vuoto, etichetta fissa «Materie» a sinistra. Più elegante e più vicino al tono dei testi dell'artista.
- **Mono** (nel piè di pagina, in fondo a ogni pagina): maiuscoletto monospazio con pallino arancione, la prima versione, con etichetta «Luoghi».

Miglioramenti comuni a entrambe: i bordi sfumano invece di tagliare le parole di netto, c'è l'etichetta fissa a sinistra separata da una riga sottile, il nastro si ferma al passaggio del mouse e resta immobile per chi ha attivato «riduci movimento». In home scorrono i **materiali**, nel piè di pagina i **luoghi**, così la stessa pagina non ripete due volte lo stesso elenco.

Per cambiare veste basta una parola: in `src/temi/b/pagine/Home.tsx` e `src/temi/b/componenti/Footer.tsx` il componente `<Nastro …>` accetta `variante="corsivo"` (predefinita) oppure `variante="mono"`. Si possono anche togliere l'etichetta, invertire la direzione, cambiare velocità e sostituire le parole (gli elenchi di materiali e luoghi sono in `src/lib/testi.ts`, in italiano e in inglese).

## Le tre vesti grafiche a confronto (notte del 8-9 settembre)

Stessi contenuti, stesso pannello, tre vesti. Passa da una all'altra con la pillola A · B · C in basso a destra.

| | A · Carta e pietra | B · Ardesia | C · Calce |
|---|---|---|---|
| URL | [/](https://jojotheawesomecow.github.io/pasquale-liberatore-sito/) | [/b/](https://jojotheawesomecow.github.io/pasquale-liberatore-sito/b/) | [/c/](https://jojotheawesomecow.github.io/pasquale-liberatore-sito/c/) |
| Idea | catalogo d'arte su carta: calma, spazio bianco, mosaico di immagini | sito d'artista 2026: scuro, nome enorme, immagini a tutta larghezza, movimento deciso | l'incontro: la lettura e i caratteri di A dentro la struttura e il ritmo di B |
| Colori | bianco osso, pietra, muschio | ardesia quasi nera, osso, arancio «resina» (dal Seme in resina del 1982) | bianco calce, grafite, terracotta |
| Caratteri | Newsreader (serif) + Geist | Instrument Sans (grotesk) + Instrument Serif corsivo + Geist Mono per i dati | Newsreader per titoli e testi + Geist + Geist Mono |
| Home | testo e immagine affiancati, opere a mosaico | immagine a tutto schermo con il nome, nastro dei materiali, frase del manifesto parola per parola, opere sfalsate | immagine a tutta larghezza, nome e manifesto affiancati, griglia con didascalie |
| Opere | mosaico con filtri | griglia a bordo vivo (1 px di distanza) con numeri e info al passaggio, **oppure indice a elenco con anteprima che segue il cursore**; filtri per categoria e decennio | griglia con didascalie sotto, barra dei filtri che resta fissa scorrendo, stesso indice a elenco |
| Scheda opera | colonna dati fissa + immagini impilate | titolo enorme, **nastro orizzontale trascinabile** delle foto, dati in mono, opera precedente/successiva con anteprima | titolo serif enorme, immagini impilate con numerazione, dati in mono |
| Movimento | dissolvenze leggere | scorrimento fluido (Lenis), cursore personalizzato, immagini che si scoprono con un taglio, testi parola per parola, transizione tra pagine, barra di avanzamento, orologio di Villa Sant'Angelo, nastro dei materiali | transizione tra pagine, immagini che si scoprono, testi parola per parola; niente cursore né scorrimento modificato |
| Rischi | può sembrare «tradizionale» | il nero esalta il marmo ma penalizza le foto con molto cielo e prato; più pesante da mantenere coerente con 100 quadri di colori diversi | il più equilibrato; meno «effetto wow» di B |

**Cosa ha detto la ricerca (91 siti analizzati, rapporto in `docs/ricerca/design-2026.md`).** La grammatica dei siti d'arte 2026: un solo grotesk (più eventualmente un serif contemporaneo), metadati in monospazio (58 siti su 91), etichette maiuscole piccole, nome enorme, righe sottili, colore che viene dalle opere su fondo quasi nero o bianco sporco con un solo accento, «l'indice delle opere è il prodotto» (anteprime al passaggio, alternanza lista/griglia). Movimento: Lenis + rivelazioni con clip-path + transizioni native tra pagine; cursore personalizzato in 39 siti su 91; animazioni CSS legate allo scorrimento in nessuno (le ho usate per la barra di avanzamento in B). Superato: caroselli, parallasse pesante, hamburger su desktop, preloader. I siti degli scultori della pietra sono indietro: solo Jago è scuro e animato.

**Alternative pronte all'uso, se vuoi provarle** (bastano pochi minuti ciascuna):
- B con accento «oro pietra» `#C9A57A` o «lichene acido» `#D4FF3F` al posto dell'arancio; oppure B «due toni» che alterna sezioni ardesia e sezioni Majella.
- C con titoli in Bricolage Grotesque (grotesk caratterizzato) al posto di Newsreader e accento grigio-azzurro ardesia `#3E4A52`: è la variante suggerita dalla ricerca.
- Font di sistema: tutte le famiglie sono Google Fonts, autoinstallate con il sito, nessuna richiesta esterna.

**Come si sceglie.** Dimmi la lettera (o una combinazione: «B ma chiaro», «C con la home di B»…). Rendere definitivo un tema è un cambio di una riga in `next.config.ts`.

---
 — cosa c'è, cosa manca, cosa verificare

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
