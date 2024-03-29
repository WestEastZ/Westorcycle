import AddImageButton from "@/components/button/AddImageButton";
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

import Close from "@/assets/icon/Close.svg";
import SEOHelmet from "@/utils/SEOHelmet";
import { useNavigate, useParams } from "react-router";
import { checkAuth } from "@/utils/checkAuth";
import Alert from "@/components/modal/Alert";

export default function AddProduct() {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  console.log(imagesToDelete);

  const [errorProduct, setErrorProduct] = useState<string | null>("");

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
  const { onChangeInput } = useChangeInput(
    user as UserType,
    product,
    setProduct
  );

  // 이미지 등록
  const { addImageHandler } = useUploadImage(
    user as UserType,
    setProduct,
    setErrorProduct
  );

  // 이미지 삭제
  const { deleteImageHandler } = useDeleteImage(setProduct, setImagesToDelete);

  // 상품 등록
  const { addProductHandler, pathUrl, bodyText } = useAddProduct(
    user as UserType,
    product,
    setErrorProduct,
    setOpenAlert
  );

  return (
    <>
      {/* header */}
      <SEOHelmet title={`Add Product`} description="Add your product." />

      {/* body  */}
      <div className="w-full flex flex-col justify-center items-center">
        {/* 안내문구 */}
        <PageHeader
          title={"Add Product"}
          description={"Please add the product"}
        />

        {/* 사진 첨부 */}
        <main className="w-4/5 h-52 grid grid-cols-4 items-center gap-3 px-5 relative border mb-10">
          {product.productImage.map((image) => (
            <section key={image} className="w-full h-4/5 max-h-52 relative ">
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
                <div>
                  <img src={Close} alt="Close" width={20} height={20} />
                </div>
              </button>
            </section>
          ))}
          <AddImageButton />
          {errorProduct == "errorProductImage" ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorProduct]}
            </div>
          ) : null}
        </main>

        {/* 입력 */}
        <FormProduct
          onChangeInput={onChangeInput}
          addImageHandler={addImageHandler}
          product={product}
          setProduct={setProduct}
          addProductHandler={addProductHandler}
          errorCode={errorProduct}
        />

        {openAlert && (
          <Alert>
            <Alert.Content>
              <Alert.Header header="Add Product" />
              <Alert.Body bodyText={bodyText} />
              <Alert.Footer pathUrl={pathUrl} />
            </Alert.Content>
          </Alert>
        )}
      </div>
    </>
  );
}
