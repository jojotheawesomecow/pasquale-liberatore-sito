import type { Metadata } from "next";
import { Home } from "@/pagine/Home";
import { metadataPagina } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataPagina("en", []);
}

export default function PaginaHomeEn() {
  return <Home lang="en" />;
}
