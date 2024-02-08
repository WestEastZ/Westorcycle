import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@/contexts/userContext";
import PageHeader from "@/components/header/PageHeader";
import { PlusCircle } from "lucide-react";
import { useInfiniteQuery } from "react-query";
import fetchInfinityProduct from "@/query/product/fetchInfinityProduct";
import { useInView } from "react-intersection-observer";
import { ProductWithId } from "@/models/type";
import ProductCard from "../../components/card/ProductCard";
import { OrderByDirection } from "firebase/firestore";

export default function SellerProfile() {
  const user = useUser();
  const params = useParams();
  const paramsId = params.id;
  const { ref, inView } = useInView();

  const [category, setCategory] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [direction, setDirection] = useState<OrderByDirection>("desc");

  // react-query
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ["product", user?.id, paramsId, category, option, direction],
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

  return (
    <>
      {/* 헤더  */}
      <PageHeader
        title={`${user?.nickname}`}
        description={`Take care of your products`}
      />

      <div className="w-full h-px bg-slate-300 mb-8"></div>

      {/* 상품 등록 */}
      <Link
        to={`/seller/${user?.id}/add-product`}
        className="w-fit m-auto flex justify-center items-center mb-10 gap-3 focus-custom "
      >
        <p>Add Proudct</p>
        <PlusCircle />
      </Link>

      {/* 상품 리스트 */}
      <div className="grid grid-cols-2 gap-5 py-16 px-10 mb-30">
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
