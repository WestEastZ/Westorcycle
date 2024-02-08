import ProductCardHome from "../card/ProductCardHome";
import { ProductWithId } from "@/models/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

interface ProductContanierProps {
  products: ProductWithId[] | undefined;
}

export default function ProductContanierHome({
  products,
}: ProductContanierProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full h-80 flex justify-between gap-5"
    >
      <CarouselContent>
        {products &&
          products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/4 lg:basis-1/4"
            >
              <ProductCardHome product={product} />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
