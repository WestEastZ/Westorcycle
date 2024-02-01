import { storage } from "@/firebase";
import { Product, UserType } from "@/models/type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";

export default function useImageUpload(
  user: UserType,
  initialProduct: Product,
  setProduct: (value: Product) => void
) {
  // const [product, setProduct] = useState<Product>(initialProduct);

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
        setProduct({ ...initialProduct, productImage: downloadImgURL });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { addImageHandler };
}
