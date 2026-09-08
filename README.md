# Sito di Pasquale Liberatore

Sito ufficiale dello scultore e pittore Pasquale Liberatore (Villa Sant'Angelo, Abruzzo).
Costruito con **Next.js** ed esportato come **sito statico**: la cartella `out/` che nasce dalla build
può essere pubblicata su qualsiasi hosting (GitHub Pages, Aruba, Netlify, Vercel, Cloudflare…).

Italiano alla radice (`/opere/`), inglese sotto `/en/` (`/en/works/`), con selettore in alto a destra.

## Tre vesti grafiche (temi)

Contenuti, pannello, rotte e lingue sono unici; la veste grafica è intercambiabile (cartella `src/temi/`):

| Tema | Carattere | Avvio in locale | Anteprima |
|---|---|---|---|
| **A · Carta e pietra** | editoriale, chiaro, serif Newsreader, griglia a mosaico | `npm run dev` → :3000 | <https://jojotheawesomecow.github.io/pasquale-liberatore-sito/> |
| **B · Ardesia** | scuro, grotesk Instrument Sans + serif corsivo, immagini a tutta larghezza, scorrimento fluido, cursore, indice con anteprima | `npm run dev:b` → :3001 | <https://jojotheawesomecow.github.io/pasquale-liberatore-sito/b/> |
| **C · Calce** | chiaro, serif Newsreader per titoli e testi, struttura a tutta larghezza di B, movimento misurato | `npm run dev:c` → :3002 | <https://jojotheawesomecow.github.io/pasquale-liberatore-sito/c/> |

In basso a destra, nell'anteprima, una pillola **A · B · C** permette di passare da una versione all'altra sulla stessa pagina.
Per scegliere il tema definitivo basta cambiare il valore predefinito di `tema` in `next.config.ts` (oggi `"a"`) e, nel workflow, tornare a `npm run build` al posto di `npm run build:tutti`.

---

## 1. Requisiti (una volta sola)

1. Installa **Node.js 22 o superiore** da <https://nodejs.org> (versione LTS).
2. Installa **Git** (su Mac: `xcode-select --install`, oppure <https://git-scm.com>).
3. Scarica il progetto: `git clone https://github.com/jojotheawesomecow/pasquale-liberatore-sito.git`
4. Nella cartella del progetto: `npm install`

## 2. Avvio in locale

```bash
npm run dev
```

- Sito: <http://localhost:3000>
- **Pannello di amministrazione**: <http://localhost:3000/keystatic>

Il pannello (Keystatic) legge e scrive i file nella cartella `content/`: ogni opera, riflessione o video
è una piccola cartella con un file di testo e le sue foto. Non serve nessun account. Quando salvi nel pannello
il sito in locale si aggiorna da solo; le immagini nuove vengono ottimizzate automaticamente
(ci vogliono alcuni secondi).

Per **pubblicare** le modifiche online basta farne il commit e il push su GitHub (vedi §6).

## 3. Aggiungere un'opera dal pannello

1. Apri <http://localhost:3000/keystatic> → **Opere** → **Create Opere** (in alto a destra).
2. Compila:
   - **Titolo** (l'indirizzo web si genera da solo; lascialo così).
   - **Categoria**: Scultura, Opera pubblica e monumentale, Pittura e grafica, Disegno, Installazione, Performance.
   - **Anno**, **Luogo**, **Materiale** (sculture) o **Tecnica** (quadri), **Dimensioni**, **Collezione**: tutti facoltativi.
   - **Foto principale**: trascina il file. Meglio foto già ritagliate, senza cornici o scritte.
   - **Altre foto** (facoltative) con didascalia.
   - **Descrizione** in italiano e, se vuoi, in inglese. Se il campo inglese è vuoto il sito mostra l'italiano.
   - **In evidenza in home page**: spunta per farla comparire nella home (ne bastano 6).
   - **Ordine**: numero più basso = viene prima. Se vuoto, si ordina per anno decrescente.
   - **Stato**: *Bozza* per lavorarci senza pubblicare.
3. **Create** (o **Save**). Fatto: l'opera è in `content/opere/<nome>/index.yaml` e le foto in `content/media/opere/<nome>/`.

I campi in inglese si chiamano tutti `… (inglese)`; il fallback all'italiano è automatico.

## 4. Caricare molte opere insieme

Gli originali **non** vengono spostati né modificati: lo script ne ricava una copia leggera (2000 px, WebP)
dentro `content/media/opere/`. Nei file con sfondo trasparente toglie il bordo vuoto attorno all'opera.

1. Metti le foto in `import/`, oppure indica una cartella qualsiasi con `--da`.
   Una foto = un'opera; una sottocartella = un'opera con più foto.
2. Se i nomi dei file contengono titolo, anno o misure vengono letti da lì
   (es. `Seme di fava 2020 60x40x25.jpg`). Altrimenti si usano titoli provvisori.
3. Lancia l'importazione:

       npm run importa -- --da "/percorso/cartella" --categoria pittura --codice P --ordine 1000

   `--codice P` numera le opere P-001, P-002…, `--ordine 1000` le mette dopo le sculture,
   `--bozza` le importa senza pubblicarle, `--prova` mostra solo cosa farebbe.
4. `npm run immagini` per generare le versioni pubblicate (lo fa da solo anche `npm run dev`).

### Aggiungere i dati in un secondo momento

    npm run schede               # crea schede-opere.csv e provino-opere.html
    npm run schede -- --applica  # rilegge il foglio compilato e aggiorna le schede

`provino-opere.html` è un provino stampabile con tutte le miniature e i numeri d'archivio.
`schede-opere.csv` si apre con Excel o Numbers: una riga per opera, si riempiono solo le caselle note.

## 5. Le altre sezioni

| Sezione | Dove si modifica | Note |
|---|---|---|
| Home | Pannello → **Home page** | Immagine grande, frase di apertura, presentazione, citazione. Le opere mostrate sono quelle con *In evidenza*. |
| Chi sono | Pannello → **Chi sono** | Ritratto, biografia (testo formattabile), **Cronologia** (una voce per mostra/simposio/opera), nomi dei critici, bibliografia. |
| Riflessioni | Pannello → **Riflessioni** | Ogni testo ha titolo, data facoltativa, frase di apertura, immagine, testo e le **foto delle pagine del quaderno**. |
| Il mio giardino | Pannello → **Il mio giardino** | Testo, immagine di apertura, galleria, informazioni per le visite. |
| Video | Pannello → **Video** | Basta l'indirizzo YouTube. I video si caricano solo al clic (niente cookie). |
| Contatti | Pannello → **Contatti** e **Impostazioni del sito** | Testo, Instagram, email, telefono, indirizzo. |
| Impostazioni | Pannello → **Impostazioni del sito** | Nome, sottotitolo, descrizioni per Google, social, **modulo contatti**, mostra/nascondi sezioni Video e Giardino. |

**Modulo contatti.** Il sito è statico, quindi per ricevere i messaggi serve un servizio gratuito di recapito:
[Formspree](https://formspree.io) oppure [Web3Forms](https://web3forms.com). Crea un account, ottieni l'indirizzo
del modulo (es. `https://formspree.io/f/abcd1234`) e incollalo in **Impostazioni → Indirizzo del servizio per il modulo contatti**
(per Web3Forms compila anche la **Chiave di accesso**). Finché il campo è vuoto il modulo non appare e restano i link Instagram/email.

## 6. Pubblicazione

### GitHub Pages (anteprima attuale)
A ogni push sul ramo `main`, GitHub Actions (`.github/workflows/deploy.yml`) ricostruisce il sito e lo pubblica su
<https://jojotheawesomecow.github.io/pasquale-liberatore-sito/> (con `noindex`: i motori di ricerca non lo indicizzano).

```bash
git add -A
git commit -m "Nuove opere"
git push
```

### Dominio definitivo (pasqualeliberatore.com)
Il sito è pronto per qualsiasi hosting. Due strade:

- **Hosting statico moderno** (consigliato: Vercel, Netlify o Cloudflare Pages, tutti con piano gratuito): si collega il
  repository GitHub, si imposta il comando `npm run build` e la cartella `out`, e si punta il dominio dal pannello Aruba (DNS).
  Vantaggio: si può attivare il pannello Keystatic **online** (modalità GitHub) così i familiari modificano il sito dal browser
  senza installare nulla.
- **Aruba (hosting attuale)**: `npm run build` senza variabili d'ambiente e caricamento via FTP del contenuto di `out/`.

Variabili d'ambiente usate dalla build:

| Variabile | Significato | GitHub Pages | Dominio proprio |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | sottocartella in cui vive il sito | `/pasquale-liberatore-sito` | *(vuoto)* |
| `NEXT_PUBLIC_SITE_URL` | indirizzo pubblico completo | `https://jojotheawesomecow.github.io/pasquale-liberatore-sito` | `https://pasqualeliberatore.com` |
| `NEXT_PUBLIC_NOINDEX` | `1` = chiedi ai motori di non indicizzare | `1` | *(non impostare)* |

## 7. Comandi

| Comando | Cosa fa |
|---|---|
| `npm run dev` | sito (tema A) + pannello in locale, con ottimizzazione immagini in ascolto |
| `npm run dev:b` / `npm run dev:c` | lo stesso con il tema B (porta 3001) o C (porta 3002); si possono tenere aperti insieme |
| `npm run build:tutti` | i tre temi in `out-tutti/` (A alla radice, B in `/b/`, C in `/c/`), usato dall'anteprima su GitHub Pages |
| `npm run build` | sito statico in `out/` |
| `npm run anteprima` | serve la cartella `out/` su <http://localhost:3000> per controllare la build |
| `npm run immagini` | rigenera le immagini ottimizzate (`public/media/`) e il manifesto (`src/generated/immagini.json`) |
| `npm run importa -- --categoria pittura` | importazione massiva da `import/` |
| `npm run typecheck` / `npm run lint` | controlli sul codice |

## 8. Struttura del progetto

```
content/                 ← TUTTI i contenuti (testi, schede, impostazioni)
  opere/<nome>/index.yaml
  riflessioni/<nome>/index.mdoc (+ testo_en.mdoc)
  video/<nome>/index.yaml
  home/ bio/ giardino/ contatti/ impostazioni/
  media/                 ← foto originali (opere/, riflessioni/, giardino/, pagine/)
public/media/            ← versioni ottimizzate generate (non modificare, non in git)
src/app/                 ← rotte Next.js: (it) italiano, (en) inglese, (cms) pannello (solo in sviluppo)
src/pagine/              ← smistamento delle rotte e metadati (dispatch.tsx), funzioni comuni (utili.ts)
src/temi/a|b|c/          ← le tre vesti grafiche: ognuna ha stile.css, fonts.ts, componenti/ e pagine/
src/componenti/          ← componenti condivisi tra i temi (Foto, Rivela, TestoRivela, Marquee, IndiceOpere, Cursore, VideoEmbed, ModuloContatti…)
src/lib/                 ← rotte e lingue (rotte.ts, i18n.ts), lettura contenuti (contenuti.ts), immagini, testi statici
scripts/                 ← immagini.mjs (ottimizzazione), importa-opere.mjs (import massivo), dev.mjs
keystatic.config.ts      ← definizione dei campi del pannello
```

Per cambiare colori e caratteri di un tema: `src/temi/<tema>/stile.css` (sezione `@theme`) e `src/temi/<tema>/fonts.ts`.
Per aggiungere una lingua o rinominare un percorso: `src/lib/rotte.ts` e `src/lib/i18n.ts`.
