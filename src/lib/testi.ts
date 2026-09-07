import type { Lang } from "./rotte";

/** Testi statici lunghi che non ha senso far modificare dal pannello. */
export const TESTI = {
  it: {
    opereIntro: "Sculture, opere pubbliche e monumentali, pittura e grafica dagli anni Settanta a oggi.",
    riflessioniNota: "Altri pensieri e appunti vengono pubblicati regolarmente su Instagram.",
    senzaData: "Senza data",
    artista: "L'artista",
    cronologiaNota: "Le voci senza data provengono dagli archivi dell'artista e verranno completate.",
    privacy: {
      titolo: "Privacy",
      intro: "Questo sito rispetta la tua riservatezza: non usa cookie, non traccia le visite e non raccoglie dati di navigazione.",
      paragrafi: [
        "Il sito è composto da pagine statiche pubblicate su un servizio di hosting. Come ogni server web, il servizio può registrare per ragioni tecniche e di sicurezza dati come l'indirizzo IP e l'orario delle richieste, secondo la propria informativa.",
        "I caratteri tipografici sono ospitati insieme al sito: nessuna richiesta viene inviata a servizi esterni per il loro caricamento.",
        "I video sono incorporati da YouTube in modalità a privacy rafforzata (youtube-nocookie.com) e vengono caricati solo dopo un clic sull'anteprima. Da quel momento si applicano le condizioni e l'informativa di Google.",
        "Il modulo dei contatti, se attivo, invia il tuo nome, il tuo indirizzo email e il tuo messaggio a un servizio di recapito che li trasmette all'artista. I dati sono usati esclusivamente per rispondere e non vengono comunicati a terzi né usati per finalità commerciali. Puoi chiederne la cancellazione in qualsiasi momento scrivendo dalla pagina Contatti.",
        "I collegamenti a Instagram e ad altri siti esterni sono soggetti alle rispettive informative.",
      ],
      titolare: "Titolare del trattamento: Pasquale Liberatore, Villa Sant'Angelo (AQ).",
    },
  },
  en: {
    opereIntro: "Sculptures, public and monumental works, painting and prints from the 1970s to today.",
    riflessioniNota: "More thoughts and notes are published regularly on Instagram.",
    senzaData: "Undated",
    artista: "The artist",
    cronologiaNota: "Undated entries come from the artist's archives and will be completed.",
    privacy: {
      titolo: "Privacy",
      intro: "This website respects your privacy: it uses no cookies, does not track visits and collects no browsing data.",
      paragrafi: [
        "The site consists of static pages published on a hosting service. Like any web server, the service may log data such as IP addresses and request times for technical and security reasons, according to its own policy.",
        "Fonts are hosted together with the site: no request is sent to external services to load them.",
        "Videos are embedded from YouTube in privacy-enhanced mode (youtube-nocookie.com) and are loaded only after you click on the preview. From that moment Google's terms and privacy policy apply.",
        "The contact form, when active, sends your name, email address and message to a delivery service that forwards them to the artist. The data is used exclusively to reply and is neither shared with third parties nor used for commercial purposes. You can ask for its deletion at any time by writing through the Contact page.",
        "Links to Instagram and other external websites are subject to their respective policies.",
      ],
      titolare: "Data controller: Pasquale Liberatore, Villa Sant'Angelo (AQ), Italy.",
    },
  },
} as const;

export const testi = (lang: Lang) => TESTI[lang];
