import { db } from "@/firebase";
import { CartType } from "@/models/type";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

export default function useDecreaseStock() {
  const queryClient = useQueryClient();
  const DecreaseStockMutation = useMutation(async (cartItems: CartType[]) => {
    const promises = cartItems.map(async (product) => {
      const productRef = doc(db, "product", product.productId);
      const productSanpshot = await getDoc(productRef);

      if (productSanpshot.exists()) {
        const productData = productSanpshot.data();
        // 재고의 개수 >= 카트의 개수
        if (productData.productQuantity >= product.productQuantity) {
          await updateDoc(productRef, {
            ...product,
            productQuantity:
              productData.productQuantity - product.productQuantity,
          });
        }
        queryClient.invalidateQueries(["product", productData.id]);
      }
    });

    return Promise.all(promises);
  });
  return { DecreaseStockMutation };
}
