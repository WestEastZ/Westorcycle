import Cart from "@/page/consumer/Cart";
import { ShoppingBag, ShoppingCart, X, XCircle } from "lucide-react";
import React, { useState } from "react";

export default function OpenCartButton() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  return (
    <>
      {openCart ? (
        <>
          <Cart />
          <button
            onClick={() => setOpenCart(false)}
            className="fixed flex justify-center items-center bottom-8 right-8 w-12 h-12 z-50 rounded-full  bg-zinc-800"
          >
            <X color={"#ffffff"} size={32} />
          </button>
        </>
      ) : (
        <button
          onClick={() => setOpenCart(true)}
          className="fixed flex justify-center items-center bottom-8 right-8 w-12 h-12 z-50 rounded-full  bg-zinc-800"
        >
          <ShoppingBag color={"#ffffff"} size={28} />
        </button>
      )}
    </>
  );
}
