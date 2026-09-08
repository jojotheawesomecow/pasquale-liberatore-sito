import type { Tema } from "@/temi/tipo";
import { Archivio } from "./pagine/Archivio";
import { ChiSono } from "../b/pagine/ChiSono";
import { Contatti } from "../b/pagine/Contatti";
import { Giardino } from "../b/pagine/Giardino";
import { Privacy } from "../b/pagine/Privacy";
import { Riflessione } from "../b/pagine/Riflessione";
import { Riflessioni } from "../b/pagine/Riflessioni";
import { Video } from "../b/pagine/Video";
import { Documento } from "./componenti/Documento";
import { Home } from "./pagine/Home";
import { NonTrovata } from "./pagine/NonTrovata";
import { Opera } from "./pagine/Opera";
import { Opere } from "./pagine/Opere";

/**
 * Tema C: "Calce", chiaro, serif editoriale con la struttura a tutta larghezza del tema B.
 * Le pagine di testo riusano i componenti del tema B: cambiano solo caratteri e colori (stile.css).
 */
export const tema: Tema = { nome: "C", Documento, NonTrovata, Home, Opere, Archivio, Opera, ChiSono, Riflessioni, Riflessione, Giardino, Video, Contatti, Privacy };
