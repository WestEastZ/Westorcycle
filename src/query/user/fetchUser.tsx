import { db } from "@/firebase";
import { UserType } from "@/models/type";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

export default async function fetchUser({ queryKey }: { queryKey: unknown[] }) {
  const [_key, userId] = queryKey as [string, string];

  try {
    let q = query(collection(db, _key), where("id", "==", userId));

    const qSnapshot = await getDocs(q);

    const user = qSnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data } as UserType;
    })[0];

    return user;
  } catch (error) {
    console.log(error);
  }
}
