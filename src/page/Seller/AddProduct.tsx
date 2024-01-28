import { useUser } from "@/contexts/userContext";
import { db, storage } from "@/firebase";
import { Product } from "@/models/type";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";

export default function AddProduct() {
  const user = useUser();
  const [selectImage, setSelectImage] = useState<string[]>([]);

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
  const onChange = (
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
  const addProductHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      const productRef = doc(collection(db, "product"));
      await setDoc(productRef, product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {product.productImage.map((url) => (
          <div className="bg-slate-200">
            <img src={url} alt="이미지를 올려주세요잉" />
          </div>
        ))}
      </div>
      <form>
        <label htmlFor="inputFile">Add your Image</label>
        <input
          type="file"
          id="inputFile"
          name="productImage"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={addImageHandler}
          required
        />
        <input
          type="text"
          placeholder="상품 이름"
          name="productName"
          className="border-spacing-3 border-2"
          onChange={onChange}
          required
        />
        <input
          type="number"
          placeholder="상품 가격"
          name="productPrice"
          className="border-spacing-3 border-2"
          onChange={onChange}
          required
        />
        <input
          type="number"
          placeholder="상품 수량"
          name="productQuantity"
          className="border-spacing-3 border-2"
          onChange={onChange}
          required
        />
        <textarea
          placeholder="상품 설명"
          name="productDescription"
          className="border-spacing-3 border-2"
          onChange={onChange}
          required
        ></textarea>
        <input
          type="text"
          placeholder="상품 카테고리"
          name="productCategory"
          className="border-spacing-3 border-2"
          onChange={onChange}
          required
        />
        <button onClick={addProductHandler}>상품 등록</button>
      </form>
    </>
  );
}
