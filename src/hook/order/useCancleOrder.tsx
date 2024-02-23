import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { OrderEnum } from "@/models/enum";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

export default function useCancleOrder() {
  const { user } = useUser() || {};
  const queryClient = useQueryClient();

  const cancleOrderHandler = async ({
    orderGroup,
    productId,
  }: {
    orderGroup: string;
    productId: string;
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
          orderState: OrderEnum.Cancle,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cancleOrderMutation = useMutation(cancleOrderHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["order", user?.id]);
    },
  });
  return { cancleOrderMutation };
}
