"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    AGE_RANGES,
    ENERGY_LEVEL_OPTIONS,
    HEALTH_STATUS_OPTIONS,
} from "@/components/pages/adopt/filtersSidebar/constants";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FiltersSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations("adopt.filters");

    const updateFilters = (key: string, value: string | number | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value.toString());
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const clearFilters = () => {
        router.push(pathname);
    };

    return (
        <Card className="p-6 border-none shadow-sm bg-light-gray/20 w-3xs">
            <div className="flex items-center gap-2 border-b pb-4">
                <SlidersHorizontal className="h-5 w-5 text-salmon" />
                <h2 className="text-body-bolder text-brown">{t("title")}</h2>
            </div>
            <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                    <Label className="text-brown text-body">
                        {t("distance")}
                    </Label>
                    <span className="text-salmon text-body-bolder">
                        {searchParams.get("distance") || "50"} km
                    </span>
                </div>
                <Slider
                    defaultValue={[Number(searchParams.get("distance")) || 50]}
                    max={500}
                    step={10}
                    onValueCommit={(val) => updateFilters("distance", val[0])}
                    className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 km</span>
                    <span>500 km</span>
                </div>
            </div>
            <div className="space-y-4 pt-4">
                <Label className="text-brown font-semibold">
                    {t("ageGroup.title")}
                </Label>
                <div className="space-y-3">
                    {AGE_RANGES.map((age) => (
                        <div
                            key={age.id}
                            className={`flex items-start space-x-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                                searchParams.get("age") === age.id
                                    ? "border-salmon bg-salmon/5"
                                    : "border-light-gray"
                            }`}
                            onClick={() => updateFilters("age", age.id)}
                        >
                            <Checkbox
                                id={age.id}
                                checked={searchParams.get("age") === age.id}
                                onCheckedChange={() =>
                                    updateFilters("age", age.id)
                                }
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={age.id}
                                    className="text-small text-brown cursor-pointer"
                                >
                                    {age.label}
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    {age.description} {t("ageGroup.years")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-4 pt-4">
                <Label className="text-brown font-semibold">
                    {t("energyLevel.title")}
                </Label>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={searchParams.get("energy") || ""}
                    onValueChange={(val) => updateFilters("energy", val)}
                    className="flex-wrap justify-start"
                >
                    {ENERGY_LEVEL_OPTIONS.map((level) => (
                        <ToggleGroupItem
                            key={level.value}
                            value={level.value}
                            className="rounded-full px-4 data-[state=on]:bg-salmon data-[state=on]:text-white"
                        >
                            {t(`${level.label}`)}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
            <div className="space-y-4 pt-4">
                <Label className="text-brown font-semibold">
                    {t("healthStatus.title")}
                </Label>
                <div className="space-y-3">
                    {HEALTH_STATUS_OPTIONS.map((status) => (
                        <div
                            key={status.value}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={status.value}
                                checked={
                                    searchParams.get("health") === status.value
                                }
                                onCheckedChange={(checked) =>
                                    updateFilters(
                                        "health",
                                        checked ? status.value : null,
                                    )
                                }
                            />
                            <label
                                htmlFor={status.value}
                                className="text-sm text-medium-gray cursor-pointer"
                            >
                                {t(`${status.label}`)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4 pt-6">
                <Button className="bg-salmon hover:bg-salmon/90">
                    {t("cta.apply")}
                </Button>
                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-light-gray text-brown"
                >
                    {t("cta.clear")}
                </Button>
            </div>
        </Card>
    );
}
