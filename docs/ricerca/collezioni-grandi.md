# Come si presentano grandi corpus di opere e fotografie

Ricerca sul campo per ridisegnare la sezione **Opere** del sito di Pasquale Liberatore
(224 opere: 16 sculture con metadati completi + 208 dipinti fotografati nel 2016 senza titolo,
anno, tecnica né dimensioni; proporzioni miste; 118 scontornati su trasparenza, 90 fotografati
a parete o su telo).

Data della ricerca: **8 settembre 2026**. Tutti i dati su librerie e versioni sono verificati
quel giorno interrogando il registry npm; tutte le misure di layout sono state prese aprendo
i siti in un browser vero e leggendo il DOM e gli stili calcolati, non dedotte.

Nota metodologica: `gerhard-richter.com` rifiuta le connessioni da questa rete (restituisce una
pagina "This site is unavailable" sia via HTTP diretto sia via browser, sia sul dominio nudo sia
sui percorsi profondi). I dati su quel sito qui sotto sono ricostruiti dagli URL e dagli snippet
presenti negli indici dei motori di ricerca, che però bastano a ricavare con precisione lo schema
di paginazione e di ricerca. Dove il dato è di seconda mano lo segnalo.

---

## 1. Archivi d'artista e cataloghi ragionati con corpus enormi

### 1.1 Philip Guston Catalogue Raisonné — il modello più vicino al nostro caso

`https://gustoncrllc.org/catalogue-raisonne/works`

È il caso di studio più utile di tutta la ricerca, per tre ragioni: gran parte delle opere è
**senza titolo**, le immagini sono **scontornate** (i nomi dei file contengono `M-siloDEF`,
"silhouetted"), e il sito separa in modo netto una selezione curata da un indice completo.

**Indice.** URL reale osservato:

```
/catalogue-raisonne/works?sort=date&order=ASC&limit=48&view=medium
/catalogue-raisonne/works?limit=48&filter[artwork_type]=Painting,Mural&view=medium
```

Tutto lo stato è nella query string: ordinamento, direzione, batch, filtri, vista. Deep-link
perfetto: si può mandare a un critico l'URL di una selezione filtrata.

- **Batch**: `limit=48`.
- **Viste**: `List` / `Medium` / `Large` (la documentazione parla anche di una vista `Scale`).
- **Griglia**: colonne di **larghezza uguale** (115 px in `view=medium`), ogni immagine mantiene
  la propria proporzione, quindi le altezze sono irregolari (misurate: 123, 131, 151, 172, 175,
  182 px). Non è masonry: è una griglia a righe in cui la riga ha l'altezza dell'elemento più
  alto, con le immagini allineate in basso.
- **Didascalia**: due righe soltanto — `Untitled, 1930` e sotto il numero di catalogo `D300002`.
- **Vista List**: aggiunge tecnica e dimensioni in pollici e centimetri
  (`Untitled, 1930 / Pencil on paper / 13¾ x 9⅞ in. / (34.9 x 25.1 cm) / D300003`).
- **Filtri**: periodo (5 ere 1913-1980), tipo (Drawing, Painting, Mural), medium (Oil, Acrylic,
  Fresco, Gouache, Watercolor, Ink, Pencil, Charcoal, Crayon), temi (Book, Clock, Head, Pure
  Drawings, Roma, Shoe, Small Panel, Studio), intervallo di date. Ordinamento: data crescente
  o decrescente.

**Immagini.** Il markup reale di una card:

```html
<img alt="Image of artwork titled Mother and Child by Philip Guston."
     loading="lazy" sizes="200px"
     srcset="…/thumb_P30-001_…webp    10w,
             …/thumb2_P30-001_…webp   40w,
             …/slideshow_P30-001_…webp 240w,
             …/normal_P30-001_…webp   800w"
     class="block h-full object-contain transition-all">
```

Il gradino da **10w** nel `srcset` è un LQIP vero, servito dallo stesso meccanismo delle altre
misure: nessun data-URI base64 nell'HTML. `object-contain`, mai `cover`. Nessun `content-visibility`.

**Peso del DOM**: con `limit=48` la pagina intera ha **763 nodi** e 48 `<img>`. Nessuna
virtualizzazione. È la prova pratica che a queste quantità non serve.

**Dettaglio.** Pagina vera e deep-linkabile: `/catalogue-raisonne/works/1362`. Contiene
`Browse Artwork` (ritorno all'indice), `Previous` / `Next` in alto, e in fondo **Previous Artwork
/ Next Artwork con il titolo e il numero del vicino** (`Untitled, 1968 — P68.092` →
`Untitled (License Plate), 1968 — P68.094`). Campi: Title, Date, Medium, Dimensions,
**Inscription**, Catalogue Number, Provenance, Exhibitions, Bibliography, Downloads (Image,
Artwork PDF).

**Opere senza titolo** — le convenzioni, testuali:

- `Untitled`
- `Untitled (Punchinello)` — il nome descrittivo attribuito da un gallerista va fra parentesi,
  ma il titolo resta "Untitled"
- `(Unknown title)` — quando anche "Untitled" sarebbe un'affermazione di troppo
- `c. 1930` per le date approssimate
- campo Inscription: **`Unsigned, undated`** — l'assenza diventa un dato registrato, non un buco
- `Dimensions unknown`
- Numerazione: lettera di genere + due cifre d'anno + tre progressive → `P80.001`, `D300002`

**Curato vs archivio.** Due voci di menu di primo livello diverse:
`Life and Work → Selected Works` e `Catalogue Raisonné → Artwork`.

**Segnalare che il lavoro è in corso.** Sotto l'indice, in modo permanente:
`Submission Form` · `Guide to Entries` · `Photographers` · `About the Catalogue Raisonné`.

---

### 1.2 Gerhard Richter

`https://www.gerhard-richter.com` (inaccessibile da questa rete; schema ricostruito dagli indici)

**Tassonomia**: Paintings / Atlas / Editions / Drawings / Overpainted Photographs / Oil on Paper /
Watercolours / Artist's Books / Prints / Other. I dipinti sono suddivisi prima per tipo poi per
periodo:

```
/en/art/paintings/abstracts/abstracts-19901994-31
/en/art/paintings/abstracts/abstracts-2005-onwards-69
```

**Opera singola annidata nel gruppo del periodo**, slug + id numerico:

```
/en/art/paintings/abstracts/abstracts-2005-onwards-69/cage-5-13809
/en/art/paintings/abstracts/abstracts-19951999-58/abstract-painting-10491/?p=1&sp=32
```

Il dettaglio è quel `?p=1&sp=32` in coda alla **pagina dell'opera**: la scheda si porta dietro
lo stato di paginazione dell'indice da cui sei arrivato, così "precedente / successivo" e il
ritorno ai risultati restano coerenti con come stavi sfogliando. È la soluzione più elegante
vista in tutta la ricerca al problema "prev/next dentro l'insieme filtrato corrente" senza
rinunciare a URL statici.

**Paginazione**: `sp` = elementi per pagina, `p` = pagina. Le opzioni offerte sono
**8 / 12 / 16 / 32 / 64 / All**.

**Ricerca avanzata**: `/en/art/search?artworkid=paintings&info=1&sp=32&p=1` con campi
title, number (numero di catalogo), location, data da/a giorno-mese-anno, dimensioni
height-min/max e width-min/max. Il parametro **`info=1`** è l'interruttore della densità:
mostra o nasconde i metadati sotto le miniature.

**Titoli**: il numero di catalogo è dentro il titolo, fra parentesi quadre —
`Bach (1) [785]`, `Cage Grid (Komplettes Set) [151]`, `Abstraktes Bild (809-1)`.

---

### 1.3 Roy Lichtenstein Catalogue Raisonné

`https://www.lichtensteincatalogue.org/catalogue/` — "Browse over 5,000 works"

- **Viste**: `Thumbnails` / `Thumbnails w/o Titles` / `List View`.
  La vista "miniature senza titoli" è esattamente la risposta al problema dei titoli assenti o
  ripetitivi: se 208 didascalie dicono la stessa cosa, si toglie la didascalia.
- **Densità**: `60 per page` / `120 per page` / `180 per page`.
- **Ordinamento**: numero RLCR ↑↓, Classification A-Z/Z-A, Date oldest-newest/newest-oldest,
  Title A-Z/Z-A.
- **Filters** + **Advanced search**.
- Sezioni separate per **`Large-Scale Sculpture`** e **`Unlocated Works`** (opere note ma non
  localizzate: un bucket dichiarato invece di un silenzio) e `View in Collections`.
- Card: titolo in corsivo, anno, numero `RLCR 144`.
- Voci: `/catalogue/entry.php?id=N`.

---

### 1.4 Robert Rauschenberg Foundation

`https://www.rauschenbergfoundation.org/art/search-artwork`

- **Paginazione numerata classica**: "Displaying 1 - 50 of 779", `?page=0`, `?page=1`, …
  Niente infinite scroll, niente load-more.
- Card: miniatura + titolo + data (`ca. 1948`).
- Filtri: parola chiave, `Year Start`, `Year End`. In parallelo `Browse by Series`.
- Opere: slug del titolo, `/art/artwork/first-half-print-designed-exist-passing-time`.
- Tre livelli distinti: `/art` (Art & Archives — curato: *Art in Context*, *Lightboxes*,
  *Archives Research Guides*), `/art/search-artwork` (i 779 record) e `/cr` (il progetto di
  catalogo ragionato, annunciato come in corso).

---

### 1.5 Wolfgang Tillmans — il caso che nega il problema

`https://tillmans.co.uk`

Menu completo: *Current Calendar · Installation View Archive · Publications · Lectures & Talks ·
Texts · Biography & Bibliography · betweenbridges.net · Political campaigns.*

**Non esiste un indice delle opere.** Uno dei fotografi viventi più prolifici indicizza i
*contesti* — mostre, libri, testi — non le immagini. Colonna singola, cronologica, testo prima
dell'immagine, URL `/exhibitions/keep-movin`, `/publications/p-2025-0002`.

È una posizione editoriale legittima e va tenuta presente come opzione zero: se le 208
fotografie del 2016 non reggono un'esposizione integrale, si può scegliere di non farne un
indice pubblico. Sconsigliato qui — ma va detto che c'è chi lo fa.

---

### 1.6 Gli archivi che non hanno un catalogo online

Dato importante e in gran parte controintuitivo: **la maggior parte dei grandi archivi
d'artista, in particolare quelli italiani, non pubblica nulla di navigabile.**

| Archivio | Situazione |
|---|---|
| **Ed Ruscha** (`edruscha.com`) | Nessun indice online. Portale verso 12 volumi Gagosian a stampa + contatto per i proprietari di opere. |
| **Archivio Alighiero Boetti** (`archivioalighieroboetti.it`) | Catalogo generale solo cartaceo: 4 tomi, 1961-1994 (l'ultimo, 1988-1994, uscito nel 2026). Nessun database pubblico. |
| **Fondazione Vedova** (`fondazionevedova.org`) | Nessun elenco. Un **servizio di registrazione**: il proprietario manda per email foto fronte/retro/firma + titolo, data, tecnica, misura, provenienza. |
| **Fondazione Lucio Fontana** | Database interno "costantemente aggiornato", cataloghi ragionati a stampa. Online solo pagine istituzionali. |
| **Archivio Opera Piero Manzoni** | Catalogo generale Skira/Celant, 1.229 opere. Software di catalogazione interno. Niente pubblico. |
| **Fondazione Burri** | Catalogo generale in 6 volumi, ~3.000 opere. Solo shop online. |
| **Andy Warhol Foundation** | Rimanda a tre cataloghi ragionati a stampa (dipinti-sculture-disegni, stampe, film). |
| **Josef & Anni Albers Foundation** | Le rotte `/art/...` e `/artists/selected-works/...` restituiscono 500 e 404: il sito è in stato incerto. |
| **Cy Twombly** (`cytwombly.info`) | Redirect 301 verso `arts.fm/artists/cy-twombly`. Nessuna fondazione con catalogo online. |

Gli esempi digitali veri sono pochi e quasi tutti americani o su piattaforma commerciale:

- **Agnes Martin CR** — `cahiersdartinstitute.org`, in abbonamento. Organizzato "per medium e per
  motivi, per permettere di considerare somiglianze e differenze fra opere collegate". Ricerca
  per tutti i termini / titolo / anno / numero di catalogo / ubicazione. Zoom su ~2.100 fotografie
  ad alta risoluzione, cronologia illustrata.
- **Arshile Gorky CR** — `gorkycatalogue.org`, gratuito ma con registrazione. Oltre 2.000 opere.
  Dichiara di essere "an ongoing project" e di "aggiornare e datare le voci esistenti".
- **Wildenstein Plattner Institute** — `wpi.art`: sette cataloghi digitali (Bearden, Degas,
  Gauguin, Eva Gonzalès, pastelli di Monet, Renoir, Wesselmann), tutti sulla piattaforma
  **navigating.art**. È di fatto lo stack standard per i cataloghi ragionati digitali.
- **Fundació Gala-Salvador Dalí** — `catalogues.salvador-dali.org`: due cataloghi (dipinti;
  scultura e opere tridimensionali), "tutte le opere attribuite all'artista fino a oggi".

---

## 2. Interfacce di collezione museale

Tutte le misure che seguono sono state prese aprendo il sito e leggendo `getComputedStyle`.

### L'algoritmo di griglia: cosa usano davvero

**Nessun museo usa righe giustificate.** Tre famiglie:

**(a) Colonne di larghezza fissa, altezze irregolari** — la scelta di maggioranza.

- **Tate** `tate.org.uk/collection?attributes=img` — larghezza 248 px, `aspect-ratio: auto 420/528`
  ricavato dall'immagine stessa, `object-fit: contain`, `loading="lazy"`, un solo derivato
  WebP `width-420`. Altezze misurate nella stessa colonna: 312, 347, 148, 247, 331 px.
- **Rijksmuseum** `rijksmuseum.nl/en/collection/search?collectionSearchContext=Art&page=1&sortingType=Popularity`
  — larghezza 280 px, altezze 422/311/231/184, `object-fit: cover`. Ogni tessera è un oggetto
  **Micrio** (`class="micrio-image"`): deep zoom su ogni singola miniatura. Contatori come
  navigazione: ARTWORKS (839.735) / LIBRARY (358.650) / VISITOR STORIES (208.435).
- **SMK Open** `open.smk.dk/en/art?q=*&page=0` — larghezza 240 px, altezze 160/163/166/203, lazy.
  Faccette molto profonde: Work type, Date, Material, Medium, Techniques, Acquisition date,
  On display in, Subject, Portrait of, Place depicted, **Color**, Artist/Maker, Nationality,
  Gender, Role, e tutta la scala attributiva (Attributed to, Earlier ascribed to, Workshop of,
  Follower of, After, School of, Imitator of, Circle of, Copy after, After model by).
- **Van Abbemuseum** — larghezza 207 px, altezze 162/311, lazy.

**(b) Box a proporzione fissa con `contain`.**

- **MoMA** `moma.org/collection/` — celle **1:1** con `aspect-ratio: 1/1` e `object-fit: contain`,
  quindi nessun ritaglio ma margini vuoti attorno alle opere non quadrate. `loading="lazy"`.
  "Our evolving collection contains almost 200,000 works… More than 106,000 works are currently
  available online." Filtri: **Has image**, **On view**, **Recent acquisition**,
  **Uncatalogued works**, 27 classificazioni, anni da Pre-1850 a 2026.
  Dettaglio: pagina vera `/collection/works/79802`, con "On view — MoMA, Floor 5, 501".

**(c) Altezza fissa, larghezza variabile — la "riga di base".**

- **The Met** `metmuseum.org/art/collection/search` — tutte le miniature alte **148-149 px**,
  larghezze 111 / 113 / 180 / 186 / 238, centrate in una cella uniforme 238×350.
  È un compromesso interessante: le immagini si allineano su una linea di base come in una
  vetrina, senza dover risolvere il problema della riga giustificata.
  Intestazione: **"1-42 of 370.701 results"** → 42 per pagina.
  Ordinamento: Relevance, Title (a-z), Title (z-a), Date (newest-oldest), Date (oldest-newest),
  Artist/Maker (a-z), Artist/Maker (z-a), Accession Number (0-9), Accession Number (9-0).
  Ambiti di ricerca: All Fields, Title, Description, Gallery, Object Number, Credit Line.

### Centre Pompidou (piattaforma Navigart)

`collection.centrepompidou.fr/artworks` — **128.768 opere.**

Le faccette mostrano il conteggio fra parentesi quadre, che è già una forma di orientamento:
`NOM ARTISTE [9 179]`, `NATIONALITÉ [386]`, `SECTEUR COLLECTION [11]`, `TYPE D'ŒUVRE [509]`,
`ANNÉE CRÉATION [242]`, `ANNÉE ACQUISITION [123]`, `MODE D'ACQUISITION [44]`, `ŒUVRES MNR [1]`,
`AVEC NOTICE [2]`. In alto due controlli notevoli: **`AVEC IMAGE [97 613]`** e
**`Tri aléatoire`** (ordinamento casuale — per una collezione dove nessun ordine è "giusto",
è una risposta onesta).

Ogni card: settore, credito fotografico, artista, titolo, data fra parentesi quadre quando
incerta (`[vers 1936 - 1937]`), **`Inv. : AM 1991-170`**, e `fait partie de l'ensemble "…"`
per le opere che appartengono a un insieme. I placeholder sono GIF 1×1 sostituite allo scroll.

### Van Abbemuseum — l'indice tipografico

`vanabbemuseum.nl/en/collection-research/collection`

213 risultati **in un'unica pagina**, come elenco alfabetico di titolo + data. Ordinamento a-z /
z-a. Filtri: Decade (1640-1650 … 2020-2030), Artwork type con la voce esplicita
**`(non assigned)`**, "In the museum". Le opere senza data stampano **`z.j. / s.a.`**
(*zonder jaar / sine anno*) — l'equivalente italiano è **`s.d.`**. URL slug del titolo:
`/en/collection-research/collection/ada`.

### Guggenheim — la selezione dichiarata

`guggenheim.org/collection-online`: "Featuring over 1,900 artworks by more than 625 artists,
the Collection Online presents a searchable database of **selected** artworks from the
Guggenheim's permanent collection of approximately 8,000 artworks… **continually expanded**."
Filtri: Artists, Dates, Mediums, Movements, Special Collections, Venues.

*(Cooper Hewitt: `collection.cooperhewitt.org` ora reindirizza a `si.edu` ed è dietro un
controllo anti-bot; non ispezionabile.)*

---

## 3. Interfacce fotografiche e algoritmi

### 3.1 Righe giustificate — Flickr, misurato dal vivo

`flickr.com/explore`, riquadro largo 880 px. Le tessere sono `position: absolute` dentro un
contenitore misurato. Per ogni riga:

| top | foto | altezze | somma larghezze |
|---|---|---|---|
| 272 | 3 | **187** | 840 |
| 464 | 3 | **431** | 840 |
| 896 | 3 | **280** | 840 |
| 1176 | 3 | **280** | 840 |
| 1464 | 3 | **422** | 840 |
| 1888 | 3 | **186** | 840 |

Una sola altezza per riga, la stessa larghezza totale per tutte le righe: è esattamente la firma
dell'algoritmo giustificato. Notare l'ampiezza dell'escursione (186 → 431 px): con poche foto per
riga e proporzioni molto diverse le righe "respirano" molto. Con 6-8 elementi per riga l'effetto
si attenua.

### 3.2 La matematica

Per una riga di *n* immagini con proporzioni `a_i = w_i / h_i`, larghezza del contenitore `W`
e spaziatura `s`, l'altezza comune della riga è

```
h = (W − s·(n−1)) / Σ a_i
```

**Approccio ingenuo (greedy)**: aggiungi immagini finché `h` non scende sotto l'altezza
obiettivo, poi chiudi la riga. Semplice, O(n), ma produce righe patologiche: basta un panorama
o un'immagine molto stretta e alta perché l'altezza collassi (Grant Trebbin documenta il caso
in cui una riga finisce "around a single pixel high").

**Approccio ottimo (partizione lineare)**: è il problema del *linear partition* risolto con
programmazione dinamica — si cerca la suddivisione della sequenza in righe che minimizza la
somma degli scostamenti dall'altezza obiettivo. È quello che usano Google+ prima e Google Photos
poi (Vjeux, 2012; Dan Schlosser), ed è quello che `react-photo-album` dichiara di implementare
per il layout `rows` ("arranging photos into similarly-sized rows using dynamic programming").
Un'euristica greedy dà comunque un'approssimazione 7/6 dell'ottimo.

Google Photos ha adattato l'algoritmo di impaginazione del **testo**: si sceglie un'altezza
massima di riga, si scalano le foto a quell'altezza, si somma la larghezza; quando si supera il
viewport si riscala tutta la riga perché entri. Tutte le foto di una riga hanno la stessa altezza,
tutte le righe la stessa larghezza, righe diverse hanno altezze diverse.

### 3.3 Confronto dei tre modelli

| | Righe giustificate | Colonne masonry | Griglia a rapporto fisso |
|---|---|---|---|
| Ritaglia? | mai | mai | sì con `cover`, no con `contain` |
| Ordine di lettura | riga per riga, corretto | **colonna per colonna: sbagliato per un archivio cronologico** | corretto |
| Serve conoscere le proporzioni | sì, tutte, prima | sì | no |
| Serve conoscere la larghezza del contenitore | sì | no (CSS `columns`) | no |
| Riflusso quando aggiungi elementi | solo l'ultima riga | **tutto: ogni opera già vista si sposta** | nessuno |
| CLS | zero se pre-calcolato | zero con `aspect-ratio` | zero |
| Virtualizzabile | per righe | difficile | banale |
| Problema tipico | la riga orfana finale ("widow") | ordine e riflusso | margini vuoti attorno alle opere |

**Nota critica sul sito attuale.** `OpereGriglia.tsx` usa
`columns-1 … sm:columns-2 xl:columns-3 [column-fill:_balance]`. Il multi-column CSS riempie
**colonna per colonna**: gli elementi 1, 2, 3 vanno in cima alla prima colonna, non da sinistra
a destra. Per un archivio ordinato per numero o per anno l'ordine visivo non corrisponde
all'ordine dei dati, e chi usa uno screen reader sente una sequenza diversa da quella che il
vedente scorre. Peggio: con `column-fill: balance` e il pulsante "mostra altri 96",
**ogni aggiunta ricalcola il bilanciamento e sposta tutte le opere già viste**. È probabilmente
la causa principale della sensazione del committente che "il modello di navigazione non funziona
a questa scala".

### 3.4 Librerie — dati verificati sul registry npm l'8 settembre 2026

| pacchetto | versione | pubblicata | licenza | unpacked | dipendenze | download/sett. |
|---|---|---|---|---|---|---|
| `react-photo-album` | 3.6.1 | 2026-07-30 | MIT | 79 KB | **0** (peer React 18/19) | 104.513 |
| `justified-layout` (Flickr) | 4.1.0 | 2021-01-06 | ISC nel package.json, MIT nel README | 54 KB | **0** | 18.563 |
| `yet-another-react-lightbox` | 3.32.2 | 2026-07-30 | MIT | 236 KB | **0** (peer React 16.8→19) | 521.213 |
| `photoswipe` | 5.4.4 | 2024-05-24 | MIT | 1.18 MB | 0 | 493.223 |
| `masonic` | 4.1.0 | 2025-04-22 | MIT | 842 KB | **11** | 80.904 |
| `@tanstack/react-virtual` | 3.14.11 | 2026-09-07 | MIT | 55 KB | 1 | 20.905.134 |
| `react-virtuoso` | 4.18.13 | 2026-09-05 | MIT | 238 KB | 0 | 2.978.422 |
| `medium-zoom` | 1.1.0 | 2023-11-16 | MIT | 131 KB | 0 | 377.281 |
| `react-medium-image-zoom` | 5.4.9 | 2026-08-12 | BSD-3 | 102 KB | 0 | 813.969 |
| `openseadragon` | 6.1.0 | 2026-08-06 | BSD-3 | 5.6 MB | 0 | 81.411 |
| `lightgallery` | 2.9.0 | 2025-10-01 | **GPLv3** | 7.8 MB | 0 | 91.025 |
| `glightbox` | 3.3.1 | 2025-01-21 | MIT | 392 KB | 0 | 45.776 |
| `plaiceholder` | 3.0.0 | 2023-05-24 | Apache-2.0 | 42 KB | peer `sharp` | 81.588 |
| `sharp` | 0.35.4 | 2026-08-26 | Apache-2.0 | 938 KB | 3 | 69.643.139 |

Letture:

- **`lightgallery` è GPLv3**: da escludere per un sito d'artista senza licenza commerciale.
- **`justified-layout` è fermo dal 2021** ma è 54 KB di pura geometria senza dipendenze e senza
  DOM. Non è un rischio di manutenzione: si può copiare nel repo o eseguire una sola volta in
  build. API: input array di proporzioni (o `{width,height}`) + config
  (`targetRowHeight`, `targetRowHeightTolerance`, `boxSpacing`, `containerPadding`,
  `containerWidth`, `forceAspectRatio`, `showWidows`, `fullWidthBreakoutRowCadence`);
  output `{ containerHeight, widowCount, boxes: [{aspectRatio, top, left, width, height}] }`.
  **Gira in Node al momento della build.**
- **`masonic` porta 11 dipendenze** per fare ciò che `content-visibility` + una griglia
  pre-calcolata fanno senza runtime. Sconsigliato qui.
- **`react-photo-album`** richiede `src`, `width`, `height` per ogni foto — che nel nostro caso
  ci sono già in `src/generated/immagini.json`. SSR: con `defaultContainerWidth` (default 800 px)
  emette markup reale e usa flexbox + `calc()` in modo che l'idratazione sia pixel-identica;
  esiste anche un componente SSR "zero-CLS" che pre-renderizza più layout e sceglie quello giusto
  con `@container` queries (costo: markup duplicato e più istanze idratate).
- **PhotoSwipe v5 ha rimosso il modulo history di v4**: l'URL non cambia più mentre si scorre e i
  deep link `#&gid=1&pid=N` non esistono più (issue #2119, #1419; un "tiny URL/history helper"
  è solo una proposta per v6). Chi vuole il deep link in overlay se lo scrive.
- `yet-another-react-lightbox`: plugin Zoom, Thumbnails, Captions, Slideshow, Fullscreen,
  Counter, Download, Share, Video, Inline. Precarica `(2 * preload + 1)` slide. Nessun
  deep-linking integrato: si guida dall'esterno con lo stato dell'indice e si sincronizza l'URL
  a mano tramite `on.view`.

Tutte queste librerie funzionano con `<img srcset>` puro e non richiedono un CDN di immagini —
il che è esattamente il vincolo di questo sito, che genera già i derivati 480/960/1600 WebP con
`sharp` in `scripts/immagini.mjs`.

### 3.5 Cosa usano gli strumenti che gli artisti scelgono davvero

**Cargo** (`docs.cargo.site/galleries`) offre cinque modalità:
`Grid`, `Columnized`, **`Justify`**, `Freeform`, `Slideshow`.
Testuale dalla documentazione: *"Justify… lays out images in rows of uniform height as if the
images were words in a text document"*, con allineamento left/right/center/full e la possibilità
di **bloccare manualmente dove finisce una riga**. E l'indicazione esplicita:
*"Grid layouts work best for images having equal width and height, while Columns layout works
best for images of different widths and heights."*
Il **Thumbnail Index** di Cargo è una gallery riempita automaticamente con pagine del sito,
filtrabile per Set o per Tag, con titolo e tag nella didascalia — cioè esattamente la struttura
"indice di schede" che serve a noi.

**Are.na** `/explore`: celle quadrate fisse 250×250 con l'immagine contenuta, pulsante
`Load more`, `Sort: Recently updated / Random`, `View: All / Channels / Blocks`.

**Getty Images**: griglia uniforme di miniature con paginazione numerata classica
("of 100", pulsante AVANTI). Nessun infinite scroll.

**Magnum Photos**: indice alfabetico A-Z con àncore per lettera e miniature lazy
(`a3-lazy-load`), poi gallerie per fotografo. L'alfabeto come partizione di primo livello.

---

## 4. Il modello di interazione della scheda

### Chi fa cosa

| sito | dettaglio | prev/next | deep link |
|---|---|---|---|
| Guston CR | **pagina** `/works/1362` | `Previous`/`Next` in alto + in fondo con titolo e numero del vicino | sì, e i filtri stanno nella query |
| Gerhard Richter | **pagina** annidata nel gruppo del periodo | sì, **con `?p=&sp=` ereditati dall'indice** | sì |
| MoMA | **pagina** `/collection/works/79802` | link a opere correlate | sì |
| The Met | **pagina** | paginazione dei risultati (42/pagina) | sì |
| Rauschenberg | **pagina** slug | paginazione `?page=N` | sì |
| Van Abbe | **pagina** slug | — | sì |
| Pompidou | **pagina** con `Inv.` | — | sì |
| Lichtenstein | **pagina** `entry.php?id=N` | — | sì |
| Flickr / Getty / Are.na | overlay o pagina foto | swipe/tastiera | sì (piattaforme foto) |

**Nessun museo e nessun catalogo ragionato usa un overlay come meccanismo primario di
consultazione.** Il lightbox compare solo *dentro* la scheda, per ingrandire le immagini di
quella singola opera.

### Prassi accettata nel 2026

1. **La scheda canonica è una pagina vera**, indicizzabile, citabile. Non negoziabile per un
   archivio d'artista rivolto a critici e gallerie.
2. Un **quick-look in overlay** è un acceleratore legittimo *sopra* la pagina, a tre condizioni:
   spinge una voce reale nella history, è apribile direttamente da quell'URL, e al `Esc`/back
   ripristina griglia e posizione di scorrimento.
3. **Prev/next devono restare dentro l'insieme filtrato corrente.** La soluzione di Richter —
   trasportare lo stato dell'indice nella query string della scheda — è la più pulita in un
   export statico, perché non richiede stato lato client né una SPA.
4. **Ripristino dello scorrimento**: NN/g e Baymard sono espliciti sul "pogo sticking" —
   *"save the shopper's position when they return from product detail pages"*. In Next.js App
   Router non è automatico: si usa `history.scrollRestoration` più una chiave in `sessionStorage`
   per `pathname + search`, oppure — più semplice e robusto in un export statico —
   un'**àncora `#p-077`** sulla card di provenienza.
5. **Load-more vs paginazione vs infinite scroll**, sintesi della ricerca NN/g e Baymard:
   - infinite scroll solo per flussi omogenei di scoperta (feed), mai per compiti mirati;
   - il **pulsante "carica altri" è il compromesso raccomandato**, purché mostri sempre il
     totale (`"Viewing 40 of 333"`) e lasci raggiungibile il footer;
   - paginazione numerata per insiemi molto grandi e per la consultazione mirata.
   Con 224 elementi, però, la domanda giusta è un'altra: **perché paginare?** Guston mette 48
   opere in 763 nodi DOM. 224 opere in un'unica pagina sono perfettamente sostenibili, e tolgono
   di mezzo insieme il load-more, il riflusso e il ripristino dello scorrimento.

---

## 5. Prestazioni e pattern di codice — misurato su questo repository

### Lo stato attuale, in numeri

Build in `out-tutti/opere/index.html`:

```
totale                     314.948 byte
gzip                        55.458 byte
dentro <script>            222.388 byte  (70%)  ← tutto payload RSC (self.__next_f.push)
markup                      92.516 byte
data-URI blur base64           272 occorrenze = 60.108 byte
srcset                         272 occorrenze
```

`src/generated/immagini.json`: 234 voci, 102 KB, stringa `blur` media 223 byte.

**272 = 224 + 48.** Cioè: le 224 opere finiscono per intero nel payload flight (perché
`Opere.tsx` passa l'array completo di `SchedaOpera` a un componente `"use client"`), e le 48
visibili vengono per giunta rese di nuovo nel markup. Ogni opera è serializzata due volte,
placeholder blur compreso. Il 70% della pagina è un array di props duplicato che il browser deve
scaricare, parsare e idratare **per mostrare 48 miniature su 224**.

### Interventi, dal più economico

1. **Non spedire `blur` per le card.** 60 KB di placeholder per miniature da 220 px sono un
   pessimo affare: a quella dimensione un colore di fondo pieno (o un colore medio di 4 byte per
   opera) è indistinguibile. Tenere il blur solo nella scheda opera e nel lightbox.
   Risparmio immediato: ~60 KB non compressi, ~15-20 KB gzip.
2. **Smagrire le props del client.** Passare solo ciò che serve al filtro
   (`slug`, `codice`, `anno`, `categoria`, `decade`, `w`, `h`, un URL di thumb, una chiave di
   ricerca già normalizzata). Meglio ancora: **rendere le card sul server** e passarle al
   componente client come `children`, oppure rendere tutti i 224 `<li>` sul server e lasciare al
   client solo il compito di togliere/mettere `hidden` e `data-*`. Con 224 elementi è del tutto
   praticabile e porta il JS di quella pagina quasi a zero.
3. **`content-visibility: auto` + `contain-intrinsic-size`** su ogni riga o card.
   web.dev misura 232 ms → 30 ms di rendering (7×) sul proprio demo e parla di
   "50% o più" di riduzione in generale; Facebook ha misurato fino a 250 ms in meno tornando a
   viste già in cache con `content-visibility: hidden`. `contain-intrinsic-size: auto <h>` fa
   ricordare al browser l'ultima altezza renderizzata — utile proprio per le griglie lunghe.
   Attenzione: **senza `contain-intrinsic-size` l'elemento occupa altezza zero e la scrollbar
   salta.** Il contenuto resta nel DOM e nell'albero di accessibilità, quindi Ctrl+F e SEO
   funzionano — al contrario di un virtualizzatore.
4. **Box a proporzione fissa**: già fatto. `Foto.tsx` imposta `aspectRatio: w/h` e gli attributi
   `width`/`height` sull'`<img>`. Non toccare, è la parte che oggi funziona.
5. **`loading="lazy"` sotto la piega, `loading="eager"` + `fetchpriority="high"` solo sulla prima
   riga.** Chromium avvia le lazy 1250 px prima del viewport su 4G (2500 px su connessioni lente)
   e circa il 97,5% arriva entro 10 ms dalla comparsa. Oggi `Foto.tsx` mette `priorita` a `false`
   ovunque nella griglia: la prima riga andrebbe forzata.
6. **Virtualizzazione: non serve.** La soglia comunemente citata è ~100 elementi *montati
   contemporaneamente*; il catalogo Guston rende 48 opere in 763 nodi DOM senza virtualizzazione
   e senza `content-visibility`. 224 card ≈ 2.500-3.500 nodi: perfettamente gestibile.
   `content-visibility: auto` dà quasi tutto il beneficio senza i costi di un virtualizzatore
   (ripristino dello scorrimento, Ctrl+F, ancore, SEO, stampa).
   `@tanstack/react-virtual` (55 KB, MIT, 20,9 M download/settimana) diventa sensato solo se
   l'archivio supera il migliaio di pezzi.
7. **Budget.** Obiettivo ≤ 60 KB gzip per l'intera pagina. Tolte le stringhe blur e la
   duplicazione delle props, si dovrebbe atterrare intorno a **25-35 KB gzip mostrando tutte e
   224 le opere**, contro i 55 KB attuali per mostrarne 48.

### Nota sull'export statico

In `output: "export"` non c'è modo di paginare lato server: o si spedisce tutto, o si generano
più pagine statiche (`/archivio/1`, `/archivio/2`). Dato che tutto sta in ~30 KB gzip,
**la pagina unica è la scelta giusta** — e rende inutile tutta la macchina di load-more,
riflusso e ripristino di posizione.

---

## 6. Presentare con dignità le opere senza titolo e senza data

### Le convenzioni, con la fonte

| convenzione | forma | fonte |
|---|---|---|
| titolo assente | `Untitled` / `Senza titolo` | Guston CR, Lichtenstein CR, MoMA, Pompidou |
| titolo descrittivo attribuito | `Untitled (Punchinello)` — il descrittivo va fra parentesi, il titolo resta "Untitled" | Guston, *Guide to Entries* |
| titolo davvero ignoto | `(Unknown title)` | Guston |
| data approssimata | `c. 1930`, `ca. 1948` | Guston, Rauschenberg |
| data incerta | `[vers 1936 - 1937]` fra parentesi quadre | Pompidou |
| data assente | `z.j. / s.a.` → in italiano **`s.d.`** | Van Abbemuseum |
| firma/data assenti | campo Inscription: **`Unsigned, undated`** | Guston |
| misure ignote | `Dimensions unknown` | Guston |
| numero d'inventario | `Inv. : AM 1991-170` | Pompidou |
| numero di catalogo come identità | `P68.093`, `D300002`; `RLCR 144`; `[785]` nel titolo | Guston, Lichtenstein, Richter |

**Il principio operativo**: dove manca un dato non si lascia un vuoto — si registra l'assenza.
`Unsigned, undated` è un'informazione; una casella bianca è un errore.

**Il numero È il nome.** In tutti e tre i cataloghi ragionati esaminati il numero di catalogo è
esposto con la stessa dignità del titolo, e Richter lo mette addirittura *dentro* il titolo.
Il repository ha già questo campo: `SchedaOpera.codice` (`P-001`, `S-016`), documentato nei tipi
come *"numero d'archivio: identifica l'opera finché non ha un titolo"*. È la soluzione, ed è già
lì. Va promossa a identificatore primario per i 208 dipinti, al posto del riquadro grigio
"Senza titolo" che oggi `OpereGriglia.tsx` mostra come fallback.

### Come dire che l'archivio è in lavorazione senza sembrare incompiuti

Lo schema ricorrente è: **dare un nome al vuoto e dargli una pagina.**

- **Arshile Gorky**: "an ongoing project… future installments will be published upon the
  completion of our continuing research", con voci datate a ogni aggiornamento.
- **Guston**: una riga permanente sotto l'indice — `Submission Form · Guide to Entries ·
  Photographers · About the Catalogue Raisonné`.
- **Lichtenstein**: un intero bucket intitolato **`Unlocated Works`**.
- **MoMA**: una faccetta chiamata **`Uncatalogued works`**, e i record incompleti marcati
  "not Curator Approved". E il numero detto ad alta voce: 200.000 opere, 106.000 online.
- **Van Abbe**: la voce di filtro `(non assigned)` per il tipo d'opera.
- **Vedova, Gorky, Ruscha, Boetti**: tutti espongono un canale di segnalazione per chi possiede
  un'opera (email o modulo, con l'indicazione di cosa mandare: foto fronte/retro/firma, titolo,
  data, tecnica, misure, provenienza).

Tradotto per questo sito: una **"Nota all'archivio"** breve e senza scuse, che dica che la
campagna fotografica del 2016 ha documentato 208 dipinti dei quali titolo, data e misure non sono
ancora stabiliti, e un link **"Segnala un'opera"** con l'elenco di cosa serve. Questo trasforma
la lacuna in prova di rigore. La cosa da non fare è il contrario: nascondere i 208 pezzi, o
riempirli di "Senza titolo, s.d., tecnica mista" ripetuto 208 volte, che è il modo più rapido per
far sembrare l'archivio finto.

**Corollario di interfaccia**: la card non deve riservare spazio a metadati che non ha. Le 16
schede complete possono avere tre righe di didascalia; le 208 ne hanno una sola (il codice), e
la griglia non deve mostrare 208 righe vuote allineate.

---

## 7. Selezione curata contro archivio completo

### Esempi reali

| sito | curato | completo | come si legano |
|---|---|---|---|
| **Philip Guston** | `Life and Work → Selected Works` | `Catalogue Raisonné → Artwork` (2.000+) | due voci di menu di primo livello **diverse** |
| **Guggenheim** | — | "over 1,900 artworks… **selected** artworks from… approximately 8,000" | la selezione è dichiarata nel testo introduttivo |
| **MoMA** | opere in evidenza, "On view" | "almost 200,000 works… more than 106,000 available online" | il numero stesso è il dispositivo di onestà |
| **Rauschenberg** | `/art` (Art in Context, Lightboxes, Research Guides) | `/art/search-artwork` (779) | più `/cr` per il progetto di catalogo |
| **Rijksmuseum** | Discover, Art Explorer, storie | ARTWORKS (839.735) | contatori come navigazione |
| **Tillmans** | tutto il sito | **non esiste** | — |

Il pattern dominante: **due percorsi distinti con nomi diversi, entrambi di primo livello,
che si citano a vicenda.** Non un filtro "solo in evidenza" dentro la stessa lista.

### Nomi per questo sito

- **Opere** — la selezione: le 16 sculture documentate più i pochi dipinti con scheda vera,
  con testi, immagini grandi, respiro. È la pagina che si manda a un curatore.
- **Archivio** — tutte e 224, numerate, indice, densa. È la pagina che si manda a chi cerca.

Alternativa più esplicitamente catalografica, sul modello Guston:
*Vita e opera → Opere scelte* e *Catalogo → Elenco delle opere*.

Da evitare "Galleria" per l'archivio: suona commerciale. Da evitare anche di chiamare "Opere"
la lista completa e mettere la selezione dentro, che è la configurazione attuale e la ragione
per cui la sezione non regge.

Il collegamento reciproco va esplicitato: ogni scheda curata finisce con
**"Scheda d'archivio →"**; l'indice porta in testa una riga fissa
**"Una selezione commentata si trova in Opere →"**.

---

## RACCOMANDAZIONE

### Opzione A — "Archivio": una pagina, tutte e 224, righe giustificate pre-calcolate in build

**Layout.** Righe giustificate. Le proporzioni sono già in `src/generated/immagini.json`
(`w`, `h` per ogni immagine), quindi si esegue `justified-layout` — o una sessantina di righe di
partizione lineare scritte a mano — **dentro un server component al momento della build**, per
3-4 breakpoint, e si emettono `<li>` con `width` e `aspect-ratio` inline; il breakpoint giusto lo
sceglie una `@container`/media query. **Zero JavaScript client per il layout.**
Altezza di riga obiettivo ~200-240 px su desktop, ~150 px su mobile; 5-7 elementi per riga, non 3
(con 3 le righe oscillano troppo, come misurato su Flickr).

**Raggruppamento.** Intestazioni sticky: le 16 sculture per decennio; i 208 dipinti per blocco di
numero d'archivio (P-001–P-050, P-051–P-100, …). Il blocco numerico è onesto — non finge un
ordine cronologico che non esiste.

**Trattamento delle due famiglie di immagini.** I 118 scontornati poggiano direttamente sul
colore della carta, senza cornice: è esattamente quello che fa Guston con le immagini "silo".
I 90 fotografati a parete o su telo prendono un filetto sottile, così il contorno fotografico
si legge come scelta e non come sbavatura. Questa distinzione, e non i metadati, è la vera
tassonomia visiva del corpus.

**Didascalia.** Solo il codice (`P-077`) sotto l'immagine, in maiuscoletto piccolo, più l'anno
per le 16 che ce l'hanno. Interruttore **"con dati / senza dati"** sul modello del
`Thumbnails w/o Titles` di Lichtenstein e dell'`info=1` di Richter.

**Filtri come link, non solo come stato**: `?tipo=pittura`, `?decennio=1980`, `?vista=elenco`,
deep-linkabili come il `?sort=date&order=ASC&limit=48&view=medium` di Guston.

**Scheda.** Resta la pagina per opera che c'è già (serve per la SEO). Si aggiungono prev/next che
trasportano il filtro corrente in query string (soluzione Richter) e il ritorno all'indice con
àncora `#p-077`. Overlay quick-look opzionale, e solo se spinge una voce reale nella history.

**Librerie**: `justified-layout` (54 KB, solo in build, zero costo a runtime) oppure niente;
`yet-another-react-lightbox` (MIT, 236 KB, zero dipendenze) solo se si vuole l'overlay.
Nessun virtualizzatore. `content-visibility: auto` per riga.

**Stima**: 2-3 giornate. Mezza giornata per la funzione di layout e il raggruppamento; mezza per
il disegno di card e didascalie; mezza per la chirurgia sul payload (togliere il blur dalle card,
smettere di spedire l'array completo di props); mezza per prev/next e ancore; mezza per portare
il tutto sui tre temi.

**Rischio specifico per questo artista**: le righe giustificate hanno un registro *fotografico*.
208 dei 224 pezzi sono letteralmente fotografie di dipinti, quindi il registro è discutibilmente
onesto — ma l'erede può percepire che un "provino a contatto di tutto" appiattisca le 16 sculture
maggiori allo stesso peso visivo di uno scatto non documentato del 2016. Si mitiga tenendo
**Opere** come percorso di prima classe e chiamando questa pagina **Archivio**.

---

### Opzione B — "Indice": prima l'elenco tipografico, poi le immagini

Sul modello Van Abbemuseum, della `List View` di Lichtenstein e della vista `List` di Guston.

**Layout.** La vista predefinita è un indice testuale denso: codice, titolo o `Senza titolo`,
anno o `s.d.`, tecnica; ordinato e raggruppato; anteprima dell'immagine al passaggio del cursore
(il componente `AnteprimaCursore.tsx` esiste già). Un interruttore passa alla griglia.

**Forza.** È la risposta più dignitosa a "non ci sono metadati": l'interfaccia smette di fingere
che siano schede illustrate e diventa un registro. È anche la pagina più leggera possibile
(nessuna immagine finché non serve) e la più facile da tenere onesta sulle lacune.

**Librerie**: nessuna. **Stima**: 1-1,5 giornate, gran parte del codice esiste.

**Rischio**: per 208 opere il cui unico contenuto *è* l'immagine, un indice testuale nasconde
l'unica cosa che c'è da vedere. Critici e gallerie rimbalzano. Ottima come **seconda** vista,
sbagliata come predefinita.

---

### Opzione C — Provino a contatto a rapporto fisso con quick-look in overlay

Sul modello MoMA (celle 1:1 con `contain`) e Are.na.

**Layout.** Celle quadrate o 4:5 uniformi, `object-fit: contain` sul colore della carta, 6-8 per
riga, nessuna didascalia nella griglia, il codice compare al passaggio. Il clic apre un lightbox
con tastiera e swipe, il codice e i metadati esistenti, e un link **"Scheda completa →"**.

**Forza.** Layout assolutamente prevedibile, CLS zero, banale da virtualizzare in futuro, legge
come *provino d'archivio*, e con `contain` non ritaglia nulla.

**Librerie**: `yet-another-react-lightbox` oppure PhotoSwipe (ricordando che in v5 non c'è
deep-linking: l'URL va sincronizzato a mano). **Stima**: 1,5-2 giornate.

**Rischio**: con `contain` e proporzioni miste si ottengono margini vuoti ampi attorno alle opere
orizzontali, e 224 riquadri identici hanno un'aria burocratica — l'opposto del tono sobrio ma
sostanzioso richiesto. Inoltre il modello overlay-first indebolisce le pagine per opera che
servono alla SEO.

---

### Quale costruirei: **l'Opzione A**, con l'elenco dell'Opzione B come seconda vista dietro un interruttore.

Cinque ragioni.

1. **È l'unica che fa esistere tutte e 224 le opere in una sola pagina senza ritagliarne né
   imbottirne nessuna.** Per un corpus che per il 93% è immagine e nient'altro, questo è il punto.
2. **Le proporzioni sono già nel manifest di build**, quindi il layout costa zero JavaScript
   client in un export statico senza CDN di immagini — esattamente il vincolo di questo sito.
3. **Corregge i due difetti reali di ciò che c'è oggi** invece di aggiungerci sopra una quarta
   vista: il `column-count` CSS che legge per colonne e che a ogni "mostra altri 96" rimescola
   tutte le opere già viste; e i 315 KB di pagina dei quali il 70% è un array di props duplicato
   per mostrarne 48 su 224.
4. **Coincide con quello che fa l'analogo più vicino nel mondo reale**: il catalogo ragionato di
   Philip Guston, anch'esso pieno di opere senza titolo e di immagini scontornate, con `limit=48`,
   didascalia a due righe "titolo, anno / numero", pagina di dettaglio vera con prev/next
   etichettati, e la coppia `Selected Works` / `Artwork`.
5. **Mantiene canoniche le pagine per opera**, quindi la SEO e il requisito "un critico deve poter
   citare un URL" sopravvivono.

**La cosa editoriale da fare insieme al codice**: rinominare la coppia di sezioni.
**Opere** = le 16 sculture più una manciata di dipinti, con i testi. **Archivio** = tutte e 224,
numerate, con in testa una breve *Nota all'archivio* che spiega la campagna del 2016 e invita
alle segnalazioni. È questa mossa, più del layout, a far leggere i metadati mancanti come ricerca
in corso invece che come un sito lasciato a metà.

---

## Fonti principali

**Archivi e cataloghi ragionati**
- Philip Guston CR — https://gustoncrllc.org/catalogue-raisonne/works · https://gustoncrllc.org/catalogue-raisonne/guide-to-entries · https://gustoncrllc.org/catalogue-raisonne/works/1362
- Gerhard Richter — https://www.gerhard-richter.com/en/art/search?artworkid=paintings&info=1&sp=32&p=1 (inaccessibile da questa rete; schema dagli indici)
- Roy Lichtenstein CR — https://www.lichtensteincatalogue.org/catalogue/
- Robert Rauschenberg Foundation — https://www.rauschenbergfoundation.org/art/search-artwork · https://www.rauschenbergfoundation.org/cr
- Wolfgang Tillmans — https://tillmans.co.uk/exhibitions
- Ed Ruscha CR — https://edruscha.com/
- Archivio Alighiero Boetti — https://www.archivioalighieroboetti.it/catalogo-generale/
- Fondazione Vedova — https://www.fondazionevedova.org/en/archive
- Fondazione Lucio Fontana — https://www.fondazioneluciofontana.it/en/attivita/cataloghi-ragionati/
- Andy Warhol Foundation — https://www.warholfoundation.org/
- Agnes Martin CR — https://cahiersdartinstitute.org/catalogues/agnes-martin/description
- Arshile Gorky CR — https://www.arshilegorkyfoundation.org/catalogue-raisonne
- Wildenstein Plattner Institute — https://wpi.art/catalogue-raisonne-databases/ · https://navigating.art/
- Fundació Gala-Salvador Dalí — https://catalogues.salvador-dali.org/catalogues/en/

**Musei**
- Tate — https://www.tate.org.uk/collection?attributes=img
- MoMA — https://www.moma.org/collection/ · https://www.moma.org/collection/works/79802
- The Met — https://www.metmuseum.org/art/collection/search?showOnly=withImage
- Rijksmuseum — https://www.rijksmuseum.nl/en/collection/search?collectionSearchContext=Art&page=1&sortingType=Popularity
- SMK Open — https://open.smk.dk/en/art?q=*&page=0
- Centre Pompidou / Navigart — https://collection.centrepompidou.fr/artworks
- Van Abbemuseum — https://vanabbemuseum.nl/en/collection-research/collection
- Guggenheim — https://www.guggenheim.org/collection-online

**Layout e algoritmi**
- Flickr, open source della justified layout — https://code.flickr.net/2016/04/05/our-justified-layout-goes-open-source/
- flickr/justified-layout — https://github.com/flickr/justified-layout
- Vjeux, Image Layout Algorithm – Google Plus — https://blog.vjeux.com/2012/image/image-layout-algorithm-google-plus.html
- Dan Schlosser, Building the Image Grid from Google Photos — https://medium.com/@danrschlosser/building-the-image-grid-from-google-photos-6a09e193c74a
- Grant Trebbin, Visually Appealing Image Layout — https://www.grant-trebbin.com/2016/05/visually-appealing-image-layout.html
- React Photo Album — https://react-photo-album.com/documentation
- Cargo 3, Galleries e Thumbnail Index — https://docs.cargo.site/galleries · https://docs.cargo.site/thumbnail-index

**Prestazioni e UX**
- web.dev, content-visibility — https://web.dev/articles/content-visibility
- web.dev, browser-level image lazy loading — https://web.dev/articles/browser-level-image-lazy-loading
- NN/g, Alternatives to Pagination on Product-Listing Pages — https://www.nngroup.com/articles/alternatives-pagination-listing-pages/
- NN/g, Infinite Scrolling: When to Use It — https://www.nngroup.com/articles/infinite-scrolling-tips/
- PhotoSwipe v5, rimozione del modulo history — https://github.com/dimsemenov/PhotoSwipe/issues/2119 · https://github.com/dimsemenov/PhotoSwipe/discussions/2170
