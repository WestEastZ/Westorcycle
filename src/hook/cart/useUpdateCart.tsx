import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateCart() {
  const { user } = useUser() || {};
  const queryClient = useQueryClient();

  const updateQuantityHandler = async ({
    productId,
    newQuantity,
  }: {
    productId: string;
    newQuantity: number;
  }) => {
    try {
      let q = query(
        collection(db, "cart"),
        where("productId", "==", productId),
        where("userId", "==", user?.id)
      );

      const qSnapshot = await getDocs(q);

      qSnapshot.forEach(async (docs) => {
        const docRef = doc(db, "cart", docs.id);
        await updateDoc(docRef, {
          productQuantity: newQuantity,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartMutation = useMutation(updateQuantityHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });
  return { updateCartMutation };
}
