import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Documento } from "@/componenti/Documento";
import { metadataBase } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataBase("it");
}

export default function LayoutIt({ children }: { children: ReactNode }) {
  return <Documento lang="it">{children}</Documento>;
}
