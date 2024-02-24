import { db } from "@/firebase";
import { CartType } from "@/models/type";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

export default function useRecoverStock() {
  const queryClient = useQueryClient();

  const RecoverStockMutation = useMutation(
    async (cartItems: CartType[] | { productId: string; docId: string }) => {
      if (Array.isArray(cartItems)) {
        // 결제 취소 재고복구 -> 결제 중 취소
        const promises = cartItems.map(async (product) => {
          const productRef = doc(db, "product", product.productId);
          const productSanpshot = await getDoc(productRef);

          if (productSanpshot.exists()) {
            const productData = productSanpshot.data();
            if (productData.productQuantity > product.productQuantity) {
              await updateDoc(productRef, {
                ...product,
                productQuantity:
                  productData.productQuantity + product.productQuantity,
              });
              queryClient.invalidateQueries(["product", productData.id]);
            }
          }
        });
        return Promise.all(promises);
      } else {
        // 주문 취소 재고복구 -> 주문 상태가 주문 취소일 경우
        const { productId, docId } = cartItems as {
          productId: string;
          docId: string;
        };

        // 주문의 수량 구하기
        let orderQuantity;
        const orderRef = doc(db, "order", docId);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();
          orderQuantity = orderData.productQuantity;
        }

        // 전체 재고의 수량 구하기
        let pevProductQuantity;
        const productRef = doc(db, "product", productId);
        const productSnapshot = await getDoc(productRef);

        // 재고 복구
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          pevProductQuantity = productData.productQuantity;
          await updateDoc(productRef, {
            productQuantity: pevProductQuantity + orderQuantity,
          });
        }
      }
    }
  );
  return { RecoverStockMutation };
}
