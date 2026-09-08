import type { Metadata } from "next";
import type { ReactNode } from "react";
import { tema } from "@tema";
import { metadataBase } from "@/pagine/dispatch";

export async function generateMetadata(): Promise<Metadata> {
  return metadataBase("en");
}

export default function LayoutEn({ children }: { children: ReactNode }) {
  return <tema.Documento lang="en">{children}</tema.Documento>;
}
