import { NAV_LINKS } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { RESOURCE_LINKS } from "./constants";

export const Footer = () => {
    const t = useTranslations();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brown border-t border-light-gray text-light-gray pt-12 flex flex-col gap-8 text-small">
            <div className="mx-auto px-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <p className="text-2xl font-bold text-light-cream hidden sm:block">
                            Wise Paws
                        </p>
                    </div>
                    <p className="mt-2">
                        {t("footer.description")}{" "}
                        <span className="text-salmon"> Wise Paws</span> heroes
                    </p>
                    <div className="flex gap-4 items-center">
                        <a
                            href="#"
                            className="rounded-full p-2 bg-salmon hover:opacity-80 transition-opacity"
                        >
                            <FaInstagram className="text-brown" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full p-2 bg-salmon hover:opacity-80 transition-opacity"
                        >
                            <FaFacebookF className="text-brown" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-light-cream font-bold uppercase tracking-wider">
                        {t("footer.explore")}
                    </h3>
                    <ul className="flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="hover:text-salmon transition-colors"
                                >
                                    {t(`header.${link.name}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-light-cream font-bold uppercase tracking-wider">
                        {t("footer.contact")}
                    </h3>
                    <div className="flex flex-col gap-2">
                        <p>
                            <FaLocationDot className="inline mr-2 text-salmon" />{" "}
                            {t("footer.location")}
                        </p>
                        <p>
                            <IoIosMail className="inline mr-2 text-salmon" />{" "}
                            contact@wisepaws.com
                        </p>
                        <p>
                            <FaPhone className="inline mr-2 text-salmon" /> +1
                            (555) 123-4567
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-light-cream font-bold uppercase tracking-wider">
                        {t("footer.resources.title")}
                    </h3>
                    <ul>
                        {RESOURCE_LINKS.map((link) => (
                            <li key={link.href} className="py-1">
                                <Link
                                    href={link.href}
                                    className="hover:text-salmon transition-colors"
                                >
                                    {t(`footer.resources.links.${link.name}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center p-8 text-xs border-t border-light-cream/20 mt-8">
                <p>
                    © {currentYear} Wise Paws. {t("footer.rights")}.
                </p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-salmon">
                        {t("footer.legal.privacy")}
                    </Link>
                    <Link href="/terms" className="hover:text-salmon">
                        {t("footer.legal.terms")}
                    </Link>
                    <Link href="/cookies" className="hover:text-salmon">
                        {t("footer.legal.cookies")}
                    </Link>
                </div>
            </div>
        </footer>
    );
};
