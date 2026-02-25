import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dog } from "@/db/schema";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { ExternalLink, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function DogCard({ dog }: { dog: Dog }) {
    const t = await getTranslations("adopt");
    const tCommon = await getTranslations("common");
    const tEnums = await getTranslations("dogEnums");

    return (
        <Link
            href={`${routes.adopt.detail(`${dog.id}`)}`}
            className="group block"
        >
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-brown min-w-3xs">
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={dog.images[0]}
                        alt={dog.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                    <div className="absolute top-3 right-3">
                        <Badge variant="default">
                            {dog.age} {tCommon("age")}
                        </Badge>
                    </div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <Badge className="bg-salmon text-white border-none shadow-lg px-4">
                            {t("dogCard.viewProfile")}{" "}
                            <ExternalLink className="ml-2 h-3 w-3" />
                        </Badge>
                    </div>
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl group-hover:text-salmon transition-colors">
                        {dog.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {dog.cityName}, {dog.countryCode}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="line-clamp-2 text-small text-dark-gray">
                        {dog.story}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-xs font-medium text-slate-500">
                    <span className="capitalize">
                        {t("filters.energyLevel")}:{" "}
                        <b className="text-dark-gray">
                            {tEnums(`energyLevel.${dog.energyLevel}`)}
                        </b>
                    </span>
                    <Badge
                        variant={
                            dog.status === "available" ? "default" : "outline"
                        }
                        className="text-xs uppercase"
                    >
                        {tEnums(`status.${dog.status}`)}
                    </Badge>
                </CardFooter>
            </Card>
        </Link>
    );
}
