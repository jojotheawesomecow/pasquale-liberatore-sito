# Pasquale Liberatore — research report for the new website

Compiled 2026-09-08. Sources: WebSearch/WebFetch, direct curl of YouTube search/watch pages and oEmbed, headless browser render of pasqualeliberatore.com (the site is JS-only, Aruba SuperSite), PDF of the 2010 MIUR decree, Wikipedia IT, regional press. Working files (HTML dumps, images, caption crops) are in `scratchpad/research/`.

Legend for confidence: **[A]** verified on a primary page (oEmbed/watch page/official site); **[B]** consistent across two or more secondary sources; **[C]** single secondary source; **[?]** could not verify.

---

## 1. Video

### 1.1 Videos clearly about THIS artist

| # | URL | Video ID | Title (verified) | Channel | Published | Length | Notes | About this artist? |
|---|-----|----------|------------------|---------|-----------|--------|-------|--------------------|
| 1 | https://www.youtube.com/watch?v=KgrOUnMrxCA | `KgrOUnMrxCA` | *Forme della natura Forme del pensiero - versione integrale* | Antonio Marcotullio composer (`@antoniomarcotulliocomposer`) | 2025-10-19 | 59:23 | Description: "Una giornata nel microcosmo di PASQUALE LIBERATORE — Intervista a cura di Maria Elena Cialente — Riprese, montaggio e musiche di Antonio Marcotullio — Villa Sant'Angelo (AQ), Estate 2025". Long interview/portrait shot in the artist's house and garden. ~68 views. | **YES [A]** (oEmbed + watch page verified) |
| 2 | https://www.youtube.com/watch?v=MqpZ-qN3wEQ | `MqpZ-qN3wEQ` | *Forme della natura Forme del pensiero* | Antonio Marcotullio composer | 2025-10-19 | 19:06 | Short cut of #1, same description. ~245 views. Best candidate to embed on the new site. | **YES [A]** |
| 3 | https://www.youtube.com/watch?v=4rOB_OPCpRQ | `4rOB_OPCpRQ` | *Presentazione dei libri: Il Theridion triste e Tessere in controcanto di Maria Elena Cialente.* | Antonio Marcotullio composer | 2025-10-29 | 2:00:21 | Book launch in the Sala consiliare of the Comune di Villa Sant'Angelo (prefazione del sindaco Domenico Nardis; dialoga Rosella Pezzuti; letture Veronica Bernabeo). Description states the evening ended with the **preview screening of "Forme della natura. Forme del pensiero — Una giornata nel microcosmo di Pasquale Liberatore"**. | Related [A] — the description names him; whether he speaks on camera not verified. Low priority for embedding. |

oEmbed check (both confirmed): `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=KgrOUnMrxCA&format=json` and `...v=MqpZ-qN3wEQ...` return the titles above with `author_name: "Antonio Marcotullio composer"`.

Channel listing pages (`/@antoniomarcotulliocomposer/videos`) could not be parsed via curl (client-rendered), so there may be further clips on that channel; check manually.

### 1.2 Context videos (places/works where his sculpture stands; he is not the subject)

**Campo del Sole, Tuoro sul Trasimeno** (his column *Artiglio*, 1986, is one of the 27; none of these videos identifies it individually):

| URL | ID | Title | Channel | Year | Note |
|---|---|---|---|---|---|
| https://www.youtube.com/watch?v=M3iSHzWUy4E | `M3iSHzWUy4E` | *10 - Tuoro sul Trasimeno (Pg) - Il Museo di "Campo del Sole" di Pietro Cascella* | BDB - 2 | 2024 | 3:31. Description recounts the 1985–89 project and **lists the sculptors, including Liberatore** (description text checked). |
| https://www.youtube.com/watch?v=JWHMnPQTc_E | `JWHMnPQTc_E` | *Lo scultore Pietro Cascella crea la sua colonna per il "Campo del Sole" a Tuoro sul Trasimeno 1985* | Piero Ricci | 2023 (footage 1985) | 3:20. Archive footage of the first cantiere (1985) — Liberatore worked in the 1986 cantiere, so he is not in it. |
| https://www.youtube.com/watch?v=qDSV_vluHMo | `qDSV_vluHMo` | *CAMPO DEL SOLE. TUORO SUL TRASIMENO (PERUGIA, ITALY)* | etruscanwarrior | 2012 | 10:27 tour of the park. |
| https://www.youtube.com/watch?v=XjmSRHIe1s4 | `XjmSRHIe1s4` | *LAGO TRASIMENO - CAMPO DEL SOLE museo all'aperto - Full HD* | CLAUDIO MORTINI | 2013 | 4:33 |
| https://www.youtube.com/watch?v=BSLeEr7Rwno | `BSLeEr7Rwno` | *Lago Trasimeno. TUORO e le sculture permanenti: Campo del Sole* | Brunella Capparelli | 2013 | 5:58 |
| https://www.youtube.com/watch?v=MgFxOkx2cQM | `MgFxOkx2cQM` | *Tuoro sul Trasimeno - Campo del sole - alba* | Bohemian Flying | 2022 | 2:24 drone at dawn |
| https://www.youtube.com/watch?v=6Fa-oGdD2iU | `6Fa-oGdD2iU` | *Tuoro Sul Trasimeno, Umbria - Dji Avata 2* | SkyTech FPV | 2025 | 3:47 FPV drone |
| https://www.youtube.com/watch?v=wfyeeeU0iqI, …=ISEqzt639Cw, …=dg1mVef9KS8, …=cjWwh-vSopw, …=vYtEr0z5LMw | — | short amateur/drone clips of the park | various | 2018–2020 | 0:34–4:26 |

**Lettomanoppello, "Dieci giornate in pietra"** (his *Seme*, 2013, pietra della Majella, was made at the 2013 edition; none of these is confirmed to show him):

| URL | ID | Title | Channel | Year |
|---|---|---|---|---|
| https://www.youtube.com/watch?v=p9cYFL2F1Hg | `p9cYFL2F1Hg` | *10 GIORNATE PIETRA 2020 - RICCHEZZA: lavorazione della Pietra - LETTOMANOPPELLO* (official promo; description gives history since 1997) | 10 giornate in pietra Lettomanoppello | 2020 |
| https://www.youtube.com/watch?v=7Y_RO9bSJmk | `7Y_RO9bSJmk` | *Lettomanoppello, presentato l'evento "Dieci giornate in pietra"* | Metropolitan Web | 2020 |
| https://www.youtube.com/watch?v=fWEQyVHQXTY | `fWEQyVHQXTY` | *Lettomanoppello, cerimonia riaperte bottega Gennaro D'Alfonso per le Dieci Giornate in Pietra 2020* | CENSORINO TEATINO | 2020 |
| https://www.youtube.com/watch?v=H5ulduEsm5Y | `H5ulduEsm5Y` | *LETTOMANOPPELLO: AL VIA 10 GIORNATE IN PIETRA* | LAQTV | 2023 |
| https://www.youtube.com/watch?v=TttOwfu2eIc | `TttOwfu2eIc` | *Tornano le Giornate in Pietra di Lettomanoppello* | TV SEI | 2023 |
| https://www.youtube.com/watch?v=yGfq6xCMS_k | `yGfq6xCMS_k` | *Lettomanoppello - Le giornate in pietra* | Rete8 | 2023 |

**Villa Sant'Angelo / Isola del Gran Sasso**: no video of the *Germoglio* monument (2010) or of the *Condensatore di rugiada* (2015) was found. `g64VQIGy6K4` (*Terremoto L'Aquila e Villa S.Angelo - L'Arte di vivere*, Lorenza D'Alessandro, 2019) is about a restorer, not him. The "Scuola Verde" channel (Isola del Gran Sasso) has videos (`AHzTTvC8s48`, `N3hBt3LW63U`) unrelated to the sculpture.

**Vimeo**: search page is client-rendered (8 KB shell); no Vimeo result surfaced through web search. Treat as "none found".

### 1.3 Search variants with no relevant hits
"Spartiacque entropico" (only physics videos on entropy), "Uomo Albero Liberatore" (only *L'uomo che piantava gli alberi*), "frontieradicampagna" (nothing), "Condensatore di rugiada Isola del Gran Sasso" (game guides), "Pasquale Liberatore Germoglio" (nothing), "Liberatore Villa Sant'Angelo De André piazza" (nothing).

### 1.4 Homonyms on YouTube — do NOT use
- **Bruno Liberatore** (sculptor, Penne 1947, Accademia di Roma): `p7sHCU-rDOU` *Bruno Liberatore 2000 Scultore Documentario…*, `wvJquWhBpEg` *Le sculture di Bruno Liberatore… Mercati di Traiano*. Most "Liberatore scultore" hits are his.
- **Pasquale Liberatore (systemic coach)**: `CKBcKTmJwcU` *Intervista a Paolo Iudicone e Pasquale Liberatore – Beyond Systemic*.
- **don Pasquale Liberatore (Salesian postulator)**: `XAywkQP4xa4`.
- **Pasquale De Carolis** ("scultore degli uccelli", d. 2024, also in the 2024 OMNI show): `l7uTudZU9aE`.
- **Tanino Liberatore** (comics): `4wwV8BLNf8M`. **Massimo Liberatore** (theatre): `JH14xCgRnfI`.
- "San Liberatore a Maiella" (abbey) pollutes every "Liberatore + Maiella" query.

**Bottom line: 2 confirmed videos about the artist (+1 related event video), all from October 2025, same author.**

---

## 2. Press, critical texts and mentions

### 2.0 The artist's own site (primary source) — pasqualeliberatore.com [A]
Aruba SuperSite, Italian only (the `og:url` points to `/en/home` but it redirects to the Italian home; there is no English content). Sitemap lists 5 pages: `/`, `/about`, `/i-semi-sono-il-territorio`, `/opere`, `/contact-me`. Fonts: Source Sans Pro + Open Sans. No social links, no video embeds, contact form only, cookie banner. Sitemap lastmod 2026-09-07 (auto).

- **Home** — "Sono uno scultore, un pittore, un artista. Studio il mondo e la natura nella mia casa e nel mio Giardino in Villa Sant'Angelo, Abruzzo." Two image captions "My sculptures in Lake Trasimeno, Tuoro".
- **/about (BIO)** — Nasce a San Demetrio Ne' Vestini nel 1950. Frequenta l'Istituto d'Arte di L'Aquila, poi si diploma/laurea all'Accademia di Belle Arti di L'Aquila. Nel **1977, a 27 anni**, gli viene affidato l'incarico di docente del corso di **"Tecnologia ed uso del marmo e della pietra"** nella scuola di scultura dell'Accademia di Belle Arti di L'Aquila. Immaginario legato ai luoghi montani e boschivi abruzzesi; **fin dalle prime opere degli anni Settanta riproduce in marmo e pietra semi ingigantiti**; "profonda partecipazione materica", attenzione alle "immagini archetipe".
- **/i-semi-sono-il-territorio** — the artist's manifesto (full text captured in the browser; ~450 words). Key ideas, in his words (short excerpts, attributed to the artist): "La materia inerte non esiste, la forza evolutiva opera nell'intero universo"; "In una pozzanghera il mare"; "Ogni pietra della nostra montagna può essere adatta per immaginare e progettare una scultura come fosse materia ossea del pianeta terra"; art must be seen "nella sua funzione socio-ecologica"; his art wants to show that "nelle forme dei semi ci siano le assonanze organiche che ricongiungono l'uomo alla natura". This page is the best existing text for a "Scritti / Pensiero" section and should be re-used (with permission) verbatim.
- **/opere** — 18 images, no HTML captions, but each JPEG is a "scheda" with the caption baked into the image (title, year, dimensions, material, place). Transcribed:

| # | Titolo | Anno | Dimensioni | Materiale | Luogo / collezione |
|---|--------|------|-----------|-----------|--------------------|
| 1 | *Germoglio* | 2021 | 60×35×15 cm | Ardesia e marmo bianco di Carrara | (photographed with the Gran Sasso behind) |
| 2 | *Germoglio* | 1982 | 120×50×25 cm | Marmo botticino rosa | Collezione privata (Roma) |
| 3 | *Crescendo* | 1983 | 100×60×20 cm | Marmo brecciato di Suvereto e piombo fuso | Esposta nel 1983 a Palazzo dei Diamanti, Ferrara; collezione privata (Roma) |
| 4–5, 17 | *Seme* (3 views) | 2013 | 160×100×90 cm | Pietra della Majella | Manifestazione "Dieci giornate in pietra", Lettomanoppello (PE) |
| 6 | *Esodo* | 2009 | ~40×20×10 cm (small print, verify) | Pietra Perla d'Abruzzo di Vigliano | Collezione privata |
| 7–8 | *La solitudine del viaggio e la preghiera* (2 views) | 1999 | 150×180×80 cm | Pietra di Fanano | XV Simposio Internazionale di Scultura su Pietra, Fanano (MO) |
| 9 | *Per Giorgia* | 2015 | 270×200×130 cm | Pietra Perla d'Abruzzo di Vigliano e pietra locale di Ripa Fagnano (AQ) | San Nicandro (AQ) |
| 10 | *Esodo* | 2015 | 150×120×80 cm | Travertino romano | San Benedetto del Tronto (AP) |
| 11 | *Meditazione* | 2000 | 60×30×30 cm | Pietra calcare di Poggio Picenze (AQ) | Collezione privata |
| 12–14 | *Artiglio* (3 views) | 1986 | 400×140×100 cm | Pietra arenaria serena di Sant'Agata (Lago Trasimeno) | "Campo del Sole", Tuoro sul Trasimeno (PG) |
| 15 | *Seme cosmico* | 2020 | 25×35×35 cm | Pietra di Pacentro | — |
| 16 | *Seme di fava* | 2020 | 60×40×25 cm | Ardesia e marmo bianco di Carrara | — |
| 18 | *Seme* | 1982 | 55×30×35 cm | Resina (red, back-lit) | Collezione privata |

Image asset pattern (for re-use, but the baked-in captions/white margins make them unsuitable for a new site — ask the artist for the original photos): `https://files.supersite.aruba.it/media/22246_<hash>.jpeg/v1/w_1400,h_0,dpr_1/<hash>.jpeg`. Hashes in grid order: `49202bd78595cf3608afb15adeb10762d8ccdea2` (Germoglio 2021), `c45241e569324b51bbe415ffa98e8c34e83ac987` (Germoglio 1982), `bbd6901a0ee83daf03e7b1121f1ecdaa584945c2` (Crescendo 1983), `70c07fedce6d5ac1c606dfd02d3c107afe90d30f` / `8ca72c700d218a1615cec94dbbf4988dfc6e4ee0` / `7a1e9f605db5249698c1ca71bfbc69901a6437f4` (Seme 2013), `e41487430268d43373bc0744cf7d716c6695a149` (Esodo 2009), `4c7c5375f6d6bbc46fe4ec70ee81d8dd20c3fa41` / `aab66d2cd2bcec1f0341f1505393cff6068666de` (Fanano 1999), `dedfb294a4adf2ca14688aca18aa88f11b5d2112` (Per Giorgia 2015), `3ee5e5ae9c1e0e31d94faaba164d3bb425fe95d0` (Esodo 2015), `3fef69f062d8e2805a4f13b55536cb45a2e397a1` (Meditazione 2000), `79c2d0c6ccbc455d49a532851fa8eeda4ed082d7` / `d1e9e5dcb9d8e2a86c33d147f379378d1b68f2fb` / `7cd3fcd70ffbdc8139c59898c613c41c937cc691` (Artiglio 1986), `debcb6893559e1d1fa5aa76675fe25f10e469fcb` (Seme cosmico 2020), `93b5fe0ebeee078e87c898901eda3506eec11597` (Seme di fava 2020), `e1f3eeffad667d05265d1a55e8b8c1202c1d4fe1` (Seme 1982). Manifesto page image: `34b9e07b2558f8f617578e868d1c063757ece521`.

### 2.1 Press articles and pages

1. **Il Centro** — "Villa Sant'Angelo, ricordo e speranza", 11 gennaio 2010, di Giustino Parisse — https://www.ilcentro.it/l-aquila/villa-sant-angelo-ricordo-e-speranza-1.406243 [A]
   Riassunto: cronaca dell'inaugurazione (10 gennaio 2010) del cippo commemorativo per le 17 vittime del 6 aprile 2009, opera dello scultore locale Pasquale Liberatore in pietra bianca della Maiella donata dal gruppo Alpini di Lettomanoppello, collocato nel punto più alto del nuovo villaggio, davanti alla chiesa di legno. Presenti il sindaco Pierluigi Biondi, il prefetto Franco Gabrielli, il parroco don Luigi. Nessuna dimensione indicata. Fatti utili: data inaugurazione, materiale, provenienza della pietra, luogo. Quote (Gabrielli): Villa Sant'Angelo "ha avuto la forza di rimboccarsi le maniche".

2. **Abruzzo24ore** — "Villa Sant'Angelo, un monumento in memoria delle 17 vittime", 8 gennaio 2010 — https://www.abruzzo24ore.tv/news/Villa-Sant-Angelo-un-monumento-in-memoria-delle-17-vittime/14437.htm [A]
   Riassunto: annuncio dell'inaugurazione di domenica 10 gennaio 2010, ore 12, nella piazza della nuova chiesa del Villaggio MAP "Borgo Trento". La statua in pietra bianca della Majella "rappresenta un germoglio", simbolo della volontà di rinascita e della memoria. Contributi raccolti dall'Associazione Nazionale Alpini di Lettomanoppello e finanziamento dell'amministrazione comunale. Liberatore è descritto come artista residente a Villa Sant'Angelo. Fatti utili: iconografia (germoglio), finanziamento, sito preciso (Borgo Trento).

3. **Adnkronos** — "L'Aquila: piazza dedicata a Fabrizio De André a Villa Sant'Angelo", 14 agosto 2008 — http://www1.adnkronos.com/Archivio/AdnAgenzia/2008/08/14/Cronaca/LAQUILA-PIAZZA-DEDICATA-A-FABRIZIO-DE-ANDRE-A-VILLA-SANTANGELO_154605.php [C — page unreachable, DNS error; content from search snippet only]
   Riassunto: nel 2008 il Comune dedica una piazza a Fabrizio De André; Liberatore avrebbe realizzato la targa/lapide in pietra. Da verificare.

4. **AbruzzoNews.eu** — "Dialogo artistico: Jörg Grünert e Pasquale Liberatore", 19 agosto 2015 — https://www.abruzzonews.eu/dialogo-artistico-jorg-grunert-e-pasquale-liberatore-324541.html [A]
   Riassunto: residenza artistica 9–16 agosto 2015 al Centro di Educazione Ambientale "Scuola Verde", San Pietro di Isola del Gran Sasso (TE), nel progetto "parco artistico del Gran Sasso", con patrocinio del Parco Gran Sasso-Laga e del Comune. Mostra "Un'esperienza di vita tra le materie della natura" e realizzazione di due sculture ambientali. Liberatore realizza il **"Condensatore di rugiada"**, grande foglia in "materiale tecnologico" nel giardino del Museo delle Acque del Parco: raccoglie rugiada e pioggia per abbeverare la microfauna (insetti, uccelli, lucertole); riferimento alle antiche cisterne pastorali; valore didattico. Le opere restano visibili liberamente. Grünert: nato a Colonia 1964, vive a Spoltore (PE).

5. **Giornale di Montesilvano** — "Una esperienza di vita tra le materie della natura", 19 agosto 2015 — https://www.giornaledimontesilvano.com/arte-cultura-e-eventi/una-esperienza-di-vita-tra-le-materie-della-natura [A]
   Riassunto: stesso comunicato; sottolinea l'intreccio tra "vita, arte, pensiero ecologico, filosofia e antropologia" e la funzione naturalistica di un materiale tecnologico. Nessuna biografia, nessuna dimensione.

6. **MU.SP.A.C. – Museo Sperimentale d'Arte Contemporanea, L'Aquila** — scheda artista "Liberatore Pasquale" (pagina caricata il 29/11/2017) — https://www.muspac.com/2017/11/29/liberatore-pasquale/ [A]
   Riassunto: testo critico di **Giulio Ciavoliello**: l'opera nasce dal rapporto ancestrale con il paesaggio e la pietra delle montagne abruzzesi, dove l'artista vive e lavora; dal locale al "linguaggio universale che esprime legami archetipi tra l'uomo e la terra" (Ciavoliello). Opere in collezione MU.SP.A.C.: *Senza titolo* (70×100 cm); *Una montagna di ricordi*, serigrafia, 50×70 cm; *Senza titolo* (s.d.). Nessuna data di nascita né elenco mostre. Fatti utili: presenza in una collezione museale aquilana; produzione grafica (serigrafia).

7. **AbruzzoWeb** — "OMNI: dieci artisti e la metamorfosi, mostra di 1CONA nella chiesa di San Sebastiano di Corbellino", 2 ottobre 2024 — https://abruzzoweb.it/omni-dieci-artisti-e-la-metamorfosi-mostra-di-1cona-nella-chiesa-di-san-sebastiano-di-corbellino/ [A]
   Riassunto: mostra "OMNI – Omnia mutantur, nihil interit", chiesa di San Sebastiano di Corbellino (Fagnano Alto, AQ), 5 ottobre–3 novembre 2024 (weekend), a cura dell'associazione 1CONA di San Demetrio ne' Vestini (curatrici Irene Marotta, Alessandra Bianchi, Debora Bella). Dieci artisti: Elena Mussi, Yoselin Giovani, Roberta Matuozzo, Silvio Cascioli, Davide Febbo, Debora Panaccione, Sebastian Alvarez, Valeria Befani, Pasquale Liberatore (Villa Sant'Angelo), Pasquale De Carolis (scomparso aprile 2024, 96 anni). Liberatore espone **"I corpi e le forme dei semi"**.

8. **AbruzzoWeb** — "OMNI: le metamorfosi nell'arte e nel cratere sismico, successo per mostra 1CONA a Corbellino", 7 ottobre 2024 — https://abruzzoweb.it/omni-le-metamorfosi-nellarte-e-nel-cratere-sismico-successo-per-mostra-1cona-a-corbellino/ [A]
   Riassunto: resoconto dell'inaugurazione; Liberatore indicato come "docente ed ex docente di Scultura all'Accademia di Belle Arti dell'Aquila"; opera "I corpi e le forme dei semi". Aggiunge l'installatore Giancarlo Gentilucci.

9. **AbruzzoWeb** — "OMNI: centinaia visite a mostra di Corbellino, 'arte vivifica territori', il programma nel weekend", 26 ottobre 2024 — https://abruzzoweb.it/omni-centinaia-visite-a-mostra-di-corbellino-arte-vivifica-territori-il-programma-nel-weekend/ [A]
   Riassunto: Liberatore "di San Demetrio ne' Vestini"; programma (laboratorio di tessitura di Valeria Befani, mammut di cartapesta del progetto Terre Sonanti, serigrafia, finissage teatrale di Marco Valeri il 3 novembre).

10. **L'Aquila Blog** — "A Corbellino un mese di rinascita e metamorfosi con la mostra Omni", 8 novembre 2024 — https://www.laquilablog.it/a-corbellino-un-mese-di-rinascita-e-metamorfosi-con-la-mostra-omni/ [A]; **Info Media News** — https://infomedianews.com/mostra-omni-omnia-mutantur-nihil-interit/ [A]; **Abruzzo Popolare**, 26 ottobre 2024 — https://www.abruzzopopolare.com/2024/10/26/omni-omnia-mutantur-nihil-interit-3/ [A]
    Riassunto: stessi contenuti; origine indicata alternativamente "San Demetrio ne' Vestini" (laquilablog, abruzzopopolare) o "Villa Sant'Angelo" (infomedianews).

11. **Wikipedia IT — "Campo del Sole"** — https://it.wikipedia.org/wiki/Campo_del_Sole [B]
    Riassunto: museo all'aperto a Punta Navaccia, Tuoro sul Trasimeno; 27 colonne-scultura in pietra serena (~4,5 m, ~1 m di diametro) disposte a spirale (Ø 44 m) verso una tavola centrale; progetto di Pietro Cascella con Mauro Berrettini e Cordelia von den Steinen; curatore Enrico Crispolti; tre cantieri: 1985 (9 scultori), **1986 (9 scultori: Anselmo Giardini, Pasquale Liberatore, Luigi Mainolfi, Volker Friedrich Marten, Costantino Nivola, Yoshin Ogata, Joaquín Roca-Rey, Francesco Somaini, Alí Traoré)**, 1988–89 (10). Bibliografia: E. Crispolti, *Campo del sole. Un'architettura di sculture*, Milano 1986/1988/1990.
    Pagine correlate: Umbria Cultura (scheda SAM9000170, elenca "Colonna" di Liberatore senza data) https://www.umbriacultura.it/SebinaOpac/resource/museo-allaperto-campo-del-sole-tuoro-sul-trasimeno-pg/SAM9000170; Trasimeno APP (29 nomi; colonne ~4,5 m, Ø 70–80 cm) https://trasimenoapp.com/percorsi-museali/campo-del-sole/?lang=en; LivingTuoro https://livingtuoro.it/en/campo-del-sole/; Archivio Crispolti (Crispolti cura il 1° dei tre cantieri su invito di Cascella) https://www.archiviocrispolti.it/en/biography/. **Il titolo della colonna, "Artiglio", risulta solo dalla didascalia dell'artista.**

12. **Wikipedia IT — "Premio Michetti"** — https://it.wikipedia.org/wiki/Premio_Michetti [C]
    Riassunto: Fondazione Michetti, Francavilla al Mare, dal 1947. Edizione **1986 "Il mare"**: tra gli artisti Mauro Berrettini, Mimmo Conenna, Carlo De Lucia, Piero Di Terlizzi, Ignazio Gadaleta, **Pasquale Liberatore**, Antonio Martarazzo, Lucia Narducci, Mario Ranieri, Giorgio Ruasi, Loreno Sguanci, Franco Summa, Sandro Visca, Anna Valla; omaggi a F.P. Michetti e a quattro artisti teramani dell'Ottocento. Curatore non indicato.

13. **MIUR — Decreto Direttoriale n. 229 del 1 dicembre 2010** (inquadramento docenti Accademie di Belle Arti nei settori disciplinari), PDF su FLC CGIL — https://m.flcgil.it/files/pdf/20101229/decreto-direttoriale-229-del-1-dicembre-2010-inquadramento-docenti-accademie-belle-arti-nei-settori-disciplinari_1.pdf [A]
    Riassunto: a p. 11, settore **"ABAV09 – Tecniche del marmo e delle pietre dure, 1ª fascia"**, voce n. 6 **"LIBERATORE PASQUALE"** (a p. 10, in altro settore, compare "LIBERATORE BRUNO", omonimo). Conferma il ruolo di docente di prima fascia nel settore marmo/pietre dure al 2010. La sede non è indicata nel decreto.

14. **Accademia di Belle Arti L'Aquila — pagina Docenti** — https://www.abaq.it/docenti/ [A]
    Riassunto: Liberatore non compare tra i docenti attuali (coerente con "ex docente", AbruzzoWeb 2024). Scuola di Scultura: https://scultura.abaq.it/. Accademia fondata nel 1969.

15. **Quadriennale di Roma — ArBiQ (archivio)** — indice artisti lettera L https://arbiq.quadriennalediroma.org/artisti?letter=L ; scheda XI Quadriennale https://arbiq.quadriennalediroma.org/oggetti/101617-undicesima-quadriennale-di-roma [A]
    Riassunto: XI Quadriennale, 16 giugno–16 agosto 1986, EUR Palazzo dei Congressi; sette sezioni (tra cui "Ricognizione Sud: una possibile campionatura"). Nell'indice artisti figurano **Liberatore Bruno, Liberatore Fausto Maria, Liberatore Nicola — nessun Pasquale**. La partecipazione alla Quadriennale 1986 non è quindi confermata dall'archivio ufficiale (vedi §3).

16. **Il Capoluogo** — "Villa Sant'Angelo, fiorisce il Giardino della Memoria", 4 dicembre 2019 — https://www.ilcapoluogo.it/2019/12/04/villa-santangelo-fiorisce-il-giardino-della-memoria/ [A]
    Riassunto: 17 alberi piantati dagli alunni (uno per vittima) presso la chiesa del Villaggio MAP Borgo Trento; non cita Liberatore, ma documenta il contesto del sito del monumento.

17. **Parco Nazionale Gran Sasso-Laga — Museo Centro per le Acque del Gran Sasso** — https://www.gransassolagapark.it/centrivisita_dettaglio.php?id=81 ; Scuola Verde https://scuolaverde.com/museo/ [B]
    Riassunto: il museo è a San Pietro di Isola del Gran Sasso, primo museo italiano dedicato al ciclo dell'acqua; è il sito del "Condensatore di rugiada".

18. **Regione Abruzzo / Comune di Lettomanoppello — "Dieci giornate in pietra"** — https://abruzzoturismo.it/it/dieci-giornate-pietra-lettomanoppello-pe-0 ; https://www.comune.lettomanoppello.pe.it/it/page/arte-e-mestieri ; AbruzzoNews 2020 https://www.abruzzonews.eu/dieci-giornate-in-pietra-lettomanoppello-6-13-settembre-2020-604580.html [B]
    Riassunto: manifestazione dal 1997 sulla pietra bianca della Maiella (Lettomanoppello "piccola Carrara"), dichiarata di alto interesse culturale dal Presidente della Repubblica; ospiti internazionali (Toshihiko Minamoto, Ming Jung Park). Nessuna pagina ufficiale elenca Liberatore; la sua partecipazione (2013, *Seme*) risulta dalla didascalia dell'artista.

19. **Treccani — "LIBERATORE, Pasquale"** — https://www.treccani.it/enciclopedia/pasquale-liberatore_(Enciclopedia-Italiana)/ — **OMONIMO**: giurista ed economista (Lanciano 1763 – Gragnano 1842). Da non confondere.

20. Other homonyms in print/web: **Bruno Liberatore** (brunoliberatore.com; Mercati di Traiano PDFs; Accademia dei Virtuosi) — scultore, Penne 1947, cattedra di scultura all'Accademia di Roma, temi "natura germinante" (similar themes — high confusion risk); **Pasquale Liberatore** LinkedIn (coaching sistemico); **Liberatore & partners**.

### 2.2 Facts usable for the biography (with source)
- Nato a San Demetrio ne' Vestini (AQ), 1950 [site A; laquilablog, abruzzoweb 26/10/2024].
- Istituto d'Arte di L'Aquila; Accademia di Belle Arti di L'Aquila [site].
- 1977: incarico di docente di "Tecnologia ed uso del marmo e della pietra", scuola di scultura, ABA L'Aquila [site]; nel 2010 inquadrato in 1ª fascia nel settore ABAV09 "Tecniche del marmo e delle pietre dure" [MIUR decree]; oggi "ex docente" [AbruzzoWeb 2024].
- Anni Settanta: prime opere, semi ingigantiti in marmo e pietra [site].
- 1982: *Seme* (resina), *Germoglio* (marmo botticino rosa) [captions].
- 1983: *Crescendo*, esposta a Palazzo dei Diamanti, Ferrara [caption].
- 1986: colonna *Artiglio* per Campo del Sole, Tuoro sul Trasimeno (cantiere 1986, cur. E. Crispolti) [Wikipedia + caption]; Premio Michetti "Il mare" [Wikipedia].
- 1999: *La solitudine del viaggio e la preghiera*, XV Simposio Internazionale di Scultura su Pietra, Fanano [caption; the XV symposium in 1999 on the "Via dei Pellegrini" is confirmed by Fanano sources, participants not listed].
- 2000: *Meditazione* [caption].
- 2008: targa per Piazza Fabrizio De André, Villa Sant'Angelo [Adnkronos, unverified].
- 10 gennaio 2010: monumento alle 17 vittime del terremoto, pietra bianca della Maiella, Borgo Trento, Villa Sant'Angelo [Il Centro, Abruzzo24ore].
- 2013: *Seme*, pietra della Majella, "Dieci giornate in pietra", Lettomanoppello [caption].
- 2015: *Per Giorgia*, San Nicandro (AQ); *Esodo*, San Benedetto del Tronto [captions]; agosto 2015: *Condensatore di rugiada*, Museo delle Acque, Isola del Gran Sasso, con Jörg Grünert [AbruzzoNews, Giornale di Montesilvano].
- Opere in collezione MU.SP.A.C. L'Aquila (2 senza titolo + serigrafia *Una montagna di ricordi*) [muspac].
- 2020–2021: *Seme cosmico*, *Seme di fava*, *Germoglio* (ardesia + Carrara) [captions].
- Ottobre–novembre 2024: "OMNI – Omnia mutantur, nihil interit", Corbellino (Fagnano Alto), opera "I corpi e le forme dei semi" [AbruzzoWeb ecc.].
- Estate 2025: documentario "Forme della natura. Forme del pensiero" (A. Marcotullio, intervista M.E. Cialente), anteprima a Villa Sant'Angelo, pubblicato 19/10/2025 [YouTube].
- Critici/autori che hanno scritto su di lui: Giulio Ciavoliello (MU.SP.A.C.); Enrico Crispolti (curatore Campo del Sole; catalogo 1986/1988/1990 — testo su Liberatore non verificato).

---

## 3. Facts to verify

1. **Birthplace vs residence** — "nasce a San Demetrio ne' Vestini" (site; laquilablog; AbruzzoWeb 26/10) but two OMNI articles call him "di Villa Sant'Angelo". Consistent reading: born San Demetrio, lives/works Villa Sant'Angelo (his home and garden). Confirm with the artist.
2. **Teaching title and dates** — Site: 1977, "Tecnologia ed uso del marmo e della pietra" (scuola di scultura). MIUR 2010: settore "ABAV09 – Tecniche del marmo e delle pietre dure", 1ª fascia. AbruzzoWeb 2024: "docente ed ex docente di Scultura". Need: exact course name(s) over time, and **retirement year** (not found anywhere).
3. **"Laureandosi" all'Accademia** — Accademia diplomas before 1999 were "diploma", not "laurea"; wording to fix in the bio.
4. **Quadriennale di Roma 1986** — the official ArBiQ artist index has no "Liberatore, Pasquale" (only Bruno, Fausto Maria, Nicola). Either a different exhibition (the **1986 Premio Michetti** is documented, and Campo del Sole 1986 was curated by Crispolti) or an ArBiQ gap. Ask the artist for the catalogue/section ("Ricognizione Sud"?) before publishing.
5. **Premio Michetti 1986** — only the Wikipedia list; confirm in the Fondazione Michetti catalogue (the artist may have a copy).
6. **Campo del Sole column** — title *Artiglio* and size 400×140×100 cm only from the artist's caption; generic sources say ~4.5 m tall and 1 m (Wikipedia) or 70–80 cm (Trasimeno APP) in diameter; stone "pietra serena" vs artist's "pietra arenaria serena di Sant'Agata". Year 1986 is consistent (Wikipedia + caption).
7. **Villa Sant'Angelo monument (2010)** — called "cippo" (Il Centro) and "statua" (Abruzzo24ore); no dimensions published; Il Centro says the stone was donated by the Alpini of Lettomanoppello, Abruzzo24ore says the Alpini raised contributions and the Comune financed; the press says it "represents a sprout" but no official title — confirm the title (*Germoglio*?) and that it is distinct from the small *Germoglio* works of 1982 and 2021.
8. **Piazza De André plaque (2008)** — Adnkronos page unreachable; verify existence/material/date.
9. **Condensatore di rugiada (2015)** — "materiale tecnologico" unspecified; no dimensions; confirm it is still in situ at the Museo delle Acque; confirm the exact title and the event dates (9–16 agosto 2015; article dated 19/08/2015).
10. **Dieci giornate in pietra** — the artist's caption dates *Seme* to 2013; no official list of participants per year found; confirm edition and current location of the sculpture (Lettomanoppello?).
11. **Palazzo dei Diamanti, Ferrara, 1983** — only from the caption of *Crescendo*; identify the exhibition (title, curator).
12. **Fanano 1999 (XV Simposio)** — symposium confirmed (10 sculptors, Via dei Pellegrini theme, stone from Ospitale/Fellicarolo valleys); Liberatore's name not confirmed on simposiodifanano.eu — check the "Scultura" archive there.
13. **MU.SP.A.C.** — the 29/11/2017 date is an upload date; the Ciavoliello text and the works' entry dates are undated. Ask MU.SP.A.C./the artist.
14. **"Spartiacque entropico" and "Uomo Albero"** — zero web hits (YouTube, web search); probably Instagram-only or recent titles. Get titles/dates/materials from the artist.
15. **Instagram** — `pasqualeliberatorescultore` and `frontieradicampagna` could not be read (login wall via curl; a logged-out browser returned "Profile non è disponibile" for `/frontieradicampagna/` — handle may differ, be private, or geo-blocked). Verify handles with the artist before linking.
16. **Esodo 2009 dimensions** (~40×20×10 cm) read from a tiny caption; verify.
17. **Homonyms to keep out of the site and its SEO**: Bruno Liberatore (sculptor, similar "germinating nature" themes), Pasquale Liberatore (jurist 1763–1842, Treccani), Pasquale Liberatore (systemic coach, LinkedIn/YouTube), don Pasquale Liberatore (Salesian), Tanino Liberatore (comics), Pasquale De Carolis (sculptor). Use "Pasquale Liberatore scultore" + "Villa Sant'Angelo" consistently in titles/meta.
18. **Current site metadata** — `og:url` = `/en/home` but no English exists; `robots.txt` has `Crawl-delay: 30`. Redirect map for the new site: `/about` → `/biografia`, `/opere` → `/opere`, `/i-semi-sono-il-territorio` → `/scritti/i-semi-sono-il-territorio`, `/contact-me` → `/contatti`.

---

## 4. Design references (2025–2026)

Method: each site fetched (structure) and, for the main ones, rendered in a headless browser (screenshot + computed fonts/colours). Font names below are the *computed* font-family values.

### 4.1 Reference by reference

1. **Giuseppe Penone — https://giuseppepenone.com/en** (IT/EN)
   - Nav: *Opere · Disegni · Edizioni · Parole · News · Note* + "English" as a plain word top-right. Hero: one full-bleed work (a thumbprint drawing), name small top-left, nothing else. Font: Söhne (grotesk), black on white.
   - Works well: radical restraint; a first-class **"Parole" (Words) section** for the artist's texts; language switch as a word, not a flag; one-image hero that changes.
   - Avoid: sans-only can feel clinical for stone/seeds; captions only on hover.

2. **Isamu Noguchi Museum — https://www.noguchi.org/** (EN/日本語)
   - Nav grouped: *Isamu Noguchi (Biography, Digital Features, Videos, Archives) · Museum · Artworks (Collection, Catalogue Raisonné, Public Works) · Akari & Shop*; centred wordmark. Fonts: **Sabon (serif) headlines + Neue Haas-style sans (NH-Text/NH-Display)**; warm near-black text `#333230`; small-caps kickers ("EXHIBITION", "BIOGRAPHY") above titles; asymmetric editorial grid with portrait photo.
   - Works well: the serif/sans pairing, kicker labels, **"Public Works" as its own category** (maps to Germoglio, Artiglio, Condensatore, Per Giorgia), "Videos" under the artist.
   - Avoid: museum-scale navigation; cookie bar; too many entry points for a single-artist site.

3. **Ursula von Rydingsvard — https://www.ursulavonrydingsvard.net/**
   - Dark theme (black, white type), **left sidebar with Sculpture grouped by year ranges (1976–present)**, Works on Paper, CV, Press, Catalogues, **Media (Videos, Lectures, Audio)**, Instagram. 3-column grid of works photographed on neutral grey; cards carry title, year, materials, dimensions. Fonts: nudista-web (condensed geometric sans) + adelle-sans.
   - Works well: chronological grouping in a persistent sidebar; complete metadata on cards; a Media section for video.
   - Avoid: all-black backgrounds fight white marble photography; long year lists on mobile.

4. **Antony Gormley — https://www.antonygormley.com/**
   - Serif identity (**Starling**), centred name, hamburger; homepage shows a single large image with a thin caption bar at the bottom ("Exhibition, venue, dates — See more →"). Big "Resources" area with texts and video.
   - Works well: serif wordmark, one-work-at-a-time hero, caption strip; texts and video treated as an archive.
   - Avoid: JS-gated pages (Vercel security checkpoint blocked non-browser fetches — an SEO risk); hamburger-only nav on desktop.

5. **Not Vital — https://notvital.com/**
   - Split-screen hero: two full-bleed photos labelled **STUDIO | FOUNDATION**; font "Plain" (grotesk), white type over imagery.
   - Works well: a bold "two doors" entry — for Liberatore an analogue could be *Opere | Il Giardino* or *Sculture | Scritti*.
   - Avoid: text over photos without contrast control; hidden navigation.

6. **Chillida Leku — https://www.museochillidaleku.com/en/** (ES/EU/EN/FR)
   - Landscape/architecture photography hero; nav *Visit us · Eduardo Chillida · Exhibitions · Agenda · Education · Museum · Collaborate*; languages as two-letter codes in the header. Font: DIN.
   - Works well: sculptures shown *in the landscape* (grass, trees, sky) — the nature-connected mood; compact language codes.
   - Avoid: stacked pop-ups (event notice + cookie modal) hiding the hero; museum-scale menus.

7. **Fondazione Arnaldo Pomodoro — https://www.fondazionearnaldopomodoro.it/** (IT/EN)
   - Nav *Centenario · La Fondazione · Servizi · Organizza la tua visita · Premio · Sostienici · Shop* + "IT" toggle; card grid (image → title → 2–3 lines → date/place → "Scopri di più"); **Catalogo Ragionato** searchable database + digital archive. Fonts: Epilogue + Roboto.
   - Works well: the card anatomy; the idea of a searchable catalogue with filters (year, material, location).
   - Avoid: full-screen cookie modal; corporate feel of geometric sans + cards.

8. **Ruth Asawa (estate) — https://ruthasawa.com/**
   - Nav *Art (Sculpture, Works on Paper, Black Mountain, Public Commissions) · Asawa At Work · Life · Exhibitions · Media · Resources · Contact*. Fonts: **Merriweather (serif) + Open Sans**; three CTA cards then a news feed.
   - Works well: legacy IA — *Life* split into themes; *Public Commissions*; *Resources* for teachers/researchers.
   - Avoid: grey `#888` body text (fails AA), template look, social share bar.

9. **Maya Lin Studio — https://www.mayalinstudio.com/**
   - Three big photo tiles **ART · ARCHITECTURE · MEMORY WORKS** on black; font Interstate; uppercase micro-nav.
   - Works well: a 3-door taxonomy; "Memory Works" as a category is directly relevant (the 2010 earthquake memorial, *Per Giorgia*, *Esodo*).
   - Avoid: black hero that renders blank while loading; tiny uppercase nav.

10. **Andy Goldsworthy — https://andygoldsworthystudio.com/**
    - Concept: **"Work added each month"**; archive by year; captions in the form "Dead hazel sticks and river stone. Dumfriesshire, August 2026." Fonts: system Helvetica/Roboto; body text grey `#848484` on white.
    - Works well: the diary rhythm (one new work/month) — fits the Instagram habit of *frontieradicampagna*; the caption grammar *material. place, month year*.
    - Avoid: low-contrast grey type (fails AA), dated WordPress template.

11. **Tony Cragg — https://www.tony-cragg.com/**
    - *Work* → Current Projects / Sculptures by decade (1969–today) / On Paper; *Info* → Biography, Publications. Carousel of project tiles.
    - Works well: decade grouping (Liberatore: 1980s, 1990s, 2000s, 2010s, 2020s) and medium split (Sculture / Pittura / Grafica).
    - Avoid: carousel as the only home content.

12. **Anish Kapoor — https://anishkapoor.com/**
    - Nav *Works · Thought · Experiment · Links · About*; reverse-chronological archive mixing works, press, interviews, video; search. Loading spinner on entry.
    - Works well: "Thought" as the label for texts; integrated press + video in the same timeline.
    - Avoid: spinner/blank first paint; dense archive without curation.

13. **Fondation Giacometti — https://www.fondation-giacometti.fr/en** (FR/EN)
    - Database (AGD), "Artworks stories", and **"Giacometti throughout the world" (geographic browsing)**.
    - Works well: a *map of public works* — Tuoro, Villa Sant'Angelo, Lettomanoppello, Isola del Gran Sasso, Fanano, San Nicandro, San Benedetto del Tronto, L'Aquila (MU.SP.A.C.).

14. **LAS Art Foundation — https://www.las-art.foundation/** (Awwwards Honorable Mention)
    - Full-width video hero, custom Dinamo typeface, tagged cards (Installation, In Conversation), Mux video, generous spacing.
    - Works well: tags on cards; video handled natively; motion kept to fades. Avoid: "tech" tone.

15. **Richard Long — https://www.richardlong.org/** — good IA (*Sculptures · Textworks · Exhibitions · Drawings · Documentary · Biography · About*, text-forward home) **but the fetched HTML contains injected casino spam links (site compromised)**. Lesson: use a maintained static/CMS stack and monitor. Do not cite as a live reference.

16. **Barbara Hepworth (estate) — https://barbarahepworth.org.uk/** — catalogue rigour (BH numbers; sort by date / catalogue number / medium / title; *Texts* section) in a dated design. Steal the **sorting facets**, not the look.

Also checked: Fondazione Burri (fondazioneburri.org — persistent ITA/ENG toggle, two venues; institutional), Museo Nivola (museonivola.it — Nivola was a fellow 1986 Campo del Sole sculptor; uses **flag icons** for IT/EN — avoid flags), Henry Moore Foundation (henry-moore.org — *See & Do / Discover & Research* IA). From curated lists (not verified first-hand): Norman Mooney (normanmooney.com, "gallery-like, immersive hero"), Anthony Sonnenberg (anthonysonnenberg.com, "clean white, serif type"), Tessa Silva (tessasilva.com, "minimal, image-led, materiality"), Kristina Rolander (kristinarolander.com, full-bleed images/video to convey scale), Jonathan Froud (jonathanfroud.com, large image grids), Matthew Burbidge (matthewburbidge.com, extensive archive). Sources: sitebuilderreport.com/inspiration/sculptor-portfolios, format.com sculpture gallery, pixpa.com artist portfolio list 2026, framer.com artist website examples 2026.

### 4.2 Synthesis — common patterns for artist/estate sites in 2025–2026
- **Hero**: one full-bleed work (Penone, Gormley), or 2–3 photographic "doors" (Not Vital, Maya Lin); the artist's name small and typographic; a one-line statement under it (Richard Long: "Art made by walking in landscapes"). Heavy video heroes belong to foundations, not single sculptors.
- **Works grid**: 3 columns desktop / 1–2 mobile; uniform aspect or masonry; **grouping by decade or by series** (seeds, sprouts, tubers, public works) in a sidebar or tabs; cards show *title, year, material, dimensions*; sorting facets (year, material, place) on catalogue-style sites.
- **Detail page**: large image(s) (slider or stacked), then a caption block (title · year · material · dimensions · location/collection), 1–3 paragraphs, "related works" and "back to series"; "more images" toggle (UvR).
- **Texts/writings**: a named section — *Parole* (Penone), *Thought* (Kapoor), *Texts* (Hepworth), *Resources* (Gormley) — with long-form serif reading measure (~65–75 characters), author/date meta, PDF downloads for catalogue essays.
- **Video**: a *Media/Video* section with embedded YouTube (privacy-enhanced `youtube-nocookie.com`), plus contextual embeds on the related work page.
- **Bilingual**: word or code toggle in the header ("English" / "IT | EN"), mirrored URLs `/it/…` `/en/…` with `hreflang`; never flags.
- **Typography**: either a serif/sans pair (Noguchi Sabon + Neue Haas; Asawa Merriweather + Open Sans; Gormley Starling) or a single quiet grotesk (Penone Söhne, Not Vital Plain, Chillida DIN). 2026 trend reports (Fontfabric, Envato, Colorlib) point to expressive/"soft" serifs with optical sizes, "quiet" sans for UI, typography as hero, tactile/imperfect textures, generous white space with occasional asymmetry.
- **Palette**: off-white/white ground with near-black text and no brand accent; photography carries the colour. Dark themes appear for wood/bronze (UvR) or architecture (Maya Lin) — not ideal for white marble. Pixpa/Framer 2026 lists confirm: minimal palettes, restrained menus, "named collections, never one endless feed".
- **Motion**: fades and hover-reveal captions only; avoid spinners, preloaders, and scroll-jacking (Kapoor's spinner, Maya Lin's black flash are the counter-examples).
- **Estate/foundation IA worth borrowing for a living artist**: *Opere · Opere pubbliche (mappa) · Scritti · Biografia · Video · Stampa · Contatti*.

### 4.3 Three Google Fonts pairings for "stone, seeds, mountains, editorial catalogue"
1. **Fraunces (display serif) + Inter (body/UI)** — Fraunces is a soft, slightly "wonky" old-style with optical-size and SOFT/WONK axes: rounded terminals read like weathered stone and seed forms; use it at 40–96 px for titles and the wordmark, italic for work titles. Inter (or Inter Tight for captions) stays neutral for metadata (dimensions, materials, dates) and bilingual UI. Warm-organic display + engineered body = "catalogue with a hand in it".
2. **Newsreader (display + text serif) + IBM Plex Sans** — Newsreader was drawn for on-screen editorial reading (optical sizes 6–72), with elegant italics for titles like *Seme di fava*; it gives the "Scritti" section a literary, catalogue-essay tone. IBM Plex Sans has a drafting-table precision that echoes "Tecnologia ed uso del marmo" and is excellent for tabular captions. Both have complete Italian diacritics and tabular figures.
3. **Cormorant Garamond (display) + Manrope (body/UI)** — Cormorant's tall, sharp Garamond forms feel like museum lettering cut in marble and suit vertical mountain imagery; use only ≥28 px (it is light at text sizes). Manrope is a geometric-humanist sans with an open, calm rhythm for body copy and navigation; its rounded forms soften the pairing toward seeds and moss.
   Alternatives if a more contemporary edge is wanted: **Instrument Serif + Instrument Sans** (very 2024–26, graphic), **EB Garamond + Figtree**, **Literata + Source Sans 3**, **Spectral + Public Sans**.

---

## 5. Palette ideas

Rationale: every colour is taken from a material that actually appears in the works — *marmo bianco di Carrara* (ground), *travertino* and *pietra della Majella* (surfaces), *ardesia* (type and dark mode), *muschio/lichene* (accent), *cielo di montagna* (secondary accent), *erba secca* (warm highlight). Two accents only; everything else is stone. Contrast computed with the WCAG 2.x relative-luminance formula (AA: ≥4.5:1 normal text, ≥3:1 large text/UI).

### 5.1 Light theme (default — white marble)

| Role | Name | Hex | Contrast vs bg `#F5F2EC` | vs surface `#E8E1D2` | Notes |
|---|---|---|---|---|---|
| background | Carrara | `#F5F2EC` | — | — | warm paper-white; cooler alternative `#F4F3F0` if photos are cool-toned |
| surface (cards, panels) | Travertino | `#E8E1D2` | — | — | |
| surface-2 (image mats, footer) | Majella chiara | `#D9D5CC` | — | — | |
| border / rules | Majella | `#CFC9BC` | 1.48 (decorative) | | 1 px hairlines |
| text | Ardesia | `#1E1F1D` | **14.81 AAA** | 12.71 AAA | |
| muted text | Grigio Majella | `#5F625A` | **5.56 AA** | **4.77 AA** | captions, metadata |
| accent (links, active nav, buttons) | Muschio | `#586A3B` | **5.31 AA** | **4.56 AA** | white text on it: 5.93 AA; stronger variant `#4F6135` = 6.08 / 5.21 |
| accent-2 (secondary links, video chip) | Cielo di montagna | `#476579` | **5.52 AA** | **4.74 AA** | white on it: 6.17 AA; the lighter `#5B7C93` only passes large text (3.96) |
| highlight A (tag backgrounds, hover wash) | Lichene | `#8E9A4E` | 2.73 — decorative only | | with Ardesia text on it: 5.42 AA; as *text* use `#65702F` (4.8 AA) |
| highlight B (badge/underline) | Erba secca | `#C4AB6E` | 2.00 — decorative only | | with Ardesia text on it: 7.41 AAA; as *text* use `#7F6A3A` (4.67 AA) |

### 5.2 Dark theme (ardesia — optional, e.g. for the video section)

| Role | Hex | vs bg `#1B1C1A` | vs surface `#252724` |
|---|---|---|---|
| background Ardesia | `#1B1C1A` | — | — |
| surface Ardesia-2 | `#252724` | — | — |
| text Carrara | `#EDE9E1` | **14.13 AAA** | 12.44 AAA |
| muted | `#A9A79F` | **7.10 AAA** | 6.25 AA |
| accent Muschio chiaro | `#9DB06F` | **7.23 AAA** | 6.36 AA (dark text on it: 7.23) |
| accent-2 Cielo chiaro | `#9CB9CB` | **8.32 AAA** | 7.33 AAA |
| Lichene chiaro | `#C9CF8A` | 10.41 AAA | 9.16 AAA |
| Erba secca chiara | `#D9C58C` | 10.03 AAA | 8.83 AAA |

### 5.3 Usage rules
- Photography first: keep chrome to Carrara/Travertino/Ardesia; use Muschio only for interactive states and the current-page marker; Cielo for the second level (e.g. "Video", external links). Lichene/Erba secca only as tinted backgrounds for material tags (*marmo*, *pietra*, *ardesia*, *resina*) with Ardesia text, or as a 3 px underline.
- Never set body text below 4.5:1 — the grey-on-white habit of Goldsworthy/Asawa (`#848484`, `#888`) fails AA.
- Provide a `prefers-color-scheme` swap using the table above; images of white marble look best on the light theme, so make dark mode opt-in rather than default.

---

## Appendix — search log (for reproducibility)
YouTube (curl of `/results?search_query=`, parsed `ytInitialData`): "Pasquale Liberatore scultore", "Pasquale Liberatore scultura", "Liberatore Villa Sant'Angelo Germoglio", "Spartiacque entropico", "Uomo Albero Liberatore", "Condensatore di rugiada Isola del Gran Sasso", "Dieci giornate in pietra Lettomanoppello Liberatore", "Campo del Sole Tuoro Liberatore", "frontieradicampagna", "pasqualeliberatorescultore", "Pasquale Liberatore Accademia Belle Arti L'Aquila", "\"Pasquale Liberatore\"", "Marcotullio Liberatore scultore", "Forme della natura Forme del pensiero Marcotullio", "Villa Sant'Angelo monumento vittime terremoto germoglio", "Grünert Liberatore Isola del Gran Sasso", "Museo delle Acque Isola del Gran Sasso scultura", "Liberatore Lettomanoppello scultore pietra Maiella", "OMNI 1cona Corbellino", "Cialente Liberatore scultore", "Pasquale Liberatore Germoglio", "Isola del Gran Sasso Scuola Verde Grünert 2015". Web: ~35 queries across Il Centro, AbruzzoWeb, Abruzzo24ore, AbruzzoNews, L'Aquila Blog, Il Capoluogo, MU.SP.A.C., ABAQ, ArBiQ, Wikipedia IT, Treccani, Campo del Sole sources, Lettomanoppello sources, Fanano symposium, Palazzo dei Diamanti.
