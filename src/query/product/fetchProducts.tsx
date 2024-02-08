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
  queryKey: unknown[];
}) {
  const [_key, field_key, vlaue, count] = queryKey as [
    string,
    string,
    string,
    number
  ];

  try {
    let q = query(
      collection(db, _key),
      where(field_key, "==", vlaue),
      orderBy("updatedAt", "desc")
    );

    if (count) {
      q = query(q, limit(count));
    }

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
