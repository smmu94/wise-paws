import { createMetadata } from "@/lib/metadata";
import {getTranslations, setRequestLocale} from "next-intl/server";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  return createMetadata({
    locale,
    namespace: "home.metadata"
  });
}
 
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  
  return <h1>{t("title")}</h1>;
}