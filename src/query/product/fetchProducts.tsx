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
  const [_key, field_key, value, count] = queryKey as [
    string,
    string,
    string,
    number
  ];

  try {
    let collectionRef = collection(db, _key);
    let q;

    if (value !== undefined) {
      q = query(
        collectionRef,
        where(field_key, "==", value),
        orderBy("updatedAt", "desc")
      );
    } else {
      q = query(collectionRef, orderBy("updatedAt", "desc"));
    }

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
