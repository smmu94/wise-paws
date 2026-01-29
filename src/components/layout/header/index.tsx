import { NAV_LINKS } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "./components/languageSelector";
import { UserMenu } from "./components/userMenu";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const Header = async () => {
    const t = await getTranslations("header");
    const user = {
        name: "Stephanie Morales",
        email: "stephanie@wisepaws.com",
        image: "",
    };
    return (
        <header className="bg-white shadow flex justify-between items-center p-4">
            <div className="flex gap-4 items-center">
                <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                <p className="text-subtitle text-dark-gray">Wise Paws</p>
            </div>
            <nav className="flex items-center gap-8">
                {NAV_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="text-small-bolder text-dark-gray hover:text-salmon"
                    >
                        {t(link.name)}
                    </Link>
                ))}
            </nav>
            <div className="flex gap-4 items-center">
                <LanguageSelector />
                {user ? (
                    <UserMenu user={user} />
                ) : (
                    <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="hidden sm:flex"
                    >
                        <Link
                            href={routes.auth}
                            className="flex items-center gap-2"
                        >
                            <span>{t("auth.signIn")}</span>
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
};
