import ProductCard from "@/components/card/ProductCard";
import { useUser } from "@/contexts/userContext";
import fetchInfinityProduct from "@/firebase/fetch/fetchInfinityProduct";
import { ProductWithId } from "@/models/type";
import { OrderByDirection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function Product() {
  const user = useUser();
  const params = useParams();
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

  const sortPriceAsc = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOption("price");
    setDirection("asc");
  };
  const sortPriceDesc = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOption("price");
    setDirection("desc");
  };

  const sortUpdateAsc = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOption("updatedAt");
    setDirection("asc");
  };
  const sortUpdateDesc = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOption("updatedAt");
    setDirection("desc");
  };

  return (
    <>
      <div className="flex justify-center gap-10">
        <button onClick={sortPriceAsc}>가격 오름정렬</button>
        <button onClick={sortPriceDesc}>가격 내림정렬</button>
      </div>

      <div className="flex justify-center gap-10">
        <button onClick={sortUpdateAsc}>최신 오름정렬</button>
        <button onClick={sortUpdateDesc}>최신 내림정렬</button>
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
