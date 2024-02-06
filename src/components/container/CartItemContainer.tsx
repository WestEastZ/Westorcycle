import { CartType } from "@/models/type";
import React from "react";
import CartItemCard from "../card/CartItemCard";

interface CartItemContainerProps {
  cartItems: CartType[] | undefined;
}

export default function CartItemContainer({
  cartItems,
}: CartItemContainerProps) {
  return (
    <div className="w-full h-80 flex justify-between gap-5 ">
      {cartItems &&
        cartItems.map((item) => (
          <CartItemCard key={item.productId} item={item} />
        ))}
    </div>
  );
}
