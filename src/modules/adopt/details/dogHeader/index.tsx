import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dog } from "@/db/schema";
import { Heart, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export type DogHeaderProps = Pick<
    Dog,
    "name" | "breed" | "age" | "cityName" | "shelterName"
>;

export function DogHeader({
    name,
    breed,
    age,
    cityName,
    shelterName,
}: DogHeaderProps) {
    const t = useTranslations("adopt.dogDetails.header");
    return (
        <div className="flex justify-between items-start bg-white p-6 rounded-3xl border border-light-gray/20 shadow-sm">
            <div className="space-y-2">
                <h1 className="text-subtitle font-bold text-brown">{name}</h1>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{breed}</Badge>
                    <Badge variant="secondary">
                        {age} {t("age")}
                    </Badge>
                    <Badge variant="secondary">{cityName}</Badge>
                    <Badge variant="secondary">
                        <MapPin />
                        {shelterName}
                    </Badge>
                </div>
            </div>
            <Button
                variant="outline"
                className="hover:bg-salmon/20 transition-colors cursor-pointer"
            >
                <Heart size={18} className="text-salmon" />
                {t("favorite")}
            </Button>
        </div>
    );
}
