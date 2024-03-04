import { useMutation } from "react-query";
import { db } from "@/firebase";
import { ProductWithId, UserType } from "@/models/type";
import { validateProduct } from "@/utils/validation";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function useAddProduct(
  user: UserType,
  product: ProductWithId,
  setErrorProduct: (value: string) => void,
  setOpenAlert: (value: boolean) => void
) {
  const [pathUrl, setPathurl] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");

  const addProductMutation = useMutation(
    async (product: ProductWithId) => {
      // 상품등록 유효성 검사
      const checkProduct = validateProduct(product);

      if (checkProduct) {
        setErrorProduct(checkProduct);
        console.log(checkProduct);
        // return;
        throw new Error(checkProduct);
      }

      const productRef = doc(collection(db, "product"));
      product.docId = productRef.id;
      product.id = productRef.id;
      await setDoc(productRef, product);

      return productRef.id;
    },
    {
      onSuccess: () => {
        setOpenAlert(true);
        setPathurl(`/seller/${user?.id}`);
        setBodyText("The product has been added");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // 상품 등록
  const addProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    addProductMutation.mutate(product);
  };

  return { addProductHandler, pathUrl, bodyText };
}
