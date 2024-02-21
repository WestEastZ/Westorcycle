import { ProductWithId } from "@/models/type";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductWithId;
}

export default function ProductCart({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="h-[30rem] w-full min-w-60 flex flex-col rounded-2xl hover:scale-105 border-2 border-stone-800 transition duration-300"
    >
      <section className="w-full h-2/3">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </section>

      <section className="w-full h-1/3 flex justify-between  flex-col p-3">
        <div>
          <div className="text-left text-lg font-bold review">
            {product.productName}
          </div>
          <div className="text-left text-sm text-gray-400 review">
            {product.productDescription}
          </div>
        </div>

        <div className="flex justify-between text-left text-xs">
          <p>KRW {product.productPrice}</p>
          <p>
            Quantity : <span>{product.productQuantity}</span>
          </p>
        </div>
      </section>
    </Link>
  );
}
