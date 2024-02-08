import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { ProductWithId, UserType } from "@/models/type";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

export default function useAddCart(
  product: ProductWithId | undefined,
  quantity: number
  // setIsAdded: (value: boolean) => void
) {
  const user = useUser() as UserType;
  const queryClient = useQueryClient();

  const addCartHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      let q = query(
        collection(db, "cart"),
        where("productId", "==", product?.id),
        where("userId", "==", user.id)
      );

      const qSnapshot = await getDocs(q);

      if (qSnapshot.docs.length > 0) {
        console.log("sdsds");
      } else {
        // 장바구니에 추가
        const cartRef = doc(collection(db, "cart"));
        await setDoc(cartRef, {
          userId: user.id,
          productId: product?.id,
          productQuantity: quantity,
          productPrice: product?.productPrice,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCartMutation = useMutation(addCartHandler, {
    onSuccess: () => {
      // setIsAdded(true);
      queryClient.invalidateQueries();
    },
  });
  return { addCartMutation };
}
