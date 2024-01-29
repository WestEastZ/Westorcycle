import { Link } from "react-router-dom";
import { useUser } from "@/contexts/userContext";

export default function NavBar() {
  const user = useUser();

  return (
    <nav className="sticky w-full h-12 px-10 flex justify-between items-center top-0 border-b border-black bg-custom">
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
                  ? `/seller/${user.nickname}`
                  : `/consumer/${user?.nickname}`
              }
              className="under-line"
            >
              Profile
            </Link>
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
  );
}
