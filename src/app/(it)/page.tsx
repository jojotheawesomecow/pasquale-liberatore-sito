import type { Metadata } from "next";
import { tema } from "@tema";
import { metadataPagina } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataPagina("it", []);
}

export default function PaginaHomeIt() {
  return <tema.Home lang="it" />;
}
