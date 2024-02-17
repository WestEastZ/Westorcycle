import { CartType } from "@/models/type";
import { useState } from "react";

export default function useSelectCart() {
  const [selectedItems, setSelectedItems] = useState<CartType[]>([]);

  const selectHandler = (item: CartType) => {
    // 선택한 상품 조회
    const isAlreadySelected = selectedItems.find(
      (selectedItem) => selectedItem.productId === item.productId
    );

    // 선택 및 제거
    if (isAlreadySelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.productId !== item.productId
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // 선택된 상품 수량 변경
  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.productId === productId
          ? { ...item, productQuantity: quantity }
          : item
      )
    );
  };

  // 선택되어 있는지 확인
  const isSelected = (item: CartType) => {
    return selectedItems.some(
      (selectedItem) => selectedItem.productId === item.productId
    );
  };
  return { selectedItems, selectHandler, handleQuantityChange, isSelected };
}
