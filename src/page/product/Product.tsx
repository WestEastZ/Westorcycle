import ProductCard from "@/components/card/ProductCart";
import { useUser } from "@/contexts/userContext";
import fetchInfinityProduct from "@/query/product/fetchInfinityProduct";
import { ProductWithId } from "@/models/type";
import { OrderByDirection } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import SEOHelmet from "@/utils/SEOHelmet";
import SortButton from "@/components/button/SortButton";

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
      {/* header */}
      <SEOHelmet
        title={`${params.category}`}
        description={`Check out the ${params.category} products.`}
      />

      {/* body  */}
      <SortButton sortOption={sortOption} />

      <main className="w-full grid grid-cols-3 gap-5 place-items-center">
        {data?.pages
          .flatMap((page) => page?.data)
          .filter(
            (productWithId): productWithId is ProductWithId =>
              productWithId !== undefined
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </main>
      <div ref={ref}></div>
    </>
  );
}
