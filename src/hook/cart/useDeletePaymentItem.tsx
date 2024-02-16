import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { CartType } from "@/models/type";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

export default function useDeletePaymentItem() {
  const user = useUser();
  const queryClient = useQueryClient();

  const deletePaymentItemHandler = async ({
    cartItems,
  }: {
    cartItems: CartType[];
  }) => {
    try {
      const promise = cartItems.map(async (item) => {
        let q = query(
          collection(db, "cart"),
          where("productId", "==", item.productId),
          where("userId", "==", user?.id)
        );

        const qSnapshot = await getDocs(q);

        qSnapshot.forEach(async (docs) => {
          let docId = docs.id;
          const docRef = doc(db, "cart", docId);
          await deleteDoc(docRef);
        });
      });
      await Promise.all(promise);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePaymentItemMutation = useMutation(deletePaymentItemHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });
  return { deletePaymentItemMutation };
}
