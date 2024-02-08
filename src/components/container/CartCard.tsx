import useDeleteCart from "@/hook/cart/useDeleteCart";
import useUpdateCart from "@/hook/cart/useUpdateCart";
import { CartType } from "@/models/type";
import fetchProduct from "@/query/product/fetchProduct";
import { ChevronDownCircle, ChevronUpCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function CartCard({ item }: { item: CartType }) {
  // 상품 조회
  const { data: product, isLoading } = useQuery(
    ["product", item.productId],
    fetchProduct
  );
  const [quantity, setQuantity] = useState<number>(item.productQuantity);

  // 장바구니 삭제
  const { deleteCartMutation } = useDeleteCart();
  // 장바구니 수정
  const { updateCartMutation } = useUpdateCart();

  useEffect(() => {
    updateCartMutation.mutate({
      productId: item.productId,
      newQuantity: quantity,
    });
  }, [quantity]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-44 w-full min-w-60 flex border rounded-2xl">
      <section className="w-1/3 h-full">
        <img
          src={product?.productImage[0]}
          alt={product?.productName}
          loading="lazy"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </section>

      <section className="w-2/3 h-full flex justify-between  flex-col p-3">
        <div>
          <div className="text-left text-lg font-bold review">
            {product?.productName}
          </div>
          <div className="text-left text-gray-600 review">
            {product?.productDescription}
          </div>
        </div>

        <div className="flex justify-between items-center text-left">
          <div>KRW {item.productPrice * item.productQuantity}</div>
          <div className="flex justify-center items-center gap-2">
            <div>Quantity : {item.productQuantity}</div>
            <button onClick={() => setQuantity(quantity + 1)}>
              <ChevronUpCircle size={20} />
            </button>
            <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
              <ChevronDownCircle size={20} />
            </button>
          </div>
        </div>
      </section>

      <button
        onClick={() => deleteCartMutation.mutate(item.productId)}
        className="absolute -top-2 -right-3 rounded-full bg-red-500"
      >
        <X size={24} />
      </button>
      {/* <button onClick={}>삭제</button> */}
    </div>
  );
}
