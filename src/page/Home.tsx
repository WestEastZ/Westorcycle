import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useUser } from "@/contexts/userContext";
import NavBar from "@/components/navBar/navBar";
import useFetchProductsByCategory from "@/hook/useFetchProducts";

export default function Home() {
  const user = useUser();
  const navigate = useNavigate();

  const categoryA = useFetchProductsByCategory("CategoryA");
  const categoryB = useFetchProductsByCategory("CategoryB");
  const categoryC = useFetchProductsByCategory("CategoryC");
  const categoryD = useFetchProductsByCategory("CategoryD");

  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <section className="w-full h-[50vh] bg-purple-300">
        이미지 들어갈 곳입니다.
      </section>
      {user ? (
        <>
          <div>hello {user?.nickname}</div>
          <Button onClick={Logout}>로그아웃</Button>
        </>
      ) : null}
      <div>카테고리 A</div>
      {categoryA.productsByCategory.map((data) => (
        <div key={data.docId} className="bg-slate-400">
          <div>{data.productName}</div>
          <div>{data.productPrice}</div>
        </div>
      ))}
      <div>카테고리 B</div>
      {categoryB.productsByCategory.map((data) => (
        <div key={data.docId} className="bg-red-400">
          <div>{data.productName}</div>
          <div>{data.productPrice}</div>
        </div>
      ))}
      <div>카테고리 C</div>
      {categoryC.productsByCategory.map((data) => (
        <div key={data.docId} className="bg-yellow-600">
          <div>{data.productName}</div>
          <div>{data.productPrice}</div>
        </div>
      ))}
      <div>카테고리 D</div>
      {categoryD.productsByCategory.map((data) => (
        <div key={data.docId} className="bg-blue-300">
          <div>{data.productName}</div>
          <div>{data.productPrice}</div>
        </div>
      ))}
    </>
  );
}
