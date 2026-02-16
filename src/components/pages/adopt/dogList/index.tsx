import { DogCard } from "@/components/shared/dogCard";
import { getDogs } from "@/lib/data";
import { DogFilters } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { EmptyView } from "./emptyView";
import { ErrorView } from "./errorView";
import { Pagination } from "@/components/shared/pagination";

interface DogsListProps {
  filters: DogFilters;
  userLat?: number;
  userLng?: number;
}

const ITEMS_PER_PAGE = 9;

export async function DogsList({ filters, userLat, userLng }: DogsListProps) {
  const currentPage = Number(filters.page) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const result = await getDogs(filters, userLat, userLng, ITEMS_PER_PAGE, offset);
  const t = await getTranslations("adopt.header");

  if (!result.success) {
    return (
      <div className="space-y-6">
        <ErrorView />
      </div>
    );
  }

  const { dogs, total } = result;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (dogs.length === 0) {
    return (
      <div className="space-y-6">
        <p className="text-small text-medium-gray">
          <span className="text-small-bolder text-salmon">0</span> wise paws{" "}
          {t("subtitle")}
        </p>
        <EmptyView />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-small text-medium-gray">
        <span className="text-small-bolder text-salmon">{total}</span> wise paws{" "}
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}