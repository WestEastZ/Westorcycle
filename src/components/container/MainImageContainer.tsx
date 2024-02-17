import { Helmet } from "react-helmet";
import main from "@/assets/image/mainTest.webp";

export default function MainImageContainer() {
  return (
    <div className="h-[30rem] bg-[#141414]">
      <Helmet>
        <link rel="preload" as="image" href={main} />
      </Helmet>
      <img src={main} alt="오토바이" className="w-full h-full object-cover" />
    </div>
  );
}
