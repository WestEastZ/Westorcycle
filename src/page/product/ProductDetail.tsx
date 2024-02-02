import CaroselImage from "@/components/carosel/CaroselImage";
import NavBar from "@/components/nav/NavBar";
import fetchProducts from "@/firebase/fetch/fetchProducts";
import useFetchProduct from "@/hook/useFetchProduct";
import { useQuery } from "react-query";

export default function ProductDetail() {
  // 상품 조회
  const { product } = useFetchProduct();

  // 추천 상품
  const recommend = useQuery(
    ["product", "productCategory", product.productCategory],
    fetchProducts
  );

  console.log(recommend);

  return (
    <>
      <NavBar />
      <div className="flex">
        <CaroselImage product={product} />
        <div>
          {product.productName}
          {product.productPrice}
          {product.productDescription}
          {product.productQuantity}
          {product.productCategory}
        </div>
      </div>
      <div>
        <div>추천 상품</div>
        {recommend.data &&
          recommend.data.map((data) => (
            <div key={data.id}>{data.productName}</div>
          ))}
      </div>
    </>
  );
}
