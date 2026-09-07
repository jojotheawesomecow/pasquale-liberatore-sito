import type { Metadata } from "next";
import { elencoPercorsi, metadataPagina, renderPagina } from "@/pagine/dispatch";

type Props = { params: Promise<{ path: string[] }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await elencoPercorsi("en")).map((path) => ({ path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  return metadataPagina("en", path);
}

export default async function PaginaEn({ params }: Props) {
  const { path } = await params;
  return renderPagina("en", path);
}
