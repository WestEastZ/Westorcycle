import { db } from "@/firebase";
import { OrderGroup, OrderType } from "@/models/type";
import { collection, getDocs, query, where } from "firebase/firestore";
export default async function fetchPurchase({
  queryKey,
}: {
  queryKey: unknown[];
}) {
  const [_key, userId] = queryKey as [string, string];

  try {
    let q = query(collection(db, _key), where("userId", "==", userId));

    const qSnapshot = await getDocs(q);

    // 구매 내역 조회
    const orderItems = qSnapshot.docs.map((doc) => {
      const orderItem = doc.data();
      return { ...orderItem } as OrderType;
    });

    // 주문번호 그룹화
    let order: OrderGroup = {};

    orderItems.forEach((product) => {
      let key = product.orderGroup;

      if (!order[key]) {
        order[key] = {
          orderGroup: key,
          product: [],
          totalPrice: 0,
        };
      }

      order[key].product.push(product.productId);
      order[key].totalPrice += product.productPrice * product.productQuantity;
    });

    const orderGroups = Object.values(order);
    return { orderItems, orderGroups };
  } catch (error) {
    console.log(error);
  }
}
