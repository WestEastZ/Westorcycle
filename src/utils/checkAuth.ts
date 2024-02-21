import { UserType } from "@/models/type";

type CheckUser = {
  user: UserType | null;
  paramsId: string | undefined;
  navigate: (path: string) => void;
};

export const checkAuth = ({ user, paramsId, navigate }: CheckUser) => {
  if (user?.id !== paramsId) {
    console.log("Sdsdsd");
    navigate("/");
    return null;
  }
  return true;
};
