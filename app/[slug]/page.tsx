import { notFound } from "next/navigation";
import { DetailPage } from "@/components/DetailPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["fleet", "oem", "architecture", "industries", "charging", "about", "contact"].map(slug => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!["fleet", "oem", "architecture", "industries", "charging", "about", "contact"].includes(slug)) notFound();
  return <DetailPage slug={slug}/>;
}
