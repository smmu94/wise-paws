import { db } from "@/db/index";
import { dogs } from "@/db/schema";
import { and, asc, desc, eq, gte, lte, sql, SQL } from "drizzle-orm";
import { DogFilters, GetDogsResponse, SortOptions } from "./types";

export async function getDogs(
    filters: DogFilters,
    lat?: number,
    lng?: number,
    limit: number = 9,
    offset: number = 0,
): Promise<GetDogsResponse> {
    try {
        const { age, energy, health, sort, distance } = filters;

        const distanceSql =
            lat && lng
                ? sql`POWER(${dogs.lat} - ${lat}, 2) + POWER(${dogs.lng} - ${lng}, 2)`
                : null;

        const conditions: SQL[] = [eq(dogs.status, "available")];

        if (distanceSql && distance) {
            const radiusInDegrees = Number(distance) / 111;
            conditions.push(
                sql`${distanceSql} <= POWER(${radiusInDegrees}, 2)`,
            );
        }

        if (age === "senior")
            conditions.push(and(gte(dogs.age, 7), lte(dogs.age, 10))!);
        if (age === "super-senior") conditions.push(gte(dogs.age, 11));

        if (energy) conditions.push(eq(dogs.energyLevel, energy as (typeof dogs.energyLevel.enumValues)[number]));
        if (health) conditions.push(eq(dogs.healthStatus, health as (typeof dogs.healthStatus.enumValues)[number]));

        let orderBy: SQL;
        switch (sort) {
            case SortOptions.OLDEST:
                orderBy = asc(dogs.createdAt);
                break;
            case SortOptions.ENERGY_ASC:
                orderBy = asc(dogs.energyLevel);
                break;
            case SortOptions.ENERGY_DESC:
                orderBy = desc(dogs.energyLevel);
                break;
            default:
                orderBy = distanceSql ? asc(distanceSql) : desc(dogs.createdAt);
        }


        const baseQuery = db
            .select()
            .from(dogs)
            .where(and(...conditions));

        const [countResult, dogsData] = await Promise.all([
            db
                .select({ count: sql<number>`count(*)` })
                .from(dogs)
                .where(and(...conditions)),
            baseQuery.orderBy(orderBy).limit(limit).offset(offset),
        ]);

        return {
            success: true,
            dogs: dogsData,
            total: Number(countResult[0].count),
        };
    } catch (e) {
        console.error("Database error in getDogs:", e);
        return { success: false, error: "FETCH_ERROR" };
    }
}
