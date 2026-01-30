"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { getUserMenuItems } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { LogOut, MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LanguageSelector } from "@/components/layout/header/components/languageSelector";
import { UserMenuProps } from "@/components/layout/header/components/userMenu/types";

export const MobileNav = ({
    links,
    user,
}: {
    links: Array<{ name: string; href: string }>;
    user?: UserMenuProps["user"];
}) => {
    const t = useTranslations("header");
    const userItems = getUserMenuItems();

    return (
        <div className="flex md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="focus-visible:ring-0"
                    >
                        <MenuIcon className="size-6 text-dark-gray" />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="w-75 sm:w-100 bg-white flex flex-col"
                >
                    <SheetHeader className="text-left mb-4">
                        <SheetTitle className="text-h4 text-dark-gray">
                            Menu
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col justify-between h-full overflow-y-auto p-4">
                        <nav className="flex flex-col gap-2">
                            {links.map((link, index) => (
                                <SheetClose key={index} asChild>
                                    <Link
                                        href={link.href}
                                        className="text-body-bolder text-dark-gray hover:text-salmon py-3 border-b border-light-gray/50 last:border-0"
                                    >
                                        {t(link.name)}
                                    </Link>
                                </SheetClose>
                            ))}
                            <div className="my-6 h-px bg-light-gray" />
                            <LanguageSelector />
                            <div className="my-6 h-px bg-light-gray" />
                        </nav>

                        <>
                            {user ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 bg-light-cream/50 p-3 rounded-md border border-light-gray/50">
                                        <Avatar className="h-10 w-10 border border-light-gray">
                                            <AvatarImage
                                                src={user.image}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="bg-white text-medium-gray text-small-bolder">
                                                {user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-body-bolder text-dark-gray truncate">
                                                {user.name}
                                            </span>
                                            <span className="text-small text-medium-gray font-normal truncate">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        {userItems.map((item, index) => (
                                            <SheetClose key={index} asChild>
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center gap-3 py-3 px-2 rounded-md hover:bg-light-gray/20 transition-colors group"
                                                >
                                                    <item.icon className="size-5 text-medium-gray group-hover:text-salmon transition-colors" />
                                                    <span className="text-body-bolder text-dark-gray group-hover:text-salmon transition-colors">
                                                        {t(item.name)}
                                                    </span>
                                                </Link>
                                            </SheetClose>
                                        ))}

                                        <SheetClose asChild>
                                            <button
                                                className="flex items-center gap-3 py-3 px-2 w-full text-left rounded-md hover:bg-red-50 transition-colors mt-2 group"
                                                onClick={() =>
                                                    console.log(
                                                        "Cerrando sesión...",
                                                    )
                                                }
                                            >
                                                <LogOut className="size-5 text-medium-gray group-hover:text-salmon transition-colors" />
                                                <span className="text-body font-medium text-dark-gray group-hover:text-salmon transition-colors">
                                                    {t("userMenu.logout")}
                                                </span>
                                            </button>
                                        </SheetClose>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <SheetClose asChild>
                                        <Button
                                            variant="default"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href={routes.auth}>
                                                {t("auth.signIn")}
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                </div>
                            )}
                        </>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
