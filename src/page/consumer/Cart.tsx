import CartCard from "@/components/card/CartCard";
import PageHeader from "@/components/header/PageHeader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userContext";
import fetchCart from "@/query/cart/fetchCart";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Cart() {
  const user = useUser();

  // 장바구니 조회
  const { data: cartItems, isLoading } = useQuery(
    ["cart", user?.id],
    fetchCart
  );

  if (isLoading) {
    <div>...Loading</div>;
  }

  // 장바구니 가격 조회
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    cartItems?.forEach((item) => {
      total += item.productPrice * item.productQuantity;
    });

    setTotalPrice(total);
  }, [cartItems]);

  return (
    <>
      <PageHeader title="Cart" description="Take care of your cart" />

      <div className="w-full h-px bg-slate-300 mb-8"></div>

      <Button className="w-1/2 text-lg mb-10">Buy</Button>

      <section className="flex justify-center gap-10">
        <div className="text-xl">Total Quantity : {cartItems?.length}</div>
        <div className="text-xl">Total Price : KRW {totalPrice}</div>
      </section>
      <div className="grid grid-cols-2 gap-5 py-10 px-10 mb-30 ">
        {cartItems?.map((item) => (
          <CartCard key={item.productId} item={item} />
        ))}
      </div>
    </>
  );
}
