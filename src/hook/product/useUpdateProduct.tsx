import { useUser } from "@/contexts/userContext";
import { db, storage } from "@/firebase";
import { ProductWithId, UserType } from "@/models/type";
import { validateProduct } from "@/utils/validation";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Params, useNavigate } from "react-router-dom";

export default function useUpdateProduct(
  userProps: UserType,
  params: Readonly<Params<string>>,
  initialProduct: ProductWithId,
  imagesToDelete: string[],
  setErrorProduct: (value: string) => void
) {
  const { user } = useUser() || {};
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 상품 수정
  const editProductMutation = useMutation(
    async () => {
      const promises = imagesToDelete.map((imageUrl) => {
        const imageRef = ref(storage, imageUrl);
        return deleteObject(imageRef);
      });
      await Promise.all(promises);

      if (params && params.productId) {
        const productRef = doc(db, "product", params.productId);
        await updateDoc(productRef, {
          ...initialProduct,
          updateAt: serverTimestamp(),
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cart", user?.id]);
        queryClient.invalidateQueries(["product", initialProduct.id]);
        navigate(`/seller/${userProps?.id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const editProductHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // 상품등록 유효성 검사
    const checkProduct = validateProduct(initialProduct);

    if (checkProduct) {
      setErrorProduct(checkProduct);
      return;
    }

    editProductMutation.mutate();
  };

  return { editProductHandler };
}
