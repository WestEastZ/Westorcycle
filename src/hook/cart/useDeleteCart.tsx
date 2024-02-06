import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { UserType } from "@/models/type";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteCart() {
  const user = useUser() as UserType;
  const queryClient = useQueryClient();

  const deleteCartHandler = async (productId: string) => {
    try {
      let q = query(
        collection(db, "cart"),
        where("productId", "==", productId),
        where("userId", "==", user.id)
      );

      const qSnapshot = await getDocs(q);

      qSnapshot.forEach(async (docs) => {
        let docId = docs.id;
        const docRef = doc(db, "cart", docId);
        await deleteDoc(docRef);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartMutation = useMutation(deleteCartHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });
  return { deleteCartMutation };
}
