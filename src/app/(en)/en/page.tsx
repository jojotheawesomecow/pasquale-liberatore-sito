import type { Metadata } from "next";
import { tema } from "@tema";
import { metadataPagina } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataPagina("en", []);
}

export default function PaginaHomeEn() {
  return <tema.Home lang="en" />;
}
