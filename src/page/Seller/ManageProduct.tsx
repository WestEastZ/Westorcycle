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
import useUploadImage from "@/hook/image/useUploadImage";
import useUpdateProduct from "@/hook/product/useUpdateProduct";
import { UserType } from "@/models/type";
import { useState } from "react";

import { useParams } from "react-router-dom";
import useDeleteImage from "@/hook/image/useDeleteImage";
import { X } from "lucide-react";
import { ERROR_MESSAGES } from "@/utils/validation";

export type ParamsType = {
  productId?: string;
};

export default function ManageProduct() {
  const user = useUser() as UserType;
  const params = useParams();
  const { productId } = params;

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [errorProduct, setErrorProduct] = useState<string>("");

  // 상품 조회
  const { product, setProduct } = useFetchProduct(productId as string);

  // 상품 상태 변경
  const { onChangeInput } = useChangeInput(user, product, setProduct);

  // 이미지 파일 선택
  const { addImageHandler } = useUploadImage(user, product, setProduct);

  // 이미지 삭제
  const { deleteImageHandler } = useDeleteImage(setProduct, setImagesToDelete);

  // 상품 수정
  const { editProductHandler } = useUpdateProduct(
    user,
    params,
    product,
    imagesToDelete,
    setErrorProduct
  );

  // 상품 삭제
  const { deleteProductHandler } = useDeleteProduct(user, params, product);

  console.log(product);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <PageHeader title={"Product Deatail"} description={"description"} />

        {/* 사진 첨부 */}
        <section className="w-4/5 h-52 grid grid-cols-4 justify-center items-center gap-3 px-5 relative border mb-10">
          {product.productImage.map((image) => (
            <div key={image} className="w-full h-4/5 relative ">
              <div className="w-full h-full max-h-52 overflow-hidden">
                <img
                  src={image}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => deleteImageHandler(image)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
          ))}
          <AddImageButton />
          {errorProduct == "errorProductImage" ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorProduct]}
            </div>
          ) : null}
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
