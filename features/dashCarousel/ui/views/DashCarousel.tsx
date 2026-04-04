import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Item from "../components/Item";
import { items } from "@/constants/carousel";

const DashCarousel = () => {
  return (
    <Carousel>
      <CarouselContent className="relative">
        {items.map((item) => (
          <CarouselItem key={item.id} className="roudned-4xl">
            <Item {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute z-10 right-24 bottom-12 text-gray-50">
        <CarouselPrevious className="w-11 h-11" />
        <CarouselNext className="w-11 h-11" />
      </div>
    </Carousel>
  );
};

export default DashCarousel;
