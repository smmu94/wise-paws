import NearDogsGrid from "@/components/pages/home/nearDogs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

interface Step {
    title: string;
    description: string;
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("home");

    return (
        <div className="flex flex-col gap-16">
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
            <NearDogsGrid />
            <section className="bg-medium-gray/20 py-16 px-4 text-center">
                <h2 className="text-subtitle md:text-4xl text-brown mb-4">
                    {t.rich("wisebot.title", {
                        important: (chunks) => (
                            <span className="text-salmon block md:inline">
                                {chunks}
                            </span>
                        ),
                    })}
                </h2>
                <p className="text-body text-medium-gray max-w-2xl mx-auto">
                    {t("wisebot.description")}
                </p>
                <Image
                    src={
                        locale === "es"
                            ? "https://res.cloudinary.com/dhcvj3jms/image/upload/v1770989070/wise-paws-assistant-sp_qylfqy.png"
                            : "https://res.cloudinary.com/dhcvj3jms/image/upload/v1770986955/wise-paws-assistant_wweddr.png"
                    }
                    alt="Wisebot Assistant"
                    width={500}
                    height={500}
                    className="mx-auto mt-8"
                />
            </section>
            <section className="py-16 px-12 flex flex-col gap-12">
                <h2 className="text-subtitle text-brown text-center">
                    {t("howItWorks.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {(t.raw("howItWorks.steps") as Step[]).map(
                        (step, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <span className="text-salmon font-bold text-3xl leading-none">
                                    {index + 1}
                                </span>
                                <div className="space-y-2">
                                    <h3 className="text-body text-brown font-bold leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-body text-medium-gray text-sm md:text-base">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </section>
        </div>
    );
}
