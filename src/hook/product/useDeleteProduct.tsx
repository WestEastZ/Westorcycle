import { db } from "@/firebase";
import { Product, UserType } from "@/models/type";
import { AlertInfoType, ParamsType } from "@/page/seller/ManageProduct";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React from "react";
import { useMutation } from "react-query";

export default function useDeleteProduct(
  user: UserType,
  params: ParamsType,
  product: Product,
  setOpenAlert: (value: boolean) => void,
  setAlertInfo: (value: AlertInfoType) => void
) {
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
      setOpenAlert(true);
      setAlertInfo({
        header: "Delete Product",
        bodyText: "The product has been deleted",
        pathUrl: `/seller/${user?.id}`,
      });
    },
  });
  return { deleteProductMutation };
}
