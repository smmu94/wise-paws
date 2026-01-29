"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

export const LanguageSelector = () => {
    const t = useTranslations("header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: string) => {
        if (newLocale === locale) return;
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

    return (
        <>
            <div className="flex flex-wrap gap-2 md:hidden">
                {LANGUAGES.map((lang) => {
                    const isActive = locale === lang.code;
                    return (
                        <Badge
                            key={lang.code}
                            variant={isActive ? "default" : "outline"}
                            className={cn(
                                "gap-2 px-3 py-1 cursor-pointer transition-all hover:opacity-80",
                                !isActive && "bg-background text-muted-foreground"
                            )}
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <Image 
                                src={lang.flag} 
                                alt={lang.label} 
                                width={14} 
                                height={14} 
                                className={cn("rounded-sm", !isActive && "grayscale-[0.5]")}
                            />
                            <span className="uppercase text-[10px] font-bold">
                                {lang.code}
                            </span>
                        </Badge>
                    );
                })}
            </div>

            <div className="hidden md:block">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 w-fit">
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
            </div>
        </>
    );
};