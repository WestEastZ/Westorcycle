import CartModalContainer from "@/components/container/CartModalContainer";
import CartItemContainer from "@/components/container/CartModalContainer";
import { useUser } from "@/contexts/userContext";
import fetchCart from "@/query/cart/fetchCart";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

export default function CartModal() {
  const user = useUser();

  // react-query
  const cartItems = useQuery(["cart", user?.id], fetchCart);

  console.log(cartItems.data);

  return (
    <>
      <div className="fixed bottom-24 right-10 w-72 h-[40rem] flex-col z-50 py-2 bg-[#141414] border border-white rounded-3xl overflow-scroll">
        <div>{cartItems.data?.length}개</div>
        <button>sdsds</button>
        <CartModalContainer cartItems={cartItems.data} />
      </div>
    </>
  );
}
