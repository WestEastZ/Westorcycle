import { db } from "@/firebase";
import { OrderGroup, OrderType } from "@/models/type";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function fetchOrder({
  queryKey,
}: {
  queryKey: unknown[];
}) {
  const [_key, userId] = queryKey as [string, string];

  try {
    let q = query(collection(db, _key), where("sellerId", "==", userId));

    const qSnapshot = await getDocs(q);

    // 주문 현황 조회
    const orderItems = qSnapshot.docs.map((doc) => {
      const orderItem = doc.data();
      return { ...orderItem } as OrderType;
    });

    // 주문번호 그룹화
    let order: OrderGroup = {};
    console.log("배열 생성 직후 orderItems", orderItems); // orderItems 배열 생성 직후

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
    console.log("orderGroups 객체 생성 직후 orderItems", orderItems); // orderItems 배열 생성 직후
    return { orderItems, orderGroups };
  } catch (error) {
    console.log(error);
  }
}
