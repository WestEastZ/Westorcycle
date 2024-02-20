import { useCallback, useEffect, useState } from "react";

import { ProductWithId } from "@/models/type";

interface CaroselImageProps {
  product: ProductWithId;
}

export default function DetailImageContainer({ product }: CaroselImageProps) {
  const [mainImage, setMainImage] = useState<string>(product.productImage[0]);
  const [otherImage, setOtherImage] = useState<string[]>(
    product.productImage.slice(1)
  );

  useEffect(() => {
    setMainImage(product.productImage[0]);
    setOtherImage(product.productImage.slice(1));
  }, [product]);

  const imageChangeHandler = useCallback(
    (index: number) => {
      setMainImage(otherImage[index]);
      const newOtherImage = [...otherImage];
      newOtherImage[index] = mainImage;
      setOtherImage(newOtherImage);
    },
    [mainImage, otherImage]
  );

  return (
    <div className="h-full flex flex-col gap-5">
      <section className="w-[35rem] h-96 rounded-2xl overflow-hidden">
        <img
          src={mainImage}
          alt="main product image"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </section>

      <section className="w-[35rem] h-24 flex gap-4">
        {(otherImage || []).map((url, index) => (
          <div
            key={url}
            className="w-1/3 h-full rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={url}
              alt="Product image"
              className="w-full h-full object-cover"
              loading="lazy"
              onClick={() => imageChangeHandler(index)}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
