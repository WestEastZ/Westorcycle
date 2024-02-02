import { db } from "@/firebase";
import { Product } from "@/models/type";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useFetchProduct() {
  const params = useParams();
  const [product, setProduct] = useState<Product>({
    id: Date.now(),
    sellerId: "",
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productDescription: "",
    productCategory: "",
    productImage: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (params && params.productId) {
          const docRef = doc(db, "product", params.productId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const product: Product = {
              id: data.id,
              sellerId: data.sellerId,
              productName: data.productName,
              productPrice: data.productPrice,
              productQuantity: data.productQuantity,
              productDescription: data.productDescription,
              productCategory: data.productCategory,
              productImage: data.productImage,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };
            setProduct(product);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [params]);

  return { product, setProduct };
}
