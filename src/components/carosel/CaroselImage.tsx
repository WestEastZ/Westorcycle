import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product, ProductWithId } from "@/models/type";
import { Card, CardContent } from "../ui/card";

interface CaroselImageProps {
  product: ProductWithId;
}

export default function CaroselImage({ product }: CaroselImageProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-2/3 h-full"
    >
      <CarouselContent>
        {product?.productImage.map((url) => (
          <CarouselItem key={url}>
            <div className="w-full h-full">
              <img
                src={url}
                alt={product?.productName}
                className="w-full h-full object-cover rounded-l-3xl aspect-square"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
