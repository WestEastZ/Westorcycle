import { useMutation } from "react-query";
import { db } from "@/firebase";
import { ProductWithId, UserType } from "@/models/type";
import { validateProduct } from "@/utils/validation";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function useAddProduct(
  user: UserType,
  product: ProductWithId,
  setErrorProduct: (value: string) => void
) {
  const navigate = useNavigate();

  const addProductMutation = useMutation(
    async (product: ProductWithId) => {
      // 상품등록 유효성 검사
      const checkProduct = validateProduct(product);

      if (checkProduct) {
        setErrorProduct(checkProduct);
        console.log(checkProduct);
        return;
      }

      const productRef = doc(collection(db, "product"));
      product.docId = productRef.id;
      product.id = productRef.id;
      await setDoc(productRef, product);

      return productRef.id;
    },
    {
      onSuccess: () => {
        navigate(`/seller/${user?.id}`);
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

  return { addProductHandler };
}
