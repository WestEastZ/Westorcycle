import CaroselImage from "@/components/carosel/CaroselImage";
import { useUser } from "@/contexts/userContext";
import fetchProducts from "@/query/product/fetchProducts";
import useAddCart from "@/hook/cart/useAddCart";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import fetchProduct from "@/query/product/fetchProduct";
import fetchCart from "@/query/cart/fetchCart";

export default function ProductDetail() {
  const user = useUser();
  const params = useParams();
  const { productId } = params;

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

  if (!product || !cartItems) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex w-full">
        <section className="h-full">
          <CaroselImage product={product} />
        </section>

        <section className="h-full flex flex-col justify-between border">
          {/* 상품 정보 */}
          <section className="flex flex-col items-center gap-8">
            <div className="text-4xl">{product.productName}</div>
            <div className="">{product.productDescription}</div>
            <div className="text-sm">KRW : {product.productPrice}</div>
            <div>Remain Quantity : {product.productQuantity}</div>
            <div>Category : {product.productCategory}</div>
          </section>

          {/* 수량  */}
          <section className="flex justify-center gap-10">
            <div>Quantitiy : {quantity}</div>
            <div className="flex gap-5">
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={isInCart}
              >
                up
              </button>
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={isInCart}
              >
                down
              </button>
            </div>
          </section>

          {/* 장바구니 */}
          <section className="flex justify-center border">
            {isInCart ? (
              <Link to={`/cart/${user?.id}`}>See the Cart</Link>
            ) : (
              <button
                onClick={addCartMutation.mutate}
                className="bg-purple-500 block"
              >
                Add to Cart
              </button>
            )}
          </section>
        </section>
      </div>

      {/* 추천 상품 */}
      <div>추천 상품</div>
      {recommend.data &&
        recommend.data.map((data) => (
          <section key={data.id}>{data.productName}</section>
        ))}
    </div>
  );
}
