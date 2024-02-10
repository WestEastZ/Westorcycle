import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import main1 from "@/assets/image/main.webp";

export default function MainImageContainer() {
  const imgArr = [main1];
  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {imgArr.map((data) => (
          <CarouselItem key={data}>
            <div className="">
              <img
                src={data}
                alt="오토바이"
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
