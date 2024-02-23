import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/contexts/userContext";
import PageHeader from "@/components/header/PageHeader";
import { useInfiniteQuery } from "react-query";
import fetchInfinityProduct from "@/query/product/fetchInfinityProduct";
import { useInView } from "react-intersection-observer";
import { ProductWithId } from "@/models/type";
import SellerProductCard from "../../components/card/SellerProductCard";
import { OrderByDirection } from "firebase/firestore";
import SEOHelmet from "@/utils/SEOHelmet";
import { checkAuth } from "@/utils/checkAuth";
import ProfileLinkContainer from "@/components/container/ProfileLinkContainer";

export default function SellerProfile() {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }

  const category: string = "";
  const option: string = "";
  const direction: OrderByDirection = "desc";

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
      {/* header */}
      <SEOHelmet title={`Profile`} description="Manage your information" />

      {/* body  */}
      <PageHeader
        title={`${user?.nickname}`}
        description={`Manage your account information`}
      />

      <div className="w-full h-px bg-slate-300 mb-8"></div>

      {/* 링크 */}
      <section className="flex justify-start items-start gap-24 mt-20 ml-10 mb-20">
        {/* 프로필 편집 */}
        <ProfileLinkContainer
          path={`/editprofile/${user?.id}`}
          title={"Edit Profile"}
          discription={"Edit your Profile"}
        />
        {/* 상품 등록 */}
        <ProfileLinkContainer
          path={`/seller/${user?.id}/add-product`}
          title={"Add Product"}
          discription={"Add your Product"}
        />

        {/* 주문 관리 */}
        <ProfileLinkContainer
          path={`/seller/order/${user?.id}`}
          title={"My Order"}
          discription={"Manage your Order"}
        />
      </section>

      {/* 상품 리스트 */}
      <div className="text-left text-3xl px-10">Product List</div>

      <section className="grid grid-cols-2 gap-5 py-8 px-10 mb-30">
        {data?.pages
          .flatMap((page) => page?.data)
          .filter(
            (productWithId): productWithId is ProductWithId =>
              productWithId !== undefined
          )
          .map((product) => (
            <SellerProductCard key={product.id} product={product} />
          ))}
      </section>
      <div ref={ref}></div>
    </>
  );
}
