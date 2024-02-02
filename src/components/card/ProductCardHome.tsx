import { ProductWithId } from "@/models/type";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCardHome({
  product,
}: {
  product: ProductWithId;
}) {
  return (
    <Link to={`/product/${product.docId}`} className="w-full h-full">
      <div className="w-full h-full">
        <div className="rounded-3xl overflow-hidden bg-white">
          <img
            src={product.productImage[0]}
            alt="product"
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        <section className="w-full p-3">
          <div className="text-left text-sm font-bold review">
            {product.productName}
          </div>

          <div className="flex justify-between text-left text-xs text-gray-400 ">
            <p>KRW {product.productPrice}</p>
          </div>
        </section>
      </div>
    </Link>
  );
}
