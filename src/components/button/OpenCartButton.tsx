import CartModal from "@/page/consumer/CartModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import ShoppingCart from "@/assets/icon/ShoppingCart.svg";
import Close from "@/assets/icon/Close.svg";

export default function OpenCartButton() {
  const location = useLocation();
  const [openCart, setOpenCart] = useState<boolean>(false);

  const openModal = () => {
    setOpenCart(!openCart);
  };
  return (
    <>
      {location.pathname.startsWith("/cart") ? null : (
        <>
          <CartModal openCart={openCart} />
          <button
            onClick={openModal}
            className="fixed flex justify-center items-center bottom-8 right-8 w-12 h-12 z-50 rounded-full bg-zinc-800"
          >
            {openCart ? (
              <div>
                <img src={Close} alt="Close" />
              </div>
            ) : (
              <div>
                <img src={ShoppingCart} alt="ShoppingCart" />
              </div>
            )}
          </button>
        </>
      )}
    </>
  );
}
