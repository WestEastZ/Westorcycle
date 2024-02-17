import { ProductWithId, UserType } from "@/models/type";
import React from "react";

export default function useChangeInput(
  user: UserType,
  product: ProductWithId,
  setProduct: (value: ProductWithId) => void
) {
  // 상품 상태 변경
  const onChangeInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    if (user) {
      setProduct({ ...product, sellerId: user?.id, [name]: value });
    }
  };
  return { onChangeInput };
}
