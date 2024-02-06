import { db } from "@/firebase";
import { ProductWithId, UserType } from "@/models/type";
import { validateProduct } from "@/utils/validation";
import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function useAddProduct(
  user: UserType,
  product: ProductWithId,
  setErrorProduct: (value: string) => void
) {
  const navigate = useNavigate();

  // 상품 등록
  const addProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // 상품등록 유효성 검사
    const checkProduct = validateProduct(product);

    if (checkProduct) {
      setErrorProduct(checkProduct);
      console.log(checkProduct);
      return;
    }

    try {
      const productRef = doc(collection(db, "product"));
      product.docId = productRef.id;
      product.id = productRef.id;
      await setDoc(productRef, product);

      navigate(`/seller/${user?.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return { addProductHandler };
}
