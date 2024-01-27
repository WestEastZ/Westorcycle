import { CircleUserRound, Heart, Home, Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function NavBar() {
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
      <Button className="">
        <CircleUserRound />
      </Button>
    </nav>
  );
}
