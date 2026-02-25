"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export function DogGallery({
    images,
    name,
}: {
    images: string[];
    name: string;
}) {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-lg">
                <Image
                    src={mainImage}
                    alt={name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                    <Button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        variant="outline"
                        className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl transition-all p-0
                            ${mainImage === img ? "border-salmon shadow-md" : "border-transparent opacity-70"}`}
                    >
                        <Image
                            src={img}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                            alt={""}
                        />
                    </Button>
                ))}
            </div>
        </div>
    );
}
