"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Item from "../components/Item";
import { items } from "@/constants/carousel";

import SideIndicators from "../components/SideIndicators";

const DashCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="rounded-4xl">
            <Item {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute z-20 bottom-8 left-10 right-10 flex items-center justify-between gap-6">
        <SideIndicators api={api} />

        <div className="flex gap-2">
          <CarouselPrevious className="static! top-auto! left-auto! translate-none! h-11 w-11" />
          <CarouselNext className="static! top-auto! right-auto! translate-none! h-11 w-11" />
        </div>
      </div>
    </Carousel>
  );
};

export default DashCarousel;
