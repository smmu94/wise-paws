import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type MetadataProps = {
    locale: string;
    namespace: string;
    values?: Record<string, string | number>;
};

const SITE_NAME = "Wise Paws";

export async function createMetadata({
    locale,
    namespace,
    values,
}: MetadataProps): Promise<Metadata> {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace });
    const title = t("title", values);
    return {
        title: {
            default: title,
            template: `%s | ${SITE_NAME}`,
        },
        description: t("description", values),
    };
}
