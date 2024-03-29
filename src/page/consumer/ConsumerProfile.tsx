import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/header/PageHeader";
import { useUser } from "@/contexts/userContext";
import SEOHelmet from "@/utils/SEOHelmet";
import { checkAuth } from "@/utils/checkAuth";
import ProfileLinkContainer from "@/components/container/ProfileLinkContainer";

export default function ConsumerProfile() {
  const { user } = useUser() || {};
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();

  // 본인 확인
  if (user) {
    if (!checkAuth({ user, paramsId, navigate })) return null;
  }
  return (
    <>
      {/* header */}
      <SEOHelmet title="Profile" description="Manage your information" />

      {/* body  */}
      <PageHeader
        title={`${user?.nickname}`}
        description={`Manage your account information`}
      />

      <div className="w-full h-px bg-slate-300 mb-8"></div>

      <main className="flex flex-col justify-start items-start gap-24 mt-20 ml-10">
        <ProfileLinkContainer
          path={`/editprofile/${user?.id}`}
          title={"Edit Profile"}
          discription={"Edit your Profile"}
        />
        <ProfileLinkContainer
          path={`/cart/${user?.id}`}
          title={"My Cart"}
          discription={"Manage your Cart"}
        />
        <ProfileLinkContainer
          path={`/purchase/${user?.id}`}
          title={"My Order"}
          discription={"Manage your Order"}
        />
      </main>
    </>
  );
}
