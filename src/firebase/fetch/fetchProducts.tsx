import { db } from "@/firebase";
import { Product, ProductWithId } from "@/models/type";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default async function fetchProducts({
  queryKey,
}: {
  queryKey: string[];
}) {
  const [_key, vlaue] = queryKey;

  try {
    let q = query(
      collection(db, _key),
      where("productCategory", "==", vlaue),
      orderBy("updatedAt", "desc"),
      limit(4)
    );

    const qSnapshot = await getDocs(q);

    const products = qSnapshot.docs.map((doc) => {
      const product = doc.data() as Product;
      return { docId: doc.id, ...product } as ProductWithId;
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}
