import { db } from "@/firebase";
import { Product, UserType } from "@/models/type";
import { ParamsType } from "@/page/seller/ManageProduct";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function useDeleteProduct(
  user: UserType,
  params: ParamsType,
  product: Product
) {
  const navigate = useNavigate();
  const deleteProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const storage = getStorage();

      if (params && params.productId) {
        const docRef = doc(db, "product", params.productId);
        const imageRef = ref(storage, product?.productImage[0]);

        // 삭제
        await deleteDoc(docRef);
        await deleteObject(imageRef);

        navigate(`/seller/${user?.id}`);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { deleteProductHandler };
}
