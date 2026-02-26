import { InferSelectModel } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    real,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

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

export const vaccinationStatusEnum = pgEnum("vaccination_status", [
    "up_to_date",
    "pending",
    "unknown",
]);

export const temperamentEnum = pgEnum("temperament", [
    "sweet_calm",
    "playful_active",
    "loyal_protective",
    "gentle_shy",
    "independent",
]);

export const dogs = pgTable("dogs", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    breed: text("breed").notNull().default("Mixed Breed"),
    age: integer("age").notNull(),
    story: text("story").notNull(),
    images: text("images").array().notNull().default([]),
    lat: real("lat").notNull(),
    lng: real("lng").notNull(),
    countryCode: text("country_code").notNull(),
    cityName: text("city_name").notNull(),
    shelterName: text("shelter_name").notNull().default("Wise Paws Sanctuary"),
    shelterLat: real("shelter_lat").notNull().default(0),
    shelterLng: real("shelter_lng").notNull().default(0), 
    adoptionFee: integer("adoption_fee").notNull().default(0),
    energyLevel: energyLevelEnum("energy_level").notNull(),
    temperament: temperamentEnum("temperament").notNull().default("sweet_calm"),
    healthStatus: healthStatusEnum("health_status").notNull().default("good"),
    vaccinationStatus: vaccinationStatusEnum("vaccination_status")
        .notNull()
        .default("up_to_date"),
    status: dogStatusEnum("status").notNull().default("available"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Dog = InferSelectModel<typeof dogs>;

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  lastLat: real("last_lat"),
  lastLng: real("last_lng"),
  searchRadius: integer("search_radius").default(50),
  preferredLang: text("preferred_lang").default("es"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

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
