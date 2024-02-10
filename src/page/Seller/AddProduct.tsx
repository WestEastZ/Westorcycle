import AddImageButton from "@/components/button/AddImageButton";
import CaroselImage from "@/components/container/DetailImage";
import FormProduct from "@/components/form/FormProduct";
import PageHeader from "@/components/header/PageHeader";

import { useUser } from "@/contexts/userContext";
import useAddProduct from "@/hook/product/useAddProduct";
import useChangeInput from "@/hook/useChangeInput";
import useUploadImage from "@/hook/image/useUploadImage";
import { ProductWithId, UserType } from "@/models/type";
import { ERROR_MESSAGES } from "@/utils/validation";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import useDeleteImage from "@/hook/image/useDeleteImage";
import { X } from "lucide-react";

export default function AddProduct() {
  const user = useUser() as UserType;

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [errorProduct, setErrorProduct] = useState<string>("");

  // 상품 상태
  const [product, setProduct] = useState<ProductWithId>({
    docId: "",
    id: "",
    sellerId: "",
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productDescription: "",
    productCategory: "",
    productImage: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // 상품 상태 변경
  const { onChangeInput } = useChangeInput(user, product, setProduct);

  // 이미지 등록
  const { addImageHandler } = useUploadImage(user, product, setProduct);

  // 이미지 삭제
  const { deleteImageHandler } = useDeleteImage(setProduct, setImagesToDelete);

  // 상품 등록
  const { addProductHandler } = useAddProduct(user, product, setErrorProduct);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        {/* 안내문구 */}
        <PageHeader
          title={"Add Product"}
          description={"Please add the product"}
        />

        {/* 사진 첨부 */}
        <section className="w-4/5 h-52 grid grid-cols-4 items-center gap-3 px-5 relative border mb-10">
          {product.productImage.map((image) => (
            <div key={image} className="w-full h-4/5 max-h-52 relative ">
              <div className="w-full h-full overflow-hidden">
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

        {/* 입력 */}
        <FormProduct
          onChangeInput={onChangeInput}
          addImageHandler={addImageHandler}
          product={product}
          setProduct={setProduct}
          addProductHandler={addProductHandler}
          errorCode={errorProduct}
        />
      </div>
    </>
  );
}
