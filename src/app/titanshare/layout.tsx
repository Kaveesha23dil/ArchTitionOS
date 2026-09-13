import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import { createPageMetadata, pageSeo } from "@/lib/site";
import { pageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata(pageSeo.titanShare);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><StructuredData data={pageSchema(pageSeo.titanShare)} />{children}</>;
}
