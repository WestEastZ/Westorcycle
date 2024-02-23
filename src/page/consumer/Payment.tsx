import { useState } from "react";

import useDecreaseStock from "@/hook/order/useDecreaseStock";
import usePayment from "@/hook/order/usePayment";
import useRecoverStock from "@/hook/order/useRecoverStock";
import useAddPurchase from "@/hook/order/useAddPurchase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartType } from "@/models/type";
import useDeletePaymentItem from "@/hook/cart/useDeletePaymentItem";
import { useUser } from "@/contexts/userContext";
import { useNavigate, useParams } from "react-router";
import { checkAuth } from "@/utils/checkAuth";

export default function Payment({
  selectedItems,
  totalPrice,
  openModalHandler,
}: {
  selectedItems: CartType[];
  totalPrice: number;
  openModalHandler: () => void;
}) {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }

  const { DecreaseStockMutation } = useDecreaseStock();
  const { RecoverStockMutation } = useRecoverStock();
  const { addPurchaseMutation } = useAddPurchase();
  const { deletePaymentItemMutation } = useDeletePaymentItem();

  // input value 변경
  const [order_name, setOrder_name] = useState<string>("");
  const [buyer_tel, setBuyer_tel] = useState<string>("");
  const [buyer_email, setBuyer_email] = useState<string>("");
  const [buyer_addr, setBuyer_addr] = useState<string>("");
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "order_name") {
      setOrder_name(value);
    }
    if (name === "buyer_tel") {
      setBuyer_tel(value);
    }
    if (name === "buyer_email") {
      setBuyer_email(value);
    }
    if (name === "buyer_addr") {
      setBuyer_addr(value);
    }
  };

  // checkbox 확인
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (order_name && buyer_tel && buyer_email && buyer_addr) {
      setConfirmation(e.target.checked);
    } else {
      e.target.checked = false;
      alert("모든 정보를 입력해주세요.");
    }
  };

  // 결제
  const { payment } = usePayment(
    DecreaseStockMutation,
    RecoverStockMutation,
    addPurchaseMutation,
    deletePaymentItemMutation,
    selectedItems,
    totalPrice,
    order_name,
    buyer_tel,
    buyer_email,
    buyer_addr
  );

  function onClickPayment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    payment();
  }

  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-white bg-opacity-10 z-40 flex justify-center items-center"
      onClick={openModalHandler}
    >
      {/* 구매자 정보 입력 */}
      <section
        className="absolute w-2/3 h-2/3 z-50 bg-[#141414] rounded-3xl flex flex-col justify-evenly px-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-2xl">Buyer Infomation</div>
        <form className="flex flex-col gap-10">
          <Input
            type="text"
            placeholder="Name"
            name="order_name"
            value={order_name}
            onChange={onChange}
          />
          <Input
            type="text"
            placeholder="Phone Number"
            name="buyer_tel"
            value={buyer_tel}
            onChange={onChange}
          />
          <Input
            type="email"
            placeholder="Email"
            name="buyer_email"
            value={buyer_email}
            onChange={onChange}
          />
          <Input
            type="text"
            placeholder="Address"
            name="buyer_addr"
            value={buyer_addr}
            onChange={onChange}
          />
          <div className="flex justify-center gap-2">
            <input
              type="checkbox"
              id="checkPayment"
              onChange={onCheckboxChange}
            />
            <label htmlFor="checkPayment">Confirmation of payment</label>
          </div>
          <Button onClick={onClickPayment} disabled={!confirmation}>
            Payment
          </Button>
        </form>
      </section>
    </div>
  );
}
