import CartCard from "@/components/card/CartCard";
import PageHeader from "@/components/header/PageHeader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userContext";
import useSelectCart from "@/hook/cart/useSelectCart";
import fetchCart from "@/query/cart/fetchCart";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Payment from "./Payment";
import SEOHelmet from "@/utils/SEOHelmet";
import { useNavigate, useParams } from "react-router";
import { checkAuth } from "@/utils/checkAuth";

export default function Cart() {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }

  // 장바구니 전체 조회
  const { data: cartItems } = useQuery(["cart", user?.id], fetchCart);

  // 상품 선택
  const { selectedItems, selectHandler, handleQuantityChange, isSelected } =
    useSelectCart();

  // 장바구니 가격 조회
  const totalPrice = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.productPrice * item.productQuantity,
      0
    );
  }, [selectedItems]);

  // 결제 정보 입력 모달 활성화
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openModalHandler = () => {
    setOpenModal(!openModal);
  };

  console.log("sdsd");
  return (
    <>
      {/* header */}
      <SEOHelmet
        title={`Product Category`}
        description="Check out the various categories."
      />

      {/* body  */}
      <main>
        <PageHeader title="Cart" description="Take care of your cart" />
        <div className="w-full h-px bg-slate-300 mb-8"></div>

        <div className="mb-8">구매를 원하시는 상품을 클릭 해주세요</div>

        {/* 수량 및 가격 */}
        <section className="flex justify-center gap-10 mb-8">
          <div className="text-xl">
            Select Product : {selectedItems?.length}
          </div>
          <div className="text-xl">Total Price : KRW {totalPrice}</div>
        </section>

        {/* 상품 */}
        <section className="grid grid-cols-2 gap-10 py-10 px-10 mb-30 place-items-center">
          {cartItems?.map((item) => (
            <CartCard
              key={item.productId}
              item={item}
              selectHandler={() => selectHandler(item)}
              handleQuantityChange={handleQuantityChange}
              isSelected={isSelected(item)}
            />
          ))}
        </section>

        {/* 결제 */}
        <Button
          className="w-1/2 text-lg"
          onClick={openModalHandler}
          disabled={selectedItems.length < 1}
        >
          Buy
        </Button>

        {openModal ? (
          // “Compound component” 으로 변경하기
          <Payment
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            openModalHandler={openModalHandler}
          />
        ) : null}
      </main>
    </>
  );
}
