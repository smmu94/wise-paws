import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
    console.log("🌱 Starting database seed...");

    await db.delete(schema.dogs);
    console.log("🗑️  Previous data deleted");

    await db.insert(schema.dogs).values([
        {
            name: "Luna",
            age: 10,
            story: "Luna is a loving golden retriever who spent her entire life as a therapy dog in a hospital. Now she seeks a quiet home to spend her golden years. She loves sleeping in the sun and receiving cuddles.",
            images: [
                "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
                "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
            ],
            lat: 43.3623,
            lng: -8.4115,
            countryCode: "ES",
            cityName: "A Coruña",
            energyLevel: "low",
            healthStatus: "good",
            status: "available",
        },
        {
            name: "Max",
            age: 12,
            story: "Max is a very wise black Labrador. He was rescued from a shelter and is now looking for a family to give him the love he always deserved. He needs short walks and a house with a garden.",
            images: [
                "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
            ],
            lat: 42.8805,
            lng: -8.5457,
            countryCode: "ES",
            cityName: "Santiago de Compostela",
            energyLevel: "moderate",
            healthStatus: "needs_medication",
            status: "available",
        },
        {
            name: "Bella",
            age: 9,
            story: "Bella is a sweet and calm beagle. Her owner passed away and she is now looking for a new home. She is perfect for seniors or families with responsible children. She loves to cuddle on the couch.",
            images: [
                "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800",
            ],
            lat: 40.4168,
            lng: -3.7038,
            countryCode: "ES",
            cityName: "Madrid",
            energyLevel: "low",
            healthStatus: "excellent",
            status: "available",
        },
        {
            name: "Rocky",
            age: 11,
            story: "Rocky is a loyal and protective German Shepherd. He spent 8 years as a police dog and is now retired. He is looking for a home without other dogs where he can be the king of the house.",
            images: [
                "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800",
            ],
            lat: 41.3851,
            lng: 2.1734,
            countryCode: "ES",
            cityName: "Barcelona",
            energyLevel: "moderate",
            healthStatus: "good",
            status: "available",
        },
        {
            name: "Canela",
            age: 13,
            story: "Canela is a noble-natured Cocker Spaniel. She was found abandoned in a park. Despite her age, she still enjoys quiet walks and playing with stuffed toys.",
            images: [
                "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
            ],
            lat: 39.4699,
            lng: -0.3763,
            countryCode: "ES",
            cityName: "Valencia",
            energyLevel: "very_low",
            healthStatus: "senior_care",
            status: "available",
        },
        {
            name: "Bruno",
            age: 10,
            story: "Bruno is an adorable and playful French Bulldog. His family had to move abroad and couldn't take him. He is perfect for apartments and loves children.",
            images: [
                "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800",
            ],
            lat: 43.263,
            lng: -2.935,
            countryCode: "ES",
            cityName: "Bilbao",
            energyLevel: "low",
            healthStatus: "good",
            status: "available",
        },
        {
            name: "Nala",
            age: 8,
            story: "Nala is a beautiful and elegant Siberian Husky. She was rescued from an illegal breeding facility. She loves the cold and needs an active family to take her hiking.",
            images: [
                "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800",
            ],
            lat: 43.3623,
            lng: -8.4115,
            countryCode: "ES",
            cityName: "A Coruña",
            energyLevel: "high",
            healthStatus: "excellent",
            status: "available",
        },
        {
            name: "Toby",
            age: 14,
            story: "Toby is a tiny and affectionate Yorkshire Terrier. He is the sweetest senior dog you'll ever meet. He's just looking for a warm lap and lots of love in his final years.",
            images: [
                "https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=800",
            ],
            lat: 37.3891,
            lng: -5.9845,
            countryCode: "ES",
            cityName: "Sevilla",
            energyLevel: "very_low",
            healthStatus: "needs_medication",
            status: "available",
        },
        {
            name: "Coco",
            age: 9,
            story: "Coco is a smart and active Miniature Schnauzer. His owner entered a nursing home and can't take care of him. He loves learning tricks and playing with interactive toys.",
            images: [
                "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800",
            ],
            lat: 42.8805,
            lng: -8.5457,
            countryCode: "ES",
            cityName: "Santiago de Compostela",
            energyLevel: "moderate",
            healthStatus: "good",
            status: "available",
        },
        {
            name: "Manchas",
            age: 11,
            story: "Manchas is an elegant Dalmatian with a sad story. He was abandoned after vacation. Despite everything, he remains cheerful and loves to run (though not as much as before).",
            images: [
                "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
            ],
            lat: 39.8628,
            lng: -4.0273,
            countryCode: "ES",
            cityName: "Toledo",
            energyLevel: "moderate",
            healthStatus: "good",
            status: "pending",
        },
    ]);

    console.log("✅ 10 dogs inserted successfully");
    console.log("🎉 Seed completed!");

    process.exit(0);
}

main().catch((error) => {
    console.error("❌ Error during seed:", error);
    process.exit(1);
});
