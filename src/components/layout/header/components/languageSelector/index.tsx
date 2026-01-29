"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LANGUAGES } from "./constants";

export const LanguageSelector = () => {
    const t = useTranslations("header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const currentLanguage =
        LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

    const handleLanguageChange = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Image
                        src={currentLanguage.flag}
                        alt={currentLanguage.label}
                        width={20}
                        height={20}
                    />
                    <span className="uppercase text-small-bolder">
                        {currentLanguage.code}
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-white">
                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="gap-3 cursor-pointer"
                    >
                        <Image
                            src={lang.flag}
                            alt={lang.label}
                            width={20}
                            height={20}
                        />
                        <span className="text-small">{t(lang.label)}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
