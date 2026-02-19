import { DogsList } from "@/components/pages/adopt/dogList";
import { SortHeader } from "@/components/pages/adopt/sortHeader";
import { LoadingView } from "@/components/pages/adopt/dogList/loadingView";
import { FiltersSidebar } from "@/components/pages/adopt/filtersSidebar";
import { DogFilters } from "@/lib/types";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function AdoptPage({
    searchParams,
}: {
    searchParams: Promise<DogFilters>;
}) {
    const filters = await searchParams;
    const headerList = await headers();

    const userLat = headerList.get("x-vercel-ip-latitude")
        ? parseFloat(headerList.get("x-vercel-ip-latitude")!)
        : undefined;
    const userLng = headerList.get("x-vercel-ip-longitude")
        ? parseFloat(headerList.get("x-vercel-ip-longitude")!)
        : undefined;
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="lg:w-1/4">
                    <div className="sticky top-24">
                        <FiltersSidebar />
                    </div>
                </aside>
                <section className="flex-1">
                    <SortHeader />
                    <Suspense fallback={<LoadingView />}>
                        <DogsList
                            filters={filters}
                            userLat={userLat}
                            userLng={userLng}
                        />
                    </Suspense>
                </section>
            </div>
        </main>
    );
}
