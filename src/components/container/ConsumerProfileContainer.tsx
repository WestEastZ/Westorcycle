import { Link } from "react-router-dom";
import ArrowRight from "@/assets/icon/ArrowRight.svg";

interface ConsumerProfileContainerProp {
  path: string;
  title: string;
  discription: string;
}

export default function ConsumerProfileContainer({
  path,
  title,
  discription,
}: ConsumerProfileContainerProp) {
  return (
    <section className="flex flex-col items-start hover:scale-110 duration-200">
      <Link to={path} className="text-custom text-3xl">
        <div className="flex items-center">
          <div>{title}</div>
          <img src={ArrowRight} alt="ArrowRight" width="32px" height="32px" />
        </div>
      </Link>
      <div className="text-sm text-gray-400">{discription}</div>
    </section>
  );
}
