import { Dog } from "@/db/schema";
import { Building2 as ShelterIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type ShelterInfoProps = Pick<Dog, "shelterName" | "shelterLat" | "shelterLng">;

export function ShelterInfo({
    shelterName,
    shelterLat,
    shelterLng,
}: ShelterInfoProps) {
    const t = useTranslations("adopt.dogDetails.shelter");

    const mapUrl = `https://maps.google.com/maps?q=${shelterLat},${shelterLng}&z=15&output=embed`;

    return (
        <div className="bg-white p-6 rounded-3xl border border-light-gray/20 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-salmon/10 rounded-xl flex items-center justify-center shrink-0">
                    <ShelterIcon className="text-salmon" size={24} />
                </div>
                <div className="space-y-0.5">
                    <h4 className="font-bold text-brown truncate max-w-50">
                        {shelterName}
                    </h4>
                    <p className="text-xs text-medium-gray">{t("response")}</p>
                </div>
            </div>
            <div className="relative h-40 w-full bg-light-gray/10 rounded-2xl overflow-hidden border border-light-gray/30 group">
                <iframe
                    title={`Map of ${shelterName}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={mapUrl}
                    loading="lazy"
                    allowFullScreen
                    className="grayscale-20 contrast-90 group-hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <p className="text-[11px] text-center text-medium-gray italic font-medium">
                {t("certified")}
            </p>
        </div>
    );
}
