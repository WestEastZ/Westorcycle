import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { OrderEnum } from "@/models/enum";
import { CartType } from "@/models/type";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useMutation } from "react-query";

interface addPurchaseProp {
  cartItems: CartType[];
  merchant_uid: string;
}

export default function useAddPurchase() {
  const user = useUser();

  const addPurchaseMutation = useMutation(
    async ({ cartItems, merchant_uid }: addPurchaseProp) => {
      const promises = cartItems.map(async (item) => {
        const orderRef = collection(db, "order");
        const productRef = doc(db, "product", item.productId);
        const productSnapsot = await getDoc(productRef);

        if (productSnapsot.exists()) {
          const data = productSnapsot.data();
          await addDoc(orderRef, {
            userId: user?.id,
            sellerId: data?.sellerId,
            productId: data?.id,
            productPrice: item.productPrice,
            productQuantity: item.productQuantity,
            orderState: OrderEnum.Check,
            orderGroup: merchant_uid,
          });
        }
      });
      await Promise.all(promises);
    },
    {
      onSuccess: () => {},
    }
  );
  return { addPurchaseMutation };
}
