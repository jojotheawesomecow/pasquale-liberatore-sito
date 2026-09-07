import type { Metadata } from "next";
import { elencoPercorsi, metadataPagina, renderPagina } from "@/pagine/dispatch";

type Props = { params: Promise<{ path: string[] }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await elencoPercorsi("it")).map((path) => ({ path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  return metadataPagina("it", path);
}

export default async function PaginaIt({ params }: Props) {
  const { path } = await params;
  return renderPagina("it", path);
}
