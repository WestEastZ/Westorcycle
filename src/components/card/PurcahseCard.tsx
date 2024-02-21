import fetchProduct from "@/query/product/fetchProduct";
import { useQuery } from "react-query";

export default function PurcahseCard({ productId }: { productId: string }) {
  const { data: product } = useQuery(["product", productId], fetchProduct);

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

      <section className="w-2/3 h-full flex flex-col gap-5 p-3">
        <div className="text-left text-lg font-bold review">
          {product?.productName}
        </div>
        <div className="text-left text-sm text-gray-400 review">
          {product?.productDescription}
        </div>
      </section>
    </div>
  );
}
