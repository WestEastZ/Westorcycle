import CartItemContainer from "@/components/container/CartItemContainer";
import { useUser } from "@/contexts/userContext";
import fetchCart from "@/firebase/fetchQuery/fetchCart";
import { useQuery } from "react-query";

export default function Cart() {
  const user = useUser();

  // react-query
  const cartItems = useQuery(["cart", user?.id], fetchCart);

  return (
    <div className="fixed bottom-24 right-10 w-60 h-96 flex-col z-50 bg-white overflow-scroll">
      <CartItemContainer cartItems={cartItems.data} />
      {cartItems.data?.length}개
    </div>
  );
}
