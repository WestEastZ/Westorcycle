import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Product } from "@/models/type";

interface CaroselImageProps {
  product: Product;
}

export default function CaroselImage({ product }: CaroselImageProps) {
  return (
    <div>
      <Carousel className="w-full h-96">
        <CarouselContent>
          {product.productImage.map((url) => (
            <CarouselItem key={url}>
              <div className="">
                <img
                  src={url}
                  alt={product.productName}
                  className="w-full h-96 object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
