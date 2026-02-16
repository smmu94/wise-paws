import { Dog } from "@/db/schema";

export enum SortOptions {
  DISTANCE_ASC = "distance_asc",
  OLDEST = "oldest",
  ENERGY_ASC = "energy_asc",
  ENERGY_DESC = "energy_desc",
}

export interface DogFilters {
  age?: "senior" | "super-senior";
  energy?: string;
  health?: string;
  sort?: SortOptions;
  distance?: string;
  page?: string;
}

export type GetDogsResponse = 
  | { success: true; dogs: Dog[]; total: number }
  | { success: false; error: string };