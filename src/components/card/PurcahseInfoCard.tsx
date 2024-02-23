import { useUser } from "@/contexts/userContext";
import useCancleOrder from "@/hook/order/useCancleOrder";
import { OrderType } from "@/models/type";
import { Button } from "../ui/button";
import { useQuery } from "react-query";
import fetchUser from "@/query/user/fetchUser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderEnum } from "@/models/enum";
import useUpdateOrderState from "@/hook/order/useUpdateOrderState";

interface PurcahseCardProps {
  productId: string;
  orderItem: OrderType | undefined;
  group: {
    orderGroup: string;
    product: string[];
    totalPrice: number;
  };
}

export default function PurcahseInfoCard({
  orderItem,
  productId,
  group,
}: PurcahseCardProps) {
  const { user } = useUser() || {};

  // 구매 취소
  const { cancleOrderMutation } = useCancleOrder();

  // 주문상태 변경
  const { updateOrderStateMutation } = useUpdateOrderState();

  // 판매자
  const { data: userSeller } = useQuery(
    ["user", orderItem?.sellerId],
    fetchUser
  );

  // 구매자
  const { data: userBuyer } = useQuery(["user", orderItem?.userId], fetchUser);

  return (
    <div className="w-1/3">
      {user?.isSeller ? (
        // 판매자
        <div className="h-full flex flex-col justify-center gap-10 text-center text-sm">
          <section className="flex justify-evenly items-center">
            <div>
              <div>KRW</div>
              <div>{orderItem?.productPrice}</div>
            </div>
            <div>
              <div>Quantity</div>
              <div>{orderItem?.productQuantity}</div>
            </div>
            <div>
              <div>buyer</div>
              <div>{userBuyer?.nickname}</div>
            </div>
          </section>

          <form action="">
            <Select
              value={orderItem?.orderState}
              onValueChange={(value) =>
                updateOrderStateMutation.mutate({
                  orderGroup: group.orderGroup,
                  productId,
                  value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={orderItem?.orderState} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>주문 현황</SelectLabel>
                  <SelectItem value={OrderEnum.Cancle}>
                    {OrderEnum.Cancle}
                  </SelectItem>
                  <SelectItem value={OrderEnum.Check}>
                    {OrderEnum.Check}
                  </SelectItem>
                  <SelectItem value={OrderEnum.Complete}>
                    {OrderEnum.Complete}
                  </SelectItem>
                  <SelectItem value={OrderEnum.Start}>
                    {OrderEnum.Start}
                  </SelectItem>
                  <SelectItem value={OrderEnum.Wait}>
                    {OrderEnum.Wait}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </form>
        </div>
      ) : (
        // 구매자
        <div className="h-full flex flex-col justify-center gap-10 text-center text-sm">
          <section className="flex justify-evenly items-center">
            <div>
              <div>KRW</div>
              <div>{orderItem?.productPrice}</div>
            </div>
            <div>
              <div>Quantity</div>
              <div>{orderItem?.productQuantity}</div>
            </div>
            <div>
              <div>seller</div>
              <div>{userSeller?.nickname}</div>
            </div>
            <div>
              <div>order State</div>
              <div>{orderItem?.orderState}</div>
            </div>
          </section>
          {/* 취소 */}
          <Button
            onClick={() =>
              cancleOrderMutation.mutate({
                orderGroup: group.orderGroup,
                productId,
              })
            }
            disabled={orderItem?.orderState !== OrderEnum.Check}
          >
            구매 취소하기
          </Button>
        </div>
      )}
    </div>
  );
}
