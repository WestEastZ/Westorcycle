import PurcahseCard from "@/components/card/PurcahseCard";
import PurcahseInfoCard from "@/components/card/PurcahseInfoCard";
import PageHeader from "@/components/header/PageHeader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userContext";
import useCancleOrder from "@/hook/order/useCancleOrder";
import fetchPurchase from "@/query/order/fetchPurchase";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function PurchaseHistory() {
  const user = useUser();

  // 구매내역 조회 및 그룹화
  const { data } = useQuery(["order", user?.id], fetchPurchase);

  // 구매 내역
  const orderItems = data?.orderItems;
  // 그룹화
  const orderGroups = data?.orderGroups;

  // console.log(orderItems);
  // console.log(orderGroups);

  return (
    <>
      <PageHeader
        title="Purchase History"
        description="당신의 구매내역입니다."
      />
      <div className="w-full h-px bg-slate-300"></div>

      {/* 구매 내역 */}
      <section className="flex flex-col gap-10 p-10 mb-30 ">
        {/* 구매 그룹화 */}
        {orderGroups &&
          orderGroups.map((group) => (
            <div
              key={group.orderGroup}
              className="flex flex-col gap-6 border-b p-8 pb-20"
            >
              <div className="text-xl mb-5">
                Total Price : {group.totalPrice}
              </div>

              {/* 상품ID로 해당 상품 조회 */}
              {group.product.map((productId) => {
                const orderItem = orderItems?.find(
                  (item) =>
                    item.productId === productId &&
                    item.orderGroup === group.orderGroup
                );

                return (
                  <div className="w-full flex justify-around" key={productId}>
                    {/* 상품 카드 */}
                    <Link
                      to={`/product/${productId}`}
                      className="w-1/2 hover:scale-105 transition duration-300"
                    >
                      <PurcahseCard productId={productId} />
                    </Link>
                    {/* 구매 상품 정보 */}
                    <PurcahseInfoCard
                      orderItem={orderItem}
                      productId={productId}
                      group={group}
                    />
                  </div>
                );
              })}
            </div>
          ))}
      </section>
    </>
  );
}
