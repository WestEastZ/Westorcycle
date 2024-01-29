import { Product } from "@/models/type";
import React from "react";
import { Link } from "react-router-dom";

type ProductProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="w-1/2 h-1/2flex felx-col justify-center items-center border-2 p-14"
    >
      <section key={product.id} className="h-full flex flex-col ">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          loading="lazy"
          className="w-full h-full object-contain"
        />

        <p>{product.productName}</p>
        <p>{product.productPrice}</p>
        <p>{product.productDescription}</p>
        <p>{product.productQuantity}</p>
      </section>
    </Link>
  );
}
