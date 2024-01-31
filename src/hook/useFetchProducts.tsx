import { db } from "@/firebase";
import { Product, ProductWithId } from "@/models/type";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function useFetchProductsByCategory(category: string) {
  const [productsByCategory, setProductsByCategory] = useState<ProductWithId[]>(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "product"),
          where("productCategory", "==", category),
          orderBy("updatedAt", "desc"),
          limit(4)
        );

        const qSnapshot = await getDocs(q);

        const products = qSnapshot.docs.map((doc) => {
          const product = doc.data() as Product;
          return { docId: doc.id, ...product } as ProductWithId;
        });

        setProductsByCategory(products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [category]);

  return { productsByCategory };
}
