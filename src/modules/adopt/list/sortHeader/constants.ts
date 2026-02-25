import { SortOptions } from "@/lib/types";

export const SORT_OPTIONS = [
  { value: SortOptions.DISTANCE_ASC, label: "closest" },
  { value: SortOptions.OLDEST, label: "oldest" },
  { value: SortOptions.ENERGY_ASC, label: "calmFirst" },
  { value: SortOptions.ENERGY_DESC, label: "activeFirst" },
];