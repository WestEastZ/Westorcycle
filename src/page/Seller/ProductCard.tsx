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
      className="h-96 flex flex-col justify-center items-center border-2 p-14 rounded-3xl shadow-custom hover:scale-105 transition duration-300"
    >
      <section key={`${doc}`} className="flex flex-col items-center">
        <div className="">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            loading="lazy"
            className="w-full object-cover aspect-video"
          />
        </div>

        <div>
          <p>{product.productName}</p>
          <p>{product.productPrice}</p>
          <p>{product.productDescription}</p>
          <p>{product.productQuantity}</p>
        </div>
      </section>
    </Link>
  );
}
