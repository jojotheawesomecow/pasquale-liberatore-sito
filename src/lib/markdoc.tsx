import React from "react";
import Markdoc, { type Node, type RenderableTreeNodes } from "@markdoc/markdoc";

/**
 * Keystatic usa una propria copia di Markdoc: i tipi non coincidono ma la struttura sì,
 * quindi accettiamo un nodo generico e lo trattiamo come Node.
 */
type NodoGenerico = { type?: string; children?: unknown[] } | null | undefined;

/** Trasforma un documento Markdoc (dal campo di Keystatic) in elementi React. */
export function renderMarkdoc(nodo: NodoGenerico): React.ReactNode {
  if (!nodo) return null;
  const content: RenderableTreeNodes = Markdoc.transform(nodo as unknown as Node);
  return Markdoc.renderers.react(content, React, { components: {} });
}

/** Testo semplice (per estratti e metadati) a partire da un documento Markdoc. */
export function testoSemplice(nodo: NodoGenerico, max = 220): string {
  if (!nodo) return "";
  const parti: string[] = [];
  const visita = (n: Node) => {
    if (n.type === "text" && typeof n.attributes?.content === "string") parti.push(n.attributes.content);
    for (const c of n.children ?? []) visita(c);
  };
  visita(nodo as unknown as Node);
  const testo = parti.join(" ").replace(/\s+/g, " ").trim();
  return testo.length > max ? testo.slice(0, max).replace(/\s+\S*$/, "") + "…" : testo;
}
