import type { Tema } from "@/temi/tipo";
import { Documento } from "./componenti/Documento";
import { Archivio } from "./pagine/Archivio";
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

/** Tema A: "carta e pietra", editoriale, chiaro. */
export const tema: Tema = { nome: "A", Documento, NonTrovata, Home, Opere, Archivio, Opera, ChiSono, Riflessioni, Riflessione, Giardino, Video, Contatti, Privacy };
