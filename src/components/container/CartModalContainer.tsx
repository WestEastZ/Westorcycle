import { CartType } from "@/models/type";
import CartModalCard from "../card/CartModalCard";

interface CartItemContainerProps {
  cartItems: CartType[] | undefined;
}

export default function CartModalContainer({
  cartItems,
}: CartItemContainerProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {cartItems &&
          cartItems.map((item) => (
            <CartModalCard key={item.productId} item={item} />
          ))}
      </div>
    </>
  );
}
