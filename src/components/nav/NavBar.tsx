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
      <nav className="sticky w-full h-12 flex items-center top-0 z-30 text-custom p-8 bg-main">
        <div className="flex items-center gap-12">
          <Link to={"/"} className="under-line text-custom text-3xl">
            WESTORCYCLE
          </Link>

          <Link to={"/category"} className="under-line text-custom text-sm">
            Cartegory
          </Link>

          {user ? (
            <>
              {/* <Link
                to={`/cart/${user.id}`}
                className="under-line text-custom text-sm"
              >
                Cart
              </Link> */}
              <Link
                to={
                  user?.isSeller
                    ? `/seller/${user.id}`
                    : `/consumer/${user?.id}`
                }
                className="under-line text-custom text-sm"
              >
                Profile
              </Link>
              <button
                onClick={Logout}
                className="under-line text-custom text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="under-line text-custom text-sm">
                Login
              </Link>
              <Link to={"/signup"} className="under-line text-custom text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
