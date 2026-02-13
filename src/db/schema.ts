import { InferSelectModel } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    real,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const dogStatusEnum = pgEnum("dog_status", [
    "available",
    "pending",
    "adopted",
]);
export const adoptionStatusEnum = pgEnum("adoption_status", [
    "sent",
    "reviewing",
    "approved",
    "rejected",
]);
export const energyLevelEnum = pgEnum("energy_level", [
    "very_low",
    "low",
    "moderate",
    "high",
    "very_high",
]);
export const healthStatusEnum = pgEnum("health_status", [
    "excellent",
    "good",
    "needs_medication",
    "special_needs",
    "senior_care",
]);

export const dogs = pgTable("dogs", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    story: text("story").notNull(),
    images: text("images").array().notNull().default([]),
    lat: real("lat").notNull(),
    lng: real("lng").notNull(),
    countryCode: text("country_code").notNull(),
    cityName: text("city_name").notNull(),
    energyLevel: energyLevelEnum("energy_level").notNull(),
    healthStatus: healthStatusEnum("health_status").notNull().default("good"),
    status: dogStatusEnum("status").notNull().default("available"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Dog = InferSelectModel<typeof dogs>;

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    lastLat: real("last_lat"),
    lastLng: real("last_lng"),
    searchRadius: integer("search_radius").default(50),
    preferredLang: text("preferred_lang").default("en"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adoptions = pgTable("adoptions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    dogId: integer("dog_id")
        .notNull()
        .references(() => dogs.id),
    message: text("message").notNull(),
    status: adoptionStatusEnum("status").notNull().default("sent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const favorites = pgTable("favorites", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    dogId: integer("dog_id")
        .notNull()
        .references(() => dogs.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
