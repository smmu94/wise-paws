import {
    Breadcrumb as BreadcrumbBase,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
    link: {
        href: string;
        label: string;
    },
    page: string;
}

export function Breadcrumb({link, page}: BreadcrumbProps) {
    return (
        <BreadcrumbBase>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </BreadcrumbBase>
    );
}
