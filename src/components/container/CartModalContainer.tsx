import { CartType } from "@/models/type";
import CartModalCard from "../card/CartModalCard";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/userContext";

interface CartItemContainerProps {
  cartItems: CartType[] | undefined;
}

export default function CartModalContainer({
  cartItems,
}: CartItemContainerProps) {
  const { user } = useUser() || {};

  return (
    <>
      <div className="grid grid-cols-1 gap-4 place-items-center">
        <Link
          to={`/cart/${user?.id}`}
          className="w-2/3 h-1/2 flex items-center"
        >
          <Button className="h-full">See the Cart</Button>
        </Link>

        {cartItems &&
          cartItems.map((item) => (
            <CartModalCard key={item.productId} item={item} />
          ))}
      </div>
    </>
  );
}
