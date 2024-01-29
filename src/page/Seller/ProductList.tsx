import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { Product } from "@/models/type";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

export default function ProductList() {
  const user = useUser();
  const [productList, setProductList] = useState<Product[] | []>([]);

  // 상품 조회
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        if (user) {
          const products: Product[] = [];
          const q = query(
            collection(db, "product"),
            where("sellerId", "==", user.id),
            orderBy("updatedAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Product;
            products.push(data);
          });
          setProductList(products);
        }
      };
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  console.log(productList);
  return (
    <div className="w-full flex flex-col items-center gap-20">
      {productList.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}
