"use client";

import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationRoot,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [
                1,
                "ellipsis-start",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "ellipsis-start",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "ellipsis-end",
            totalPages,
        ];
    };

    return (
        <PaginationRoot className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(Math.max(1, currentPage - 1))}
                        className={
                            currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    />
                </PaginationItem>

                {getPageNumbers().map((page, i) => (
                    <PaginationItem key={i}>
                        {typeof page === "string" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href={createPageURL(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href={createPageURL(
                            Math.min(totalPages, currentPage + 1),
                        )}
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationRoot>
    );
}
