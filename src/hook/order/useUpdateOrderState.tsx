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

export default function useUpdateOrderState() {
  const { user } = useUser() || {};
  const queryClient = useQueryClient();

  const updateOrderStateHandler = async ({
    orderGroup,
    productId,
    value,
  }: {
    orderGroup: string;
    productId: string;
    value: string;
  }) => {
    try {
      let q = query(
        collection(db, "order"),
        where("orderGroup", "==", orderGroup),
        where("productId", "==", productId)
      );

      const qSnapshot = await getDocs(q);

      qSnapshot.forEach(async (docs) => {
        const docRef = doc(db, "order", docs.id);
        await updateDoc(docRef, {
          orderState: value,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStateMutation = useMutation(updateOrderStateHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["order", user?.id]);
    },
  });
  return { updateOrderStateMutation };
}
