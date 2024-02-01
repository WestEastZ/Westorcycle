import { db } from "@/firebase";
import { Product, UserType } from "@/models/type";
import { validateProduct } from "@/utils/validation";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React from "react";
import { Params, useNavigate } from "react-router-dom";

export default function useUpdateProduct(
  user: UserType,
  params: Readonly<Params<string>>,
  initialProduct: Product,
  setErrorProduct: (value: string) => void
) {
  const navigate = useNavigate();

  // 상품 수정
  const editProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // 상품등록 유효성 검사
    const checkProduct = validateProduct(initialProduct);

    if (checkProduct) {
      setErrorProduct(checkProduct);
      console.log(checkProduct);
      return;
    }

    try {
      if (params && params.productId) {
        const productRef = doc(db, "product", params.productId);
        await updateDoc(productRef, {
          ...initialProduct,
          updatedAt: serverTimestamp(),
        });
        navigate(`/seller/${user?.nickname}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { editProductHandler };
}
