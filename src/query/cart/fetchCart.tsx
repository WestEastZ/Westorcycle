import { db } from "@/firebase";
import { CartType } from "@/models/type";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function fetchCart({ queryKey }: { queryKey: unknown[] }) {
  const [_key, user] = queryKey as [string, string];
  try {
    if (user) {
      let q = query(collection(db, _key), where("userId", "==", user));

      const qSnapshot = await getDocs(q);

      const cartItems = qSnapshot.docs.map((doc) => {
        const cartItem = doc.data() as CartType;
        return { ...cartItem } as CartType;
      });

      return cartItems;
    }
  } catch (error) {
    console.log(error);
  }
}
