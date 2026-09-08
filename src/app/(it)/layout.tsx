import type { Metadata } from "next";
import type { ReactNode } from "react";
import { tema } from "@tema";
import { metadataBase } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataBase("it");
}

export default function LayoutIt({ children }: { children: ReactNode }) {
  return <tema.Documento lang="it">{children}</tema.Documento>;
}
