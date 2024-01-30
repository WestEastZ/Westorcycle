import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { Product } from "@/models/type";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

export default function ProductList() {
  const user = useUser();
  const [productList, setProductList] = useState<Product[] | []>([]);
  const [docId, setDocId] = useState<string[]>([]);

  // 상품 조회
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        if (user) {
          const products: Product[] = [];
          const Docs: string[] = [];
          const q = query(
            collection(db, "product"),
            where("sellerId", "==", user.id),
            orderBy("updatedAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Product;
            const curDoc = doc.id;
            products.push(data);
            Docs.push(curDoc);
          });
          setProductList(products);
          setDocId(Docs);
        }
      };
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  console.log(productList);
  return (
    <div className="grid grid-cols-3 gap-5">
      {productList.map((product, index) => (
        <ProductCard key={product.id} product={product} doc={docId[index]} />
      ))}
    </div>
  );
}
