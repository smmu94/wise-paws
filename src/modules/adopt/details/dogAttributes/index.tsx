import { Dog } from "@/db/schema";
import { useTranslations } from "next-intl";
import { AttributeCard } from "./components/attributeCard";
import { DOG_ATTRIBUTES_MAP } from "./constants";

interface DogAttributesProps {
    dog: Pick<
        Dog,
        "energyLevel" | "healthStatus" | "vaccinationStatus" | "temperament"
    >;
}

export function DogAttributes({ dog }: DogAttributesProps) {
    const tEnums = useTranslations("dogEnums");
    const tLabels = useTranslations("adopt.dogDetails.attributes");

    if (!dog) return null;

    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">{tLabels("title")}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DOG_ATTRIBUTES_MAP.map((item) => {
                    const Icon = item.icon;
                    const rawValue = dog[item.enumSection as keyof typeof dog];

                    if (!rawValue) return null;

                    return (
                        <AttributeCard
                            key={item.key}
                            icon={<Icon className="text-salmon" size={20} />}
                            label={tLabels(item.labelKey)}
                            value={tEnums(`${item.enumSection}.${rawValue}`)}
                        />
                    );
                })}
            </div>
        </section>
    );
}
