import { db } from "@/firebase";
import { ProductWithId } from "@/models/type";
import { doc, getDoc } from "firebase/firestore";

export default async function fetchProduct({
  queryKey,
}: {
  queryKey: unknown[];
}) {
  const [_key, productId] = queryKey as [string, string];

  try {
    if (productId) {
      const docRef = doc(db, _key, productId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const product: ProductWithId = {
          docId: docSnapshot.id,
          id: data?.id,
          sellerId: data?.sellerId,
          productName: data?.productName,
          productPrice: data?.productPrice,
          productQuantity: data?.productQuantity,
          productDescription: data?.productDescription,
          productCategory: data?.productCategory,
          productImage: data?.productImage,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
        };
        return product;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
