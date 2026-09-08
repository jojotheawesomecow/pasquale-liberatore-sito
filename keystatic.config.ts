import { config, fields, collection, singleton } from "@keystatic/core";

/**
 * Configurazione del pannello di amministrazione (Keystatic).
 * Tutti i contenuti sono salvati come file di testo nella cartella `content/`
 * e le immagini nella cartella `content/media/`.
 * In locale: avvia `npm run dev` e apri http://127.0.0.1:3000/keystatic
 */

const IMG_OPERE = { directory: "content/media/opere", publicPath: "/media/opere/" };
const IMG_RIFLESSIONI = { directory: "content/media/riflessioni", publicPath: "/media/riflessioni/" };
const IMG_GIARDINO = { directory: "content/media/giardino", publicPath: "/media/giardino/" };
const IMG_PAGINE = { directory: "content/media/pagine", publicPath: "/media/pagine/" };

export const CATEGORIE_OPERE = [
  { label: "Scultura", value: "scultura" },
  { label: "Opera pubblica e monumentale", value: "opera-pubblica" },
  { label: "Pittura e grafica", value: "pittura" },
  { label: "Disegno", value: "disegno" },
  { label: "Installazione", value: "installazione" },
  { label: "Performance e simposi", value: "performance" },
] as const;

export const TIPI_CRONOLOGIA = [
  { label: "Mostra", value: "mostra" },
  { label: "Opera pubblica / monumentale", value: "opera-pubblica" },
  { label: "Simposio / manifestazione", value: "simposio" },
  { label: "Performance", value: "performance" },
  { label: "Premio / riconoscimento", value: "premio" },
  { label: "Vita e formazione", value: "vita" },
  { label: "Altro", value: "altro" },
] as const;

const testoBilingue = (label: string, multiline = false) => ({
  it: fields.text({ label: `${label} (italiano)`, multiline }),
  en: fields.text({ label: `${label} (inglese)`, multiline }),
});

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Pasquale Liberatore" },
    navigation: {
      Contenuti: ["opere", "riflessioni", "video"],
      Pagine: ["home", "bio", "giardino", "contatti"],
      Sito: ["impostazioni"],
    },
  },
  collections: {
    opere: collection({
      label: "Opere",
      slugField: "titolo",
      path: "content/opere/*/",
      columns: ["anno", "categoria"],
      entryLayout: "form",
      schema: {
        titolo: fields.slug({
          name: { label: "Titolo", description: "Titolo dell'opera in italiano" },
          slug: { label: "Indirizzo web", description: "Generato dal titolo, si può lasciare così" },
        }),
        titolo_en: fields.text({ label: "Titolo (inglese)", description: "Facoltativo: se vuoto, si usa il titolo italiano" }),
        codice: fields.text({ label: "Codice d'archivio", description: "Numero di inventario, es. P-001. Serve a ritrovare l'opera anche quando non ha ancora un titolo" }),
        categoria: fields.select({ label: "Categoria", options: CATEGORIE_OPERE, defaultValue: "scultura" }),
        anno: fields.text({ label: "Anno", description: "Es. 2013. Si può lasciare vuoto o scrivere 'anni Ottanta'" }),
        luogo: fields.text({ label: "Luogo", description: "Dove si trova o dove è stata realizzata/esposta" }),
        materiale: fields.text({ label: "Materiale", description: "Per le sculture: es. Pietra della Majella" }),
        tecnica: fields.text({ label: "Tecnica", description: "Per i quadri: es. Olio su tela" }),
        dimensioni: fields.text({ label: "Dimensioni", description: "Es. 160x100x90 cm" }),
        collezione: fields.text({ label: "Collezione / contesto", description: "Es. Collezione privata (Roma), oppure il nome della manifestazione" }),
        foto: fields.image({ label: "Foto principale", ...IMG_OPERE, validation: { isRequired: true } }),
        galleria: fields.array(
          fields.object({
            foto: fields.image({ label: "Foto", ...IMG_OPERE, validation: { isRequired: true } }),
            didascalia: fields.text({ label: "Didascalia (italiano)" }),
            didascalia_en: fields.text({ label: "Didascalia (inglese)" }),
          }),
          { label: "Altre foto", itemLabel: (p) => p.fields.didascalia.value || "Foto" }
        ),
        descrizione: fields.text({ label: "Descrizione (italiano)", multiline: true }),
        descrizione_en: fields.text({ label: "Descrizione (inglese)", multiline: true }),
        selezionata: fields.checkbox({ label: "Mostra nella pagina Opere", description: "Le opere non selezionate restano visibili nell'Archivio", defaultValue: false }),
        in_evidenza: fields.checkbox({ label: "In evidenza in home page", defaultValue: false }),
        ordine: fields.integer({ label: "Ordine", description: "Numero più basso = viene prima. Se vuoto, si ordina per anno", }),
        stato: fields.select({
          label: "Stato",
          options: [
            { label: "Pubblicata", value: "pubblicata" },
            { label: "Bozza (non visibile sul sito)", value: "bozza" },
          ],
          defaultValue: "pubblicata",
        }),
        origine: fields.text({ label: "File di partenza", description: "Nome della foto originale da cui è nata la scheda. Serve solo per ritrovarla nell'archivio" }),
      },
    }),

    riflessioni: collection({
      label: "Riflessioni",
      slugField: "titolo",
      path: "content/riflessioni/*/",
      columns: ["data"],
      format: { contentField: "testo" },
      schema: {
        titolo: fields.slug({ name: { label: "Titolo" } }),
        titolo_en: fields.text({ label: "Titolo (inglese)" }),
        data: fields.date({ label: "Data", description: "Facoltativa. Se presente viene mostrata e usata per l'ordine" }),
        ordine: fields.integer({ label: "Ordine", description: "Numero più basso = viene prima (facoltativo)" }),
        estratto: fields.text({ label: "Frase di apertura (italiano)", multiline: true, description: "Una o due righe mostrate nell'elenco" }),
        estratto_en: fields.text({ label: "Frase di apertura (inglese)", multiline: true }),
        immagine: fields.image({ label: "Immagine di apertura", ...IMG_RIFLESSIONI }),
        testo: fields.markdoc({ label: "Testo (italiano)" }),
        testo_en: fields.markdoc({ label: "Testo (inglese)" }),
        pagine: fields.array(
          fields.object({
            foto: fields.image({ label: "Foto della pagina", ...IMG_RIFLESSIONI, validation: { isRequired: true } }),
            didascalia: fields.text({ label: "Didascalia" }),
          }),
          { label: "Pagine del quaderno (foto)", itemLabel: (p) => p.fields.didascalia.value || "Pagina" }
        ),
        stato: fields.select({
          label: "Stato",
          options: [
            { label: "Pubblicata", value: "pubblicata" },
            { label: "Bozza (non visibile sul sito)", value: "bozza" },
          ],
          defaultValue: "pubblicata",
        }),
      },
    }),

    video: collection({
      label: "Video",
      slugField: "titolo",
      path: "content/video/*/",
      columns: ["anno"],
      schema: {
        titolo: fields.slug({ name: { label: "Titolo" } }),
        titolo_en: fields.text({ label: "Titolo (inglese)" }),
        url: fields.url({ label: "Indirizzo YouTube", description: "Es. https://www.youtube.com/watch?v=XXXX oppure https://youtu.be/XXXX", validation: { isRequired: true } }),
        anno: fields.text({ label: "Anno" }),
        descrizione: fields.text({ label: "Descrizione (italiano)", multiline: true }),
        descrizione_en: fields.text({ label: "Descrizione (inglese)", multiline: true }),
        ordine: fields.integer({ label: "Ordine" }),
      },
    }),
  },

  singletons: {
    impostazioni: singleton({
      label: "Impostazioni del sito",
      path: "content/impostazioni/",
      schema: {
        nome: fields.text({ label: "Nome del sito", defaultValue: "Pasquale Liberatore" }),
        tagline: fields.text({ label: "Sottotitolo (italiano)" }),
        tagline_en: fields.text({ label: "Sottotitolo (inglese)" }),
        descrizione_seo: fields.text({ label: "Descrizione per i motori di ricerca (italiano)", multiline: true }),
        descrizione_seo_en: fields.text({ label: "Descrizione per i motori di ricerca (inglese)", multiline: true }),
        instagram: fields.url({ label: "Instagram (indirizzo completo)" }),
        instagram_secondario: fields.url({ label: "Secondo Instagram (facoltativo)" }),
        youtube: fields.url({ label: "Canale YouTube (facoltativo)" }),
        email: fields.text({ label: "Email pubblica (facoltativa)" }),
        telefono: fields.text({ label: "Telefono pubblico (facoltativo)" }),
        indirizzo: fields.text({ label: "Indirizzo (facoltativo)", multiline: true }),
        form_endpoint: fields.text({
          label: "Indirizzo del servizio per il modulo contatti",
          description: "Es. https://formspree.io/f/xxxx oppure https://api.web3forms.com/submit. Se vuoto, il modulo non viene mostrato.",
        }),
        form_chiave: fields.text({ label: "Chiave di accesso del servizio (solo per Web3Forms)" }),
        mostra_video: fields.checkbox({ label: "Mostra la sezione Video nel menu", defaultValue: true }),
        mostra_giardino: fields.checkbox({ label: "Mostra la sezione Il mio giardino nel menu", defaultValue: true }),
      },
    }),

    home: singleton({
      label: "Home page",
      path: "content/home/",
      schema: {
        immagine: fields.image({ label: "Immagine grande di apertura", ...IMG_PAGINE }),
        immagine_didascalia: fields.text({ label: "Didascalia dell'immagine di apertura" }),
        titolo: fields.text({ label: "Titolo di apertura (italiano)", multiline: true }),
        titolo_en: fields.text({ label: "Titolo di apertura (inglese)", multiline: true }),
        testo: fields.text({ label: "Testo di apertura in prima persona (italiano)", multiline: true }),
        testo_en: fields.text({ label: "Testo di apertura in prima persona (inglese)", multiline: true }),
        presentazione: fields.text({ label: "Presentazione dell'artista (italiano)", multiline: true, description: "Breve testo in terza persona mostrato sotto l'apertura" }),
        presentazione_en: fields.text({ label: "Presentazione dell'artista (inglese)", multiline: true }),
        citazione: fields.text({ label: "Citazione (italiano)", multiline: true }),
        citazione_en: fields.text({ label: "Citazione (inglese)", multiline: true }),
        citazione_fonte: fields.text({ label: "Fonte della citazione", description: "Es. dal manifesto 'I semi sono il territorio'" }),
      },
    }),

    bio: singleton({
      label: "Chi sono",
      path: "content/bio/",
      format: { contentField: "testo" },
      schema: {
        ritratto: fields.image({ label: "Ritratto", ...IMG_PAGINE }),
        ritratto_didascalia: fields.text({ label: "Didascalia del ritratto" }),
        intro: fields.text({ label: "Frase di apertura (italiano)", multiline: true }),
        intro_en: fields.text({ label: "Frase di apertura (inglese)", multiline: true }),
        testo: fields.markdoc({ label: "Biografia (italiano)" }),
        testo_en: fields.markdoc({ label: "Biografia (inglese)" }),
        cronologia: fields.array(
          fields.object({
            anno: fields.text({ label: "Anno", validation: { isRequired: true } }),
            titolo: fields.text({ label: "Titolo (italiano)", validation: { isRequired: true } }),
            titolo_en: fields.text({ label: "Titolo (inglese)" }),
            luogo: fields.text({ label: "Luogo" }),
            tipo: fields.select({ label: "Tipo", options: TIPI_CRONOLOGIA, defaultValue: "mostra" }),
            nota: fields.text({ label: "Nota (italiano)" }),
            nota_en: fields.text({ label: "Nota (inglese)" }),
          }),
          { label: "Cronologia", itemLabel: (p) => `${p.fields.anno.value} — ${p.fields.titolo.value}` }
        ),
        interessati: fields.text({ label: "Si sono interessati al suo lavoro", multiline: true, description: "Un nome per riga" }),
        hanno_scritto: fields.text({ label: "Hanno scritto di lui", multiline: true, description: "Un nome per riga" }),
        bibliografia: fields.array(
          fields.object({
            testo: fields.text({ label: "Riferimento", multiline: true, validation: { isRequired: true } }),
            url: fields.url({ label: "Link (facoltativo)" }),
          }),
          { label: "Bibliografia e rassegna stampa", itemLabel: (p) => p.fields.testo.value.slice(0, 60) }
        ),
      },
    }),

    giardino: singleton({
      label: "Il mio giardino",
      path: "content/giardino/",
      format: { contentField: "testo" },
      schema: {
        titolo: fields.text({ label: "Titolo (italiano)", defaultValue: "Il mio giardino" }),
        titolo_en: fields.text({ label: "Titolo (inglese)", defaultValue: "The garden" }),
        intro: fields.text({ label: "Frase di apertura (italiano)", multiline: true }),
        intro_en: fields.text({ label: "Frase di apertura (inglese)", multiline: true }),
        immagine: fields.image({ label: "Immagine di apertura", ...IMG_GIARDINO }),
        testo: fields.markdoc({ label: "Testo (italiano)" }),
        testo_en: fields.markdoc({ label: "Testo (inglese)" }),
        galleria: fields.array(
          fields.object({
            foto: fields.image({ label: "Foto", ...IMG_GIARDINO, validation: { isRequired: true } }),
            didascalia: fields.text({ label: "Didascalia (italiano)" }),
            didascalia_en: fields.text({ label: "Didascalia (inglese)" }),
          }),
          { label: "Foto del giardino", itemLabel: (p) => p.fields.didascalia.value || "Foto" }
        ),
        visite: fields.text({ label: "Informazioni per le visite (italiano)", multiline: true }),
        visite_en: fields.text({ label: "Informazioni per le visite (inglese)", multiline: true }),
      },
    }),

    contatti: singleton({
      label: "Contatti",
      path: "content/contatti/",
      schema: {
        ...testoBilingue("Testo di presentazione", true),
        firma: fields.text({ label: "Firma", defaultValue: "PL" }),
      },
    }),
  },
});
