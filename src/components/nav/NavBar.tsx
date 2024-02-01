import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/userContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function NavBar() {
  const user = useUser();
  const navigate = useNavigate();

  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signOut(auth);

    navigate("/");
  };

  return (
    <>
      <nav className="sticky w-full h-12 px-10 flex justify-between items-center top-0 z-50">
        <div>
          <Link to={"/"} className="under-line">
            Home
          </Link>
        </div>

        <div className="flex gap-12">
          <Link to={"/"} className="under-line">
            Cartegory
          </Link>

          {user ? (
            <>
              <Link to={"/"} className="under-line">
                Favorite
              </Link>
              <Link
                to={
                  user?.isSeller
                    ? `/seller/${user.id}`
                    : `/consumer/${user?.id}`
                }
                className="under-line"
              >
                Profile
              </Link>
              <button onClick={Logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="under-line">
                Login
              </Link>
              <Link to={"/signup"} className="under-line">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
