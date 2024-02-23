import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function useUpdateProfile() {
  const { user } = useUser() || {};
  const navigate = useNavigate();

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
      navigate(`/${user?.isSeller ? "seller" : "consumer"}/${user?.id}`);
    },
  });
  return { UpdateUserMutation };
}
