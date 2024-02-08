import useDeleteCart from "@/hook/cart/useDeleteCart";
import useUpdateCart from "@/hook/cart/useUpdateCart";
import useFetchProduct from "@/query/product/fetchProduct";
import { CartType } from "@/models/type";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import fetchProduct from "@/query/product/fetchProduct";

export default function CartModalCard({ item }: { item: CartType }) {
  // 상품 정보 조회
  const { data: product } = useQuery(["product", item.productId], fetchProduct);

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

  if (!product) {
    <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-2/3 m-auto overflow-hidden border rounded-2xl">
        <div className="h-32">
          <img
            src={product?.productImage[0]}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>{product?.productName}</div>
        <div className="text-xs">KRW {item.productPrice * quantity}</div>
        <div>
          <div className="flex justify-center gap-3">
            <div className="text-xs">{quantity}</div>
            <div className="text-xs">
              <button onClick={() => setQuantity(quantity + 1)}>증가</button>
              <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
                감소
              </button>
            </div>
          </div>
          <button onClick={() => deleteCartMutation.mutate(item.productId)}>
            삭제
          </button>
        </div>
      </div>
    </>
  );
}
