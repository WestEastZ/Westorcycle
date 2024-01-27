import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useUser } from "@/contexts/userContext";
import NavBar from "@/components/navBar/navBar";

export default function Home() {
  const user = useUser();
  const navigate = useNavigate();

  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signOut(auth);

    console.log(user);
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <h2>Home</h2>
      {user ? (
        <>
          {" "}
          <div>hello {user?.nickname}</div>
          <Button onClick={Logout}>로그아웃</Button>
        </>
      ) : (
        <>
          {" "}
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </>
  );
}
