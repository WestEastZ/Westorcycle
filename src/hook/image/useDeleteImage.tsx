import { ProductWithId } from "@/models/type";

export default function useDeleteImage(
  setProduct: (
    value: ProductWithId | ((prevState: ProductWithId) => ProductWithId)
  ) => void,
  setImagesToDelete: (
    value: string[] | ((prevState: string[]) => string[])
  ) => void
) {
  // 삭제할 이미지를 저장
  const deleteImageHandler = async (imageUrl: string) => {
    setImagesToDelete((prev) => [...prev, imageUrl]);

    setProduct((prev: ProductWithId) => ({
      ...prev,
      productImage: prev.productImage.filter(
        (prevImageUrl: string) => prevImageUrl !== imageUrl
      ),
    }));
  };
  return { deleteImageHandler };
}
