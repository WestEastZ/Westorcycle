import { db } from "@/firebase";
import { Product, UserType } from "@/models/type";
import { ParamsType } from "@/page/seller/ManageProduct";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
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

        // 이미지
        const deleteImages = product.productImage.map(async (imgUrl) => {
          const imageRef = ref(storage, imgUrl);
          await deleteObject(imageRef);
        });

        // 삭제
        await Promise.all([deleteDoc(docRef), ...deleteImages]);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductMutation = useMutation(deleteProductHandler, {
    onSuccess: () => {
      navigate(`/seller/${user?.id}`);
    },
  });
  return { deleteProductMutation };
}
