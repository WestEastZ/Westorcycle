import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { Product, ProductWithId } from "@/models/type";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";

// import ProductCard from "./ProductCard";

export default function ProductList() {
  const user = useUser();

  const [productList, setProductList] = useState<(DocumentData | Product)[]>(
    []
  );
  const { ref, inView } = useInView();

  // 데이터 불러오기
  const fetchProducts = async ({ pageParam = null } = {}) => {
    if (user) {
      let q = query(
        collection(db, "product"),
        where("sellerId", "==", user.id),
        orderBy("updatedAt", "desc"),
        limit(3)
      );

      if (pageParam) {
        q = query(q, startAfter(pageParam));
      }

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      const data = querySnapshot.docs.map((doc) => {
        const product = doc.data() as Product;
        return { docId: doc.id, ...product } as ProductWithId;
      });

      return { data, lastVisible };
    }
  };

  // 쿼리
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    "product",
    (pageParam) => fetchProducts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.lastVisible,
    }
  );

  // // 옵저버
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-3 gap-5 px-10 mb-30">
        {data?.pages
          .flatMap((page) => page?.data)
          .filter(
            (productWithId): productWithId is ProductWithId =>
              productWithId !== undefined
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <div ref={ref}></div>
    </>
  );
}
