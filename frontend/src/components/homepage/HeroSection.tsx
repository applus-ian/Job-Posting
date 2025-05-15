"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function HeroSection() {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  // ✅ Auto-scroll effect
  useEffect(() => {
    if (!embla) return;

    const interval = setInterval(() => {
      if (!embla) return;
      const nextIndex = (embla.selectedScrollSnap() + 1) % embla.scrollSnapList().length;
      embla.scrollTo(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [embla]);

  return (
    <section className="w-full min-h-70 py-20 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Title, Description, Search */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-medium text-gray-800 dark:text-white mb-6">
            Find a job that suits your interest & skills.
          </h1>
          <p className="text-gray-600 dark:text-white text-lg mb-10">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo,
            eget sollicitudin velit vestibulum.
          </p>

          <div className="relative rounded-md shadow-sm">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search size={20} color="#FF7517" />
            </div>
            <Input
              type="text"
              placeholder="Search for jobs..."
              className="w-full pl-10 pr-28 h-16"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button>Find Job</Button>
            </div>
          </div>

          <div className="flex mt-4 gap-1">
            <p className="text-xs text-gray-500">Suggestion:</p>
            <p className="text-xs text-gray-600">3d modeling, Programming, Finance</p>
          </div>
        </div>

        {/* ✅ Right: Carousel with auto-scroll */}
        <div className="md:w-1/2 w-full">
          <Carousel
            opts={{ loop: true }}
            setApi={(api) => setEmbla(api || null)}
            className="w-full"
          >
            <CarouselContent>
              {["/images/job-1.jpg", "/images/job-2.jpg", "/images/job-3.jpg"].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="p-0">
                      <CardContent className="p-0 overflow-hidden rounded-xl aspect-video cursor-grab active:cursor-grabbing">
                        <img
                          src={src}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
