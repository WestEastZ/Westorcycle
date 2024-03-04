import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { AlertInfoType } from "@/page/seller/ManageProduct";
import { getAuth, updatePassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useMutation } from "react-query";

export default function useUpdatePassword(
  modalHandler: (value: boolean) => void,
  setOpenAlert: (value: boolean) => void,
  setAlertInfo: (value: AlertInfoType) => void
) {
  const { user } = useUser() || {};
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const updatePasswordHandler = async ({
    newPassword,
  }: {
    newPassword: string;
  }) => {
    try {
      if (currentUser) {
        let q = query(collection(db, "user"), where("id", "==", user?.id));
        const qSnapshot = await getDocs(q);

        qSnapshot.forEach(async (docs) => {
          const docRef = doc(db, "user", docs.id);
          await updateDoc(docRef, {
            password: newPassword,
          });
        });

        await updatePassword(currentUser, newPassword);
        await currentUser.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePasswordMutation = useMutation(updatePasswordHandler, {
    onSuccess: () => {
      modalHandler(false);
      setOpenAlert(true);
      setAlertInfo({
        header: "Updated Password",
        bodyText: "The password has been updated",
        pathUrl: `/${user?.isSeller ? "seller" : "consumer"}/${user?.id}`,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { updatePasswordMutation };
}
