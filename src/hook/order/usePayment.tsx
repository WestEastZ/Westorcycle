import { useUser } from "@/contexts/userContext";
import { RequestPayParams, RequestPayResponse } from "@/models/ImpType";
import { CartType } from "@/models/type";
import { useNavigate } from "react-router-dom";

type StockMutation = {
  mutate: (cartItems: CartType[]) => void;
};
type PurchaseMutation = {
  mutate: (data: { cartItems: CartType[]; merchant_uid: string }) => void;
};
type DeletePaymentItemMutation = {
  mutate: (data: { cartItems: CartType[] }) => void;
};

export default function usePayment(
  DecreaseStockMutation: StockMutation,
  RecoverStockMutation: StockMutation,
  addPurchaseMutation: PurchaseMutation,
  deletePaymentItemMutation: DeletePaymentItemMutation,
  cartItems: CartType[] | undefined,
  totalPrice: number,
  order_name: string,
  buyer_tel: string,
  buyer_email: string,
  buyer_addr: string
) {
  const { user } = useUser() || {};
  const navigate = useNavigate();

  // 결제
  const payment = () => {
    // 결제 전 재고 감소
    if (cartItems) {
      DecreaseStockMutation.mutate(cartItems);
    }

    const { IMP } = window;
    IMP?.init("imp86872540");

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: "html5_inicis",
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: totalPrice, // 결제금액
      name: order_name, // 주문명
      buyer_name: user?.nickname, // 구매자 이름
      buyer_tel: buyer_tel, // 구매자 전화번호
      buyer_email: buyer_email, // 구매자 이메일
      buyer_addr: buyer_addr, // 구매자 주소
    };

    IMP?.request_pay(data, callback);
  };

  const callback = async (response: RequestPayResponse) => {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      // 결제 완료 시 OREDR 컬렉션 생성 및 장바구니 내에서 삭제
      if (cartItems) {
        addPurchaseMutation.mutate({ cartItems, merchant_uid });
        deletePaymentItemMutation.mutate({ cartItems: cartItems });
      }

      alert("결제 성공");
      navigate(`/purchase/${user?.id}`);
    } else {
      // 결제 실패 시 재고 복구
      if (cartItems) {
        RecoverStockMutation.mutate(cartItems);
      }
      alert(`결제 실패: ${error_msg}`);
    }
  };
  return { payment };
}
