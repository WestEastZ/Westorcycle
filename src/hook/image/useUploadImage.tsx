import React from "react";
import { useMutation } from "react-query";
import { storage } from "@/firebase";
import imageCompression from "browser-image-compression";
import { ProductWithId, UserType } from "@/models/type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { validateProduct } from "@/utils/validation";

export default function useUploadImage(
  user: UserType,
  setProduct: (
    value: ProductWithId | ((prevState: ProductWithId) => ProductWithId)
  ) => void,
  setErrorProduct: (value: string | null) => void
) {
  // 이미지 업로드 mutation
  const addImageMutation = useMutation(
    async (fileList: FileList) => {
      const promises = [];

      // 모든 이미지 파일
      for (let i = 0; i < fileList.length; i++) {
        const timestamp = Date.now();
        const selectImgFile = fileList[i];

        // 이미지 압축
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1092,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(selectImgFile, options);

        const imgRef = ref(
          storage,
          `${user?.id}/${compressedFile.name}/${timestamp}`
        );

        // 이미지 파일을 Firebase Storage에 업로드하고 다운로드 URL을 얻는 프로미스 생성
        const uploadPromise = uploadBytes(imgRef, compressedFile).then(() =>
          getDownloadURL(imgRef)
        );
        promises.push(uploadPromise);
      }

      // 모든 프로미스가 완료될 때까지 기다린 후 다운로드 URL 목록을 반환
      return await Promise.all(promises);
    },
    {
      // 업로드가 성공하면 다운로드 URL을 상품 이미지 URL 목록에 추가
      onSuccess: (downloadImgURL) => {
        setProduct((prev: ProductWithId) => ({
          ...prev,
          productImage: [...prev.productImage, ...downloadImgURL],
        }));
        setErrorProduct(null);
      },
      // 업로드가 실패하면 오류 출력
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // 이미지 파일 선택 핸들러
  const addImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const selectImgList = event.target.files; // 선택된 파일 리스트

    if (selectImgList) {
      // 이미지 최대 4개까지 제한
      if (selectImgList.length > 4) {
        alert("이미지는 최대 4개까지만 업로드할 수 있습니다.");
        return;
      }

      // 선택된 파일 리스트를 이미지 업로드 mutation에 전달
      addImageMutation.mutate(selectImgList);
    }
  };

  return { addImageHandler };
}
