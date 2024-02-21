import useDeleteCart from "@/hook/cart/useDeleteCart";
import useUpdateCart from "@/hook/cart/useUpdateCart";
import { CartType } from "@/models/type";
import fetchProduct from "@/query/product/fetchProduct";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import ArrowCircleUp from "@/assets/icon/ArrowCircleUp.svg";
import ArrowCircleDown from "@/assets/icon/ArrowCircleDown.svg";
import Close from "@/assets/icon/Close.svg";

export default function CartCard({
  item,
  selectHandler,
  handleQuantityChange,
  isSelected,
}: {
  item: CartType;
  selectHandler: (item: CartType) => void;
  handleQuantityChange: (productId: string, quantity: number) => void;
  isSelected: boolean;
}) {
  const location = useLocation();

  // 상품 조회
  const { data: product, isLoading } = useQuery(
    ["product", item.productId],
    fetchProduct,
    {
      onSuccess: (data) => {
        if (!data) {
          deleteCartMutation.mutate(item.productId);
        }
      },
    }
  );

  // 장바구니 삭제
  const { deleteCartMutation } = useDeleteCart();
  // 장바구니 수정
  const { updateCartMutation } = useUpdateCart();

  // 장바구니 수량 수정
  const [quantity, setQuantity] = useState<number>(item.productQuantity);

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
    <div
      className={`relative h-44 w-full min-w-60 flex rounded-2xl transform transition-all duration-200  border ${
        isSelected ? "scale-105 border-blue-800 border-2" : "border-gray-200"
      }`}
      onClick={() => selectHandler(item)}
    >
      <section className="w-1/3 h-full">
        <img
          src={product?.productImage[0]}
          alt={product?.productName}
          loading="lazy"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </section>

      <section className="w-2/3 h-full flex justify-between flex-col p-3">
        <div>
          <div className="text-left text-lg font-bold review">
            {product?.productName}
          </div>
          <div className="text-left text-sm text-gray-400 review">
            {product?.productDescription}
          </div>
        </div>

        <div className="flex justify-between items-center text-left text-xs">
          <div>
            KRW {product ? product?.productPrice * item.productQuantity : null}
          </div>
          <div className="flex justify-center items-center gap-2">
            <div>Quantity : {item.productQuantity}</div>
            {/* 수량 증감 장바구니 페이지에서만 가능 */}
            {location.pathname.includes("payment") ? null : (
              <>
                <button
                  name="productQuantityUp"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product && product.productQuantity > quantity) {
                      setQuantity(quantity + 1);
                      handleQuantityChange(item.productId, quantity + 1);
                    }
                  }}
                >
                  <div>
                    <img src={ArrowCircleUp} alt="ArrowCircleUp" />
                  </div>
                </button>
                <button
                  name="productQuantityDown"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      handleQuantityChange(item.productId, quantity - 1);
                    }
                  }}
                >
                  <div>
                    <img src={ArrowCircleDown} alt="ArrowCircleDown" />
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {location.pathname.includes("payment") ? null : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCartMutation.mutate(item.productId);
          }}
          className="absolute -top-2 -right-3 rounded-full bg-red-500"
        >
          <div>
            <img src={Close} alt="Close" width="24" height="24" />
          </div>
        </button>
      )}
    </div>
  );
}
