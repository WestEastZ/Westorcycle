import useDeleteCart from "@/hook/cart/useDeleteCart";
import useUpdateCart from "@/hook/cart/useUpdateCart";
import useFetchProduct from "@/hook/product/useFetchProduct";
import { CartType } from "@/models/type";
import { useEffect, useState } from "react";

export default function CartItemCard({ item }: { item: CartType }) {
  // 상품 정보 조회
  const { product } = useFetchProduct(item.productId);

  // 장바구니 삭제
  const { deleteCartMutation } = useDeleteCart();
  const { updateCartMutation } = useUpdateCart();
  const [quantity, setQuantity] = useState<number>(item.productQuantity);

  // 장바구니 수량 수정
  useEffect(() => {
    updateCartMutation.mutate({
      productId: item.productId,
      newQuantity: quantity,
    });
  }, [quantity]);

  return (
    <>
      <div>
        {product.productName}
        {item.productPrice * quantity}원
        <div>
          <div>
            <p>{quantity}</p>
            <button onClick={() => setQuantity(quantity + 1)}>증가</button>
            <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
              감소
            </button>
          </div>
          <button onClick={() => deleteCartMutation.mutate(item.productId)}>
            삭제
          </button>
        </div>
      </div>
    </>
  );
}
