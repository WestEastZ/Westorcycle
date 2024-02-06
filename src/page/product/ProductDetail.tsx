import CaroselImage from "@/components/carosel/CaroselImage";
import { useUser } from "@/contexts/userContext";
import fetchProducts from "@/firebase/fetchQuery/fetchProducts";
import useAddCart from "@/hook/cart/useAddCart";
import useFetchProduct from "@/hook/product/useFetchProduct";
import useFetchCart from "@/hook/cart/useFetchCart";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
  const user = useUser();
  const params = useParams();
  const { productId } = params;

  const [quantity, setQuantity] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // 상품 정보 조회
  const { product } = useFetchProduct(productId as string);

  // 장바구니 조회 -> 장바구니에 있는지 확인해서 있으면 "장바구니 보기"
  useFetchCart(user, product, setIsAdded);

  // 장바구니 추가
  const { addCartMutation } = useAddCart(product, quantity, setIsAdded);

  // 추천 상품
  const recommend = useQuery(
    ["product", "productCategory", product.productCategory, 6],
    fetchProducts
  );

  return (
    <>
      <section className="flex">
        <CaroselImage product={product} />
        <div>
          {product.productName}
          {product.productPrice}
          {product.productDescription}
          {product.productQuantity}
          {product.productCategory}
        </div>
      </section>

      {/* 수량 */}
      <section className="flex justify-center items-center flex-col">
        <div>Quantitiy : {quantity}</div>
        <div className="flex gap-5">
          <button onClick={() => setQuantity(quantity + 1)}>up</button>
          <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
            down
          </button>
        </div>
      </section>

      {/* 장바구니 */}
      <section>
        <div className="flex justify-center gap-10  mb-10">
          {isAdded ? (
            <Link to={`/cart/${user?.id}`}>See the Cart</Link>
          ) : (
            <button onClick={addCartMutation.mutate} className="bg-purple-500">
              Add to Cart
            </button>
          )}
        </div>
      </section>

      {/* 추천 상품 */}
      <div>추천 상품</div>
      {recommend.data &&
        recommend.data.map((data) => (
          <section key={data.id}>{data.productName}</section>
        ))}
    </>
  );
}
