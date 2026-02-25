import { Button } from "@/components/ui/button";
import { Dog } from "@/db/schema";
import { useTranslations } from "next-intl";

type AdoptionCardProps = Pick<Dog, "status" | "adoptionFee">;
export function AdoptionCard({ status, adoptionFee = 150 }: AdoptionCardProps) {
    const tAdoption = useTranslations("adopt.dogDetails.adoption");
    const tEnums = useTranslations("dogEnums.status");
    return (
        <div className="bg-white p-6 rounded-3xl border border-light-gray/20 shadow-md space-y-6">
            <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-salmon tracking-widest">
                    {tEnums(status)}
                </span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-brown">
                        ${adoptionFee}
                    </span>
                    <span className="text-sm text-medium-gray font-medium">
                        {tAdoption("feeLabel")}
                    </span>
                </div>
            </div>
            <div className="space-y-3">
                <Button className="w-full">{tAdoption("cta")}</Button>
                <Button className="w-full" variant="outline">{tAdoption("ask")}</Button>
            </div>
        </div>
    );
}
