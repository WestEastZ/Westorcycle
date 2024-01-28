import { CircleUserRound, Heart, Home, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/userContext";

export default function NavBar() {
  const user = useUser();

  return (
    <nav className="">
      <Button className="">
        <Menu />
      </Button>
      <Button className="">
        <Home />
      </Button>
      <Button className="">
        <Heart />
      </Button>

      <Link
        to={
          user?.isSeller
            ? `/seller/${user.nickname}`
            : `/consumer/${user?.nickname}`
        }
      >
        <Button className="">
          <CircleUserRound />
        </Button>
      </Link>
    </nav>
  );
}
