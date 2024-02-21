import { useUser } from "@/contexts/userContext";
import { ProductWithId } from "@/models/type";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductWithId;
}

export default function SellerProductCard({ product }: ProductCardProps) {
  const user = useUser();
  return (
    <Link
      to={`/seller/${user?.id}/manage-product/${product.docId}`}
      className="h-44 w-full min-w-60 flex border rounded-2xl hover:scale-105 transition duration-300"
    >
      <section className="w-1/3 h-full">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          loading="lazy"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </section>

      <section className="w-2/3 h-full flex justify-between  flex-col p-3">
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
