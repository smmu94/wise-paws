import { Dog } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmptyView() {
  const t = useTranslations("adopt.dogList.empty");
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-light-gray/10 rounded-3xl border-2 border-dashed border-light-gray/30 text-center">
      <div className="bg-salmon p-4 rounded-full shadow-sm mb-4">
        <Dog className="h-12 w-12 text-light-cream" />
      </div>
      <h3 className="text-body-bolder text-brown">{t("title")}</h3>
      <p className="text-small text-medium-gray max-w-xs mx-auto mt-2">
        {t("description")}
      </p>
    </div>
  );
}