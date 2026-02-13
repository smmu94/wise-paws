import { db } from "@/db/index";
import { Dog, dogs } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { DogCard } from "@/components/shared/dogCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NearDogsGrid() {
    const t = await getTranslations("home");
    const headerList = await headers();

    const userCountry = headerList.get("x-vercel-ip-country") || "ES";
    const userCity = headerList.get("x-vercel-ip-city") || "Madrid";

    let localDogs: Dog[] = await db.query.dogs.findMany({
        where: and(
            eq(dogs.status, "available"),
            eq(dogs.countryCode, userCountry),
            eq(dogs.cityName, userCity),
        ),
        limit: 4,
    });

    if (localDogs.length < 4) {
        const additionalDogs = await db.query.dogs.findMany({
            where: and(
                eq(dogs.status, "available"),
                eq(dogs.countryCode, userCountry),
                ne(dogs.cityName, userCity),
            ),
            limit: 4 - localDogs.length,
        });
        localDogs = [...localDogs, ...additionalDogs];
    }

    if (localDogs.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-slate-500">{t("nearbyDogs.noNearbyDogs")}</p>
            </div>
        );
    }

    return (
        <section className="px-12">
            <div className="flex items-center justify-between">
                <h2 className="text-subtitle text-brown mb-6">
                    {t("nearbyDogs.title")}
                </h2>
                <Button variant="link" className="px-0">
                    <Link href="/adopt?filter=nearby">{t("nearbyDogs.cta.viewAll")}</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {localDogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog} />
                ))}
            </div>
        </section>
    );
}
