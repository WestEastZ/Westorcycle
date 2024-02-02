import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/userContext";
import { useQuery } from "react-query";
import fetchProducts from "@/firebase/fetch/fetchProducts";
import NavBar from "@/components/nav/NavBar";
import { ChevronRight } from "lucide-react";
import ProductContanierHome from "@/components/container/ProductContanierHome";
import mainBg from "@/assets/image/main.jpeg";
import CaroselMain from "@/components/carosel/CaroselMain";

export default function Home() {
  const user = useUser();
  const navigate = useNavigate();

  const categoryA = useQuery(
    ["product", "productCategory", "CategoryA"],
    fetchProducts
  );
  const categoryC = useQuery(
    ["product", "productCategory", "CategoryC"],
    fetchProducts
  );
  const categoryD = useQuery(
    ["product", "productCategory", "CategoryD"],
    fetchProducts
  );
  const categoryB = useQuery(
    ["product", "productCategory", "CategoryB"],
    fetchProducts
  );

  return (
    <>
      <section className="relative w-full h-[50vh] mb-12">
        <div className="absolute flex flex-col gap-5 text-left w-1/2 h-1/4 top-32 left-20 text-4xl z-10">
          <div>Men will fight</div>
          <div>long and hard for</div>
          <div>a bit of colored ribbon.</div>
        </div>

        <CaroselMain />
      </section>

      <section className="flex flex-col gap-10">
        <section>
          <Link to={"/"} className="w-fit flex text-left mb-2 ml-2">
            <div>카테고리 A</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={categoryA.data} />
        </section>

        <section>
          <Link to={"/"} className="w-fit flex text-left mb-2 ml-2">
            <div>카테고리 B</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={categoryB.data} />
        </section>
        <section>
          <Link to={"/"} className="w-fit flex text-left mb-2 ml-2">
            <div>카테고리 C</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={categoryC.data} />
        </section>

        <section>
          <Link to={"/"} className="w-fit flex text-left mb-2 ml-2">
            <div>카테고리 D</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={categoryD.data} />
        </section>
      </section>
    </>
  );
}
