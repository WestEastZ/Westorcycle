import AddImageButton from "@/components/button/AddImageButton";
import FormProduct from "@/components/form/FormProduct";
import PageHeader from "@/components/header/PageHeader";

import { useUser } from "@/contexts/userContext";
import useChangeInput from "@/hook/useChangeInput";
import useDeleteProduct from "@/hook/product/useDeleteProduct";
import useUploadImage from "@/hook/image/useUploadImage";
import useUpdateProduct from "@/hook/product/useUpdateProduct";
import { UserType } from "@/models/type";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import useDeleteImage from "@/hook/image/useDeleteImage";
import { ERROR_MESSAGES } from "@/utils/validation";
import useFetchProduct from "@/hook/product/useFetchProduct";

import Close from "@/assets/icon/Close.svg";
import SEOHelmet from "@/utils/SEOHelmet";
import { checkAuth } from "@/utils/checkAuth";
import Alert from "@/components/modal/Alert";

export type ParamsType = {
  productId?: string;
};

export type AlertInfoType = {
  header: string;
  bodyText: string;
  pathUrl: string;
};

export default function ManageProduct() {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const { productId } = params;
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfoType>({
    header: "",
    bodyText: "",
    pathUrl: "",
  });

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [errorProduct, setErrorProduct] = useState<string | null>("");

  // 상품 조회 -> client
  const { product, setProduct } = useFetchProduct(productId as string);

  // 상품 상태 변경 -> client
  const { onChangeInput } = useChangeInput(
    user as UserType,
    product,
    setProduct
  );

  // 이미지 업로드 -> client
  const { addImageHandler } = useUploadImage(
    user as UserType,
    setProduct,
    setErrorProduct
  );

  // 이미지 삭제 -> client
  const { deleteImageHandler } = useDeleteImage(setProduct, setImagesToDelete);

  // 상품 수정 -> query
  const { editProductHandler } = useUpdateProduct(
    params,
    product,
    imagesToDelete,
    setErrorProduct,
    setOpenAlert,
    setAlertInfo
  );

  // 상품 삭제
  const { deleteProductMutation } = useDeleteProduct(
    user as UserType,
    params,
    product,
    setOpenAlert,
    setAlertInfo
  );

  return (
    <>
      {/* header */}
      <SEOHelmet title={`Update Product`} description="Update your product." />

      {/* body  */}
      <main className="w-full flex flex-col justify-center items-center pt-10">
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
                <div>
                  <img src={Close} alt="Close" width={20} height={20} />
                </div>
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
          deleteProductHandler={deleteProductMutation.mutate}
          editProductHandler={editProductHandler}
          errorCode={errorProduct}
        />

        {openAlert && (
          <Alert>
            <Alert.Content>
              <Alert.Header header="Add Product" />
              <Alert.Body bodyText={alertInfo.bodyText} />
              <Alert.Footer pathUrl={alertInfo.pathUrl} />
            </Alert.Content>
          </Alert>
        )}
      </main>
    </>
  );
}
