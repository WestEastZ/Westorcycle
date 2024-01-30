import AddImageButton from "@/components/button/AddImageButton";
import CaroselImage from "@/components/carosel/CaroselImage";
import FormProduct from "@/components/form/FormProduct";
import PageHeader from "@/components/header/PageHeader";
import NavBar from "@/components/navBar/navBar";

import { useUser } from "@/contexts/userContext";
import { db, storage } from "@/firebase";
import { Product } from "@/models/type";
import { validateProduct } from "@/utils/validation";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const user = useUser();
  const navigate = useNavigate();
  const [selectImage, setSelectImage] = useState<string[]>([]);
  const [errorProduct, setErrorProduct] = useState<string>("");

  // 상품 상태
  const [product, setProduct] = useState<Product>({
    id: Date.now(),
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

  // 이미지 파일 선택
  const addImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const selectImgList = event.target.files; // 선택된 파일 리스트
      if (selectImgList) {
        const promises = [];

        for (let i = 0; i < selectImgList.length; i++) {
          const selectImgFile = selectImgList[i];
          const imgRef = ref(storage, `${user?.id}/${selectImgFile.name}`);
          const uploadPromise = await uploadBytes(imgRef, selectImgFile).then(
            () => getDownloadURL(imgRef)
          );
          promises.push(uploadPromise);
        }
        const downloadImgURL = await Promise.all(promises);
        setSelectImage(downloadImgURL);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImage: selectImage,
    }));
  }, [selectImage]);

  // 상품 등록
  const addProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // 상품등록 유효성 검사
    const checkProduct = validateProduct(product);

    if (checkProduct) {
      setErrorProduct(checkProduct);
      console.log(checkProduct);
      return;
    }

    try {
      const productRef = doc(collection(db, "product"));
      await setDoc(productRef, product);

      navigate(`/seller/${user?.nickname}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center">
        {/* 안내문구 */}
        <PageHeader
          title={"Add Product"}
          description={"Please add the product"}
        />

        {/* 사진 첨부 */}
        <section className="w-1/2 h-96 relative mb-10">
          {product.productImage.length == 0 ? (
            <div className="w-full h-96 border bg-white"></div>
          ) : (
            <CaroselImage product={product} />
          )}
          <AddImageButton />
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
