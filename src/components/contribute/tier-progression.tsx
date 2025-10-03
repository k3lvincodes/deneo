
"use client";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import React from "react";

const tiers = [
    { name: "Tier A", active: true },
    { name: "Tier B", active: false },
    { name: "Tier C", active: false },
    { name: "Tier D", active: false },
]

export function TierProgression() {
  return (
    <div className="p-2 sm:p-4 bg-secondary rounded-lg">
        <Carousel
        opts={{
            align: "start",
        }}
        className="w-full"
        >
        <CarouselContent>
            {tiers.map((tier, index) => (
            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3">
                <div className="p-1">
                    <div className={cn(
                        "flex-1 text-center p-4 rounded-md transition-all duration-300 h-full flex flex-col justify-center",
                        tier.active ? "bg-accent text-accent-foreground" : "bg-muted/50 text-muted-foreground"
                    )}>
                        <p className="font-bold text-lg">{tier.name}</p>
                        <p className="text-xs">{tier.active ? "Unlocked" : "Locked"}</p>
                    </div>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
    </div>
  );
}
