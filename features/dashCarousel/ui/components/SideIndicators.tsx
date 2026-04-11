import { CarouselApi } from "@/components/ui/carousel";
import { items } from "@/constants/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function useCarouselIndex(api: CarouselApi | undefined) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setIndex(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return index;
}

const SideIndicators = ({ api }: { api: CarouselApi }) => {
  const selected = useCarouselIndex(api);

  return (
    <div
      className="mx-auto flex gap-2"
      role="tablist"
      aria-label="Carousel slides"
    >
      {items.map((item, i) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={i === selected}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => api?.scrollTo(i)}
          className={cn(
            "h-1.5 w-10 shrink-0 rounded-full transition-colors",
            i === selected ? "bg-white" : "bg-white/35 hover:bg-white/50",
          )}
        />
      ))}
    </div>
  );
};

export default SideIndicators;
