import { ProductWithId, UserType } from "@/models/type";
import { UseMutationResult } from "react-query";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useAddCart from "@/hook/cart/useAddCart";

interface ProductDetailButtonProp {
  user: UserType | null | undefined;
  product: ProductWithId;
  isInCart: boolean | undefined;
  quantity: number;
}

export default function ProductDetailButton({
  user,
  product,
  isInCart,
  quantity,
}: ProductDetailButtonProp) {
  // 장바구니 추가
  const { addCartMutation } = useAddCart(product, quantity);

  // 판매자 확인
  const CheckSeller = () => {
    // 판매자와 구매자가 다를 시
    if (product.sellerId !== user?.id) {
      if (product.productQuantity == 0) {
        return <div className="text-3xl text-red-400">Sold out</div>;
      } else {
        return <Button disabled>Add to Cart</Button>;
      }
    }

    // 판매자와 구매자가 같을 시
    return (
      <Link
        to={`/seller/${user?.id}/manage-product/${product.id}`}
        className="w-full"
      >
        <Button>See the Product</Button>
      </Link>
    );
  };

  // 로그인한 경우
  const CheckUser = () => {
    // 잔여 수량이 0일 경우
    if (product.productQuantity == 0) {
      return <div className="text-3xl text-red-400">Sold out</div>;
    }

    // 장바구니에 상품이 있을 시
    if (isInCart) {
      return (
        <Link to={`/cart/${user?.id}`} className="w-full">
          <Button>See the Cart</Button>
        </Link>
      );
    }

    // 구매 가능한 경우
    return <Button onClick={addCartMutation.mutate}>Add to Cart</Button>;
  };

  // 로그인하지 않은 경우
  const CheckNoUser = () => {
    if (product.productQuantity == 0) {
      return <div className="text-3xl text-red-400">Sold out</div>;
    } else {
      <Link to="/signup" className="w-full">
        <Button>Add to Cart</Button>
      </Link>;
    }
  };

  return (
    <section className="w-full">
      {user?.isSeller ? (
        <CheckSeller />
      ) : user ? (
        <CheckUser />
      ) : (
        <CheckNoUser />
      )}
    </section>
  );
}
