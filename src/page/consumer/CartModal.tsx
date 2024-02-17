import CartModalContainer from "@/components/container/CartModalContainer";
import { useUser } from "@/contexts/userContext";
import fetchCart from "@/query/cart/fetchCart";
import { useQuery } from "react-query";

export default function CartModal({ openCart }: { openCart: boolean }) {
  const user = useUser();

  // react-query
  const cartItems = useQuery(["cart", user?.id], fetchCart);
  return (
    <>
      <div
        className={`fixed bottom-24 -right-96 w-96 h-[40rem] flex-col z-50 py-10 bg-[#141414] border border-white rounded-3xl overflow-scroll transition-transform duration-500 ease-in-out transform ${
          openCart
            ? "-translate-x-[26rem] opacity-100"
            : "translate-x-0 opacity-0"
        } `}
      >
        <div className="text-2xl mb-10">{`${user?.nickname}'s Cart`}</div>
        <CartModalContainer cartItems={cartItems.data} />
      </div>
    </>
  );
}
