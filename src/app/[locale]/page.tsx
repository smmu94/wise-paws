import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("home");

    return (
        <section className="relative h-[92vh] w-full overflow-hidden">
            <video
                className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                autoPlay
                muted
                loop
                playsInline
                poster="https://res.cloudinary.com/dhcvj3jms/image/upload/v1770899115/senior_dog_2_fly1gk.png"
                preload="metadata"
            >
                <source
                    src="https://res.cloudinary.com/dhcvj3jms/video/upload/v1770894617/senior_dog_2_agxrmc.mp4"
                    type="video/mp4"
                />
                {t("hero.videoFallback")}
            </video>
            <div className="relative z-10 flex h-full w-full flex-col gap-4 items-center justify-center bg-black/40 px-4 text-center">
                <h1 className="text-title md:text-6xl text-light-cream max-w-3xl">
                    {t.rich("hero.title", {
                        important: (chunks) => (
                            <span className="text-salmon block md:inline">
                                {chunks}
                            </span>
                        ),
                    })}
                </h1>
                <h2 className="text-body text-light-cream max-w-3xl">
                    {t("hero.subtitle")}
                </h2>
                <div className="flex gap-4">
                    <Button className="mt-4">
                        <Link href={routes.adopt.list}>
                            {t("hero.cta.adopt")}
                        </Link>
                    </Button>
                    <Button variant="dark" className="mt-4">
                        <Link href={routes.about}>
                            {t("hero.cta.learnMore")}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
