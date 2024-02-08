import ProductCardHome from "../card/ProductCardHome";
import { ProductWithId } from "@/models/type";

interface ProductContanierProps {
  products: ProductWithId[] | undefined;
}

export default function ProductContanierHome({
  products,
}: ProductContanierProps) {
  return (
    <div className="w-full h-80 flex justify-between gap-5 ">
      {products &&
        products.map((product) => (
          <ProductCardHome key={product.id} product={product} />
        ))}
    </div>
  );
}
