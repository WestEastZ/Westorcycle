import AddImageButton from "@/components/button/AddImageButton";
import CaroselImage from "@/components/carosel/CaroselImage";
import FormProduct from "@/components/form/FormProduct";
import PageHeader from "@/components/header/PageHeader";
import NavBar from "@/components/nav/NavBar";

// import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/userContext";
import useChangeInput from "@/hook/useChangeInput";
import useDeleteProduct from "@/hook/product/useDeleteProduct";
import useFetchProduct from "@/hook/product/useFetchProduct";
import useImageUpload from "@/hook/useImageUpload";
import useUpdateProduct from "@/hook/product/useUpdateProduct";
import { UserType } from "@/models/type";
import { useState } from "react";

import { useParams } from "react-router-dom";

export type ParamsType = {
  productId?: string;
};

export default function ManageProduct() {
  const user = useUser() as UserType;
  const params = useParams<ParamsType>();

  const [errorProduct, setErrorProduct] = useState<string>("");

  // 상품 조회
  const { product, setProduct } = useFetchProduct();

  // 상품 상태 변경
  const { onChangeInput } = useChangeInput(user, product, setProduct);

  // 이미지 파일 선택
  const { addImageHandler } = useImageUpload(user, product, setProduct);

  // 상품 수정
  const { editProductHandler } = useUpdateProduct(
    user,
    params,
    product,
    setErrorProduct
  );

  // 상품 삭제
  const { deleteProductHandler } = useDeleteProduct(user, params, product);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <PageHeader title={"Product Deatail"} description={"description"} />

        {/* 사진 첨부 */}
        <section className="w-1/2 h-96 relative mb-10">
          {product.productImage.length == 0 ? (
            <div className="w-full h-96 border-2"></div>
          ) : (
            <CaroselImage product={product} />
          )}
          <AddImageButton />
        </section>

        <FormProduct
          onChangeInput={onChangeInput}
          addImageHandler={addImageHandler}
          product={product}
          setProduct={setProduct}
          deleteProductHandler={deleteProductHandler}
          editProductHandler={editProductHandler}
          errorCode={errorProduct}
        />
      </div>
    </>
  );
}
