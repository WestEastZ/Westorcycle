import React from "react";
import { OrderEnum } from "@/models/enum";
import PageHeader from "@/components/header/PageHeader";
import { useUser } from "@/contexts/userContext";
import { useQuery } from "react-query";
import fetchOrder from "@/query/order/fetchOrder";
import { Link } from "react-router-dom";
import PurcahseCard from "@/components/card/PurcahseCard";
import { Button } from "@/components/ui/button";
import PurcahseInfoCard from "@/components/card/PurcahseInfoCard";
export default function Order() {
  const user = useUser();
  // 주문 현황
  const { data } = useQuery(["order", user?.id], fetchOrder);

  // 구매 내역
  const orderItems = data?.orderItems;
  // 그룹화
  const orderGroups = data?.orderGroups;

  return (
    <>
      <PageHeader title="Order" description="당신의 상품의 주문 현황입니다." />
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
                  <div className="w-full flex justify-evenly" key={productId}>
                    {/* 상품 카드 */}
                    <Link
                      to={`/product/${productId}`}
                      className="w-1/2 hover:scale-105 transition duration-300"
                    >
                      <PurcahseCard productId={productId} />
                    </Link>

                    {/* 주문 정보  */}
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
