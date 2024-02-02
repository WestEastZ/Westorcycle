import { db } from "@/firebase";
import { Product, ProductWithId, UserType } from "@/models/type";
import {
  DocumentSnapshot,
  OrderByDirection,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { QueryFunctionContext } from "react-query";

export default async function fetchInfinityProduct({
  pageParam = null,
  queryKey,
}: {
  pageParam: QueryFunctionContext<"", DocumentSnapshot> | null;
  queryKey: unknown[];
}) {
  // queryKey 변수 선언
  const [_key, user, params, category, option, direction = "desc"] =
    queryKey as [string, string, string, string, string, OrderByDirection];

  // 실행
  try {
    let q = query(collection(db, _key), limit(2));

    // 판매자 본인 확인
    if (user == params) {
      q = query(q, where("sellerId", "==", user));
    }

    // 카테고리
    if (category) {
      q = query(q, where("productCategory", "==", category));
    }

    // 정렬 조건
    switch (option) {
      case "price":
        q = query(q, orderBy("productPrice", direction));
        break;
      // case "likes": -> 색인 생성 완료 추후 사용
      //   q = query(q, orderBy("likes", direction));
      //   break;
      case "updatedAt":
        q = query(q, orderBy("updatedAt", direction));
        break;
      default:
        q = query(q, orderBy("updatedAt", "desc"));
        break;
    }

    // 페이지 시작 지점
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const qSnapshot = await getDocs(q);
    const lastVisible = qSnapshot.docs[qSnapshot.docs.length - 1];

    const data = qSnapshot.docs.map((doc) => {
      const product = doc.data() as Product;
      return { docId: doc.id, ...product } as ProductWithId;
    });
    console.log(data);
    return { data, lastVisible };
  } catch (error) {
    console.log(error);
  }
}
