import { useTranslations } from "next-intl";

interface DogStoryProps {
    name: string;
    story: string;
}

export function DogStory({ name, story }: DogStoryProps) {
    const t = useTranslations("adopt.dogDetails");
    return (
        <section className="bg-white p-8 rounded-3xl border border-light-gray/20 shadow-sm space-y-4">
            <h3 className="text-2xl font-bold text-brown">
                {t("story", { name })}
            </h3>
            <p className="text-medium-gray leading-relaxed text-body">
                {story}
            </p>
        </section>
    );
}
