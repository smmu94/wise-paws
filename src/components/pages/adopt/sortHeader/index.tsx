"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "./constants";

export function SortHeader() {
    const t = useTranslations("adopt.header");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div className="space-y-1">
                <h1 className="text-subtitle text-brown font-bold tracking-tight">
                    {t("title")}
                </h1>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-sm border border-light-gray/30 shadow-sm">
                <span className="text-small-bolder text-salmon capitalize">
                    {t("sortBy.title")}:
                </span>
                <Select
                    defaultValue="distance_asc"
                    value={searchParams.get("sort") || undefined}
                    onValueChange={handleSortChange}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={t(`sortBy.options.closest`)}
                        />
                    </SelectTrigger>
                    <SelectContent align="end">
                        {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {t(`sortBy.options.${option.label}`)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
