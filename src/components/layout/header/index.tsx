import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "./components/languageSelector";
import { MobileNav } from "./components/mobileNav";
import { UserMenu } from "./components/userMenu";

export const Header = async () => {
    const t = await getTranslations("header");

    // Later with Next Auth
    const user = {
        name: "Stephanie Morales",
        email: "stephanie@wisepaws.com",
        image: "",
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-light-gray flex justify-between items-center p-4">
            <div className="flex gap-4 items-center">
                <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                <p className="text-subtitle text-dark-gray hidden sm:block">Wise Paws</p>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="text-small-bolder text-dark-gray hover:text-salmon transition-colors"
                    >
                        {t(link.name)}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
                <LanguageSelector />
                {user ? (
                    <UserMenu user={user} />
                ) : (
                    <Button variant="default" size="sm" asChild>
                        <Link href={routes.auth}>
                            <span>{t("auth.signIn")}</span>
                        </Link>
                    </Button>
                )}
            </div>

            <MobileNav links={NAV_LINKS} user={user} />
        </header>
    );
};