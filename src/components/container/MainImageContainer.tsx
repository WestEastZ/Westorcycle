import main from "@/assets/image/mainImage.webp";
import { Helmet } from "react-helmet-async";

export default function MainImageContainer() {
  return (
    <div className="h-[30rem] bg-[#141414]">
      <Helmet>
        <link rel="preload" as="image" href={main} />
      </Helmet>
      <img
        src={main}
        alt="오토바이"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
