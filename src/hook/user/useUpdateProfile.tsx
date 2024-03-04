import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { AlertInfoType } from "@/page/seller/ManageProduct";
import { doc, updateDoc } from "firebase/firestore";
import { useMutation } from "react-query";

export default function useUpdateProfile(
  setOpenAlert: (value: boolean) => void,
  setAlertInfo: (value: AlertInfoType) => void
) {
  const { user } = useUser() || {};

  const UpdateUserHandler = async ({
    newNickname,
  }: {
    newNickname: string | undefined;
  }) => {
    if (newNickname === undefined || newNickname.length < 3) {
      alert("닉네임이 중복 또는 짧습니다.");
      return;
    }

    try {
      if (user?.id) {
        const docRef = doc(db, "user", user?.id);
        await updateDoc(docRef, {
          nickname: newNickname,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserMutation = useMutation(UpdateUserHandler, {
    onSuccess: () => {
      setOpenAlert(true);
      setAlertInfo({
        header: "Update Nickname",
        bodyText: "The nickname has been updated",
        pathUrl: `/${user?.isSeller ? "seller" : "consumer"}/${user?.id}`,
      });
    },
  });
  return { UpdateUserMutation };
}
