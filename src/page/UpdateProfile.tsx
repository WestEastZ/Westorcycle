import PageHeader from "@/components/header/PageHeader";
import ModalPassword from "@/components/modal/ModalPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/userContext";
import useUpdatePassword from "@/hook/user/useUpdatePassword";
import useUpdateProfile from "@/hook/user/useUpdateProfile";
import SEOHelmet from "@/utils/SEOHelmet";
import { checkAuth } from "@/utils/checkAuth";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProfile() {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }

  const [newNickname, setNewNickname] = useState<string | undefined>(
    user?.nickname
  );

  // 프로필 편집
  const { UpdateUserMutation } = useUpdateProfile();

  // 비밀번호 재설정
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
  const modalHandler = () => {
    setOpenPasswordModal(!openPasswordModal);
  };

  const { updatePasswordMutation } = useUpdatePassword();

  const handlePasswordChange = (newPassword: string) => {
    updatePasswordMutation.mutate({ newPassword });
  };

  return (
    <div className="h-full">
      {/* header */}
      <SEOHelmet title="Profile" description="Manage your information" />

      {/* body  */}
      <PageHeader title={`Edit Profile`} description={`Edit your Profile`} />

      <div className="w-full h-px bg-slate-300 mb-8"></div>

      <main className="flex flex-col items-center gap-10">
        <form className="w-2/3 h-full flex flex-col gap-16 m-auto mt-28">
          {/* email */}
          <section>
            <label htmlFor="email" className="text-left hidden">
              Email
            </label>
            <Input value={user?.email} id="email" disabled />
          </section>

          {/* nickname */}
          <section>
            <label htmlFor="nickname" className="text-left hidden">
              Nickname
            </label>
            <Input
              value={newNickname}
              id="nickname"
              onChange={(e) => setNewNickname(e.target.value)}
            />
          </section>
        </form>
        {/* button  */}
        <section className="flex w-2/3 gap-10">
          <Button onClick={() => UpdateUserMutation.mutate({ newNickname })}>
            Edit
          </Button>
          <Button onClick={modalHandler}>Edit Password</Button>
        </section>

        {openPasswordModal ? (
          <ModalPassword
            onClose={modalHandler}
            onChangePassword={handlePasswordChange}
          />
        ) : null}
      </main>
    </div>
  );
}
