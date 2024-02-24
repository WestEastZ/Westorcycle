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
import useRecoverStock from "./useRecoverStock";

export default function useCancleOrder() {
  const { user } = useUser() || {};
  const queryClient = useQueryClient();
  const { RecoverStockMutation } = useRecoverStock();

  const cancleOrderHandler = async ({
    orderGroup,
    productId,
  }: {
    orderGroup: string;
    productId: string;
  }) => {
    let docId: string | undefined;

    try {
      let q = query(
        collection(db, "order"),
        where("orderGroup", "==", orderGroup),
        where("productId", "==", productId)
      );

      const qSnapshot = await getDocs(q);

      qSnapshot.forEach(async (docs) => {
        const docRef = doc(db, "order", docs.id);
        docId = docs.id;
        await updateDoc(docRef, {
          orderState: OrderEnum.Cancle,
        });
      });
    } catch (error) {
      console.log(error);
    }
    return { productId, docId };
  };

  const cancleOrderMutation = useMutation(cancleOrderHandler, {
    onSuccess: ({ productId, docId }) => {
      queryClient.invalidateQueries(["order", user?.id]);
      if (docId) {
        RecoverStockMutation.mutate({ productId, docId });
      }
    },
  });
  return { cancleOrderMutation };
}
