import ProductCard from "@/components/card/ProductCard";
import { useUser } from "@/contexts/userContext";
import fetchInfinityProduct from "@/query/product/fetchInfinityProduct";
import { ProductWithId } from "@/models/type";
import { OrderByDirection } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export default function Product() {
  const user = useUser();
  const params = useParams();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const [option, setOption] = useState<string>("");
  const [direction, setDirection] = useState<OrderByDirection>("desc");

  // react-query
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ["product", user?.id, params.category, params.category, option, direction],
    ({ pageParam, queryKey }) => fetchInfinityProduct({ pageParam, queryKey }),
    {
      getNextPageParam: (lastPage) => lastPage?.lastVisible,
    }
  );

  // observer
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // 정렬 기준 useCallback으로 메모이제이션 버전 사용
  const sortOption = useCallback(
    (option: string, direction: OrderByDirection) => {
      setOption(option);
      setDirection(direction);

      // 쿼리데이터 무효 -> 다시 가져오기
      queryClient.invalidateQueries([
        "product",
        user?.id,
        params.category,
        params.category,
        option,
        direction,
      ]);
    },
    [user, params.category]
  );

  return (
    <>
      <div className="flex justify-center gap-10">
        <button onClick={() => sortOption("price", "asc")}>
          가격 오름정렬
        </button>
        <button onClick={() => sortOption("price", "desc")}>
          가격 내림정렬
        </button>
      </div>

      <div className="flex justify-center gap-10">
        <button onClick={() => sortOption("updatedAt", "asc")}>
          최신 오름정렬
        </button>
        <button onClick={() => sortOption("updatedAt", "desc")}>
          최신 내림정렬
        </button>
      </div>

      <div className="w-1/3 h-1/3">
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
