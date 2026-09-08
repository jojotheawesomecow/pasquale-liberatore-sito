import type { Tema } from "@/temi/tipo";
import { Documento } from "./componenti/Documento";
import { ChiSono } from "./pagine/ChiSono";
import { Contatti } from "./pagine/Contatti";
import { Giardino } from "./pagine/Giardino";
import { Home } from "./pagine/Home";
import { NonTrovata } from "./pagine/NonTrovata";
import { Opera } from "./pagine/Opera";
import { Opere } from "./pagine/Opere";
import { Privacy } from "./pagine/Privacy";
import { Riflessione } from "./pagine/Riflessione";
import { Riflessioni } from "./pagine/Riflessioni";
import { Video } from "./pagine/Video";

/** Tema B: "Ardesia", scuro, grotesk, a tutta larghezza, movimento deciso. */
export const tema: Tema = { nome: "B", Documento, NonTrovata, Home, Opere, Opera, ChiSono, Riflessioni, Riflessione, Giardino, Video, Contatti, Privacy };
