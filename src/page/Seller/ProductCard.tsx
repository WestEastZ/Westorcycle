import { Product } from "@/models/type";
import { Link } from "react-router-dom";

type ProductProps = {
  product: Product;
  doc: string;
};

export default function ProductCard({ product, doc }: ProductProps) {
  console.log(product);
  return (
    <Link
      to={`/seller/product-detail/${doc}`}
      className="h-96 flex flex-col border-2 rounded-3xl shadow-custom hover:scale-105 transition duration-300"
    >
      <section className="w-full h-full">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-3xl aspect-video"
        />
      </section>

      <section className="w-full p-3">
        <div className="text-left text-lg font-bold review">
          {product.productName}
        </div>
        <div className="text-left text-sm text-gray-600 review">
          {product.productDescription}
        </div>
        <div className="flex justify-between text-left text-sm">
          <p>가격 : {product.productPrice}원</p>
          <p>
            남은 수량 :{" "}
            <span className="text-red-500">{product.productQuantity}개</span>
          </p>
        </div>
      </section>
    </Link>
  );
}
