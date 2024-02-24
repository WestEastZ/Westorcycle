import { useUser } from "@/contexts/userContext";
import fetchProducts from "@/query/product/fetchProducts";
import useAddCart from "@/hook/cart/useAddCart";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import fetchProduct from "@/query/product/fetchProduct";
import fetchCart from "@/query/cart/fetchCart";
import { Button } from "@/components/ui/button";
import DetailImageContainer from "@/components/container/DetailImageContainer";
import RecommendContainer from "@/components/container/RecommendContainer";

import ArrowCircleUp from "@/assets/icon/ArrowCircleUp.svg";
import ArrowCircleDown from "@/assets/icon/ArrowCircleDown.svg";
import SEOHelmet from "@/utils/SEOHelmet";

export default function ProductDetail() {
  const { user } = useUser() || {};
  const params = useParams();
  const { productId } = params;

  // 디테일 페이지에서 장바구니 등록되면 수량 업다운 지우기

  const [quantity, setQuantity] = useState<number>(1);
  // const [isAdded, setIsAdded] = useState<boolean>(false);

  // 상품 정보 조회
  const { data: product } = useQuery(["product", productId], fetchProduct);

  // 장바구니 조회 -> 장바구니에 있는지 확인해서 있으면 "장바구니 보기"
  const { data: cartItems } = useQuery(["cart", user?.id], fetchCart);

  // 상품이 장바구니에 있는지 확인
  const isInCart = cartItems?.some((item) => item.productId === productId);

  // 장바구니 추가
  const { addCartMutation } = useAddCart(product, quantity);

  // 추천 상품
  const recommend = useQuery(
    ["product", "productCategory", product?.productCategory, 6],
    fetchProducts
  );

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center items-center mt-10">
      {/* header */}
      <SEOHelmet
        title={`Product Detail`}
        description="Check the pictures and detailed description of the product."
      />

      {/* body  */}
      <main className="w-full flex flex-col justify-center items-center gap-20">
        <section className="flex w-full justify-center gap-20">
          <section className="h-full">
            <DetailImageContainer product={product} />
          </section>

          <section className="flex flex-col justify-between">
            {/* 상품 정보 */}
            <section className="flex flex-col text-left gap-5">
              <div className="text-4xl">{product.productName}</div>
              <div className="text-base">{product.productDescription}</div>
              <div>Price : KRW {product.productPrice}</div>
              <div>Remain Quantity : {product.productQuantity}</div>
              <div>Category : {product.productCategory}</div>
              {/* 수량  */}
              {isInCart ? null : (
                <section className="flex gap-10">
                  <div>Quantitiy : {quantity}</div>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        product.productQuantity > quantity &&
                        setQuantity(quantity + 1)
                      }
                      disabled={isInCart}
                    >
                      <div>
                        <img src={ArrowCircleUp} alt="ArrowCircleUp" />
                      </div>
                    </button>
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={isInCart}
                    >
                      <div>
                        <img src={ArrowCircleDown} alt="ArrowCircleDown" />
                      </div>
                    </button>
                  </div>
                </section>
              )}
            </section>

            {/* 장바구니 */}
            <section className="w-full">
              {user?.isSeller ? (
                product.sellerId === user?.id ? (
                  <Link
                    to={`/seller/${user?.id}/manage-product/${product.id}`}
                    className="w-full"
                  >
                    <Button>See the Product</Button>
                  </Link>
                ) : (
                  <Button disabled>Add to Cart</Button>
                )
              ) : isInCart ? (
                <Link to={`/cart/${user?.id}`} className="w-full">
                  <Button>See the Cart</Button>
                </Link>
              ) : (
                <Button onClick={addCartMutation.mutate}>Add to Cart</Button>
              )}
            </section>
          </section>
        </section>

        {/* 추천 상품 */}
        <section>
          <div className="text-left text-xl ml-3">Recommend</div>
          <RecommendContainer products={recommend} />
        </section>
      </main>
    </div>
  );
}
