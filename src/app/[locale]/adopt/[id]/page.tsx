import { Breadcrumb } from "@/components/shared/breadCrumb";
import { db } from "@/db/index";
import { dogs } from "@/db/schema";
import { routes } from "@/lib/routes";
import { AdoptionCard } from "@/modules/adopt/details/adoptionCard";
import { DogAttributes } from "@/modules/adopt/details/dogAttributes";
import { DogGallery } from "@/modules/adopt/details/dogGallery";
import { DogHeader } from "@/modules/adopt/details/dogHeader";
import { DogStory } from "@/modules/adopt/details/dogStory";
import { ShelterInfo } from "@/modules/adopt/details/shelterInfo";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function AdoptDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const t = await getTranslations("adopt.dogDetails");

    const dog = await db.query.dogs.findFirst({
        where: eq(dogs.id, parseInt(id)),
    });

    if (!dog) notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb
                link={{
                    href: routes.adopt.list,
                    label: t("breadcrumb.link"),
                }}
                page={t("breadcrumb.page")}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                <div className="lg:col-span-8 space-y-10">
                    <DogGallery images={dog.images} name={dog.name} />
                    <DogHeader
                        name={dog.name}
                        breed={dog.breed}
                        age={dog.age}
                        cityName={dog.cityName}
                        shelterName={dog.shelterName}
                    />
                    <DogAttributes dog={dog} />
                    <DogStory name={dog.name} story={dog.story} />
                </div>
                <aside className="lg:col-span-4 space-y-6">
                    <AdoptionCard adoptionFee={dog.adoptionFee} status={dog.status} />
                    <ShelterInfo
                        shelterName={dog.shelterName}
                        shelterLat={dog.shelterLat}
                        shelterLng={dog.shelterLng}
                    />
                </aside>
            </div>
        </div>
    );
}
