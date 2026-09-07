import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Documento } from "@/componenti/Documento";
import { metadataBase } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataBase("en");
}

export default function LayoutEn({ children }: { children: ReactNode }) {
  return <Documento lang="en">{children}</Documento>;
}
