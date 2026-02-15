import { FiltersSidebar } from "@/components/pages/adopt/filtersSidebar";

type SearchParamsProps = {
    [key: string]: string | string[] | undefined;
}

export default async function AdoptPage({
    searchParams,
}: {
    searchParams: Promise<SearchParamsProps>;
}) {
    const filters = await searchParams;
    console.log(filters);
    return (
        <main className="container mx-auto px-4 py-8">
           <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4">
                <div className="sticky top-24">
                    <FiltersSidebar />
                </div>
            </aside>
            <section className="flex-1">
                <p>Sort Header</p>
                <p>Dogs List</p>
            </section>
           </div>
        </main>
    );
}
