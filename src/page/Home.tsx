import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/userContext";
import { useQuery } from "react-query";
import fetchProducts from "@/firebase/fetch/fetchProducts";
import NavBar from "@/components/nav/NavBar";
import { ChevronRight } from "lucide-react";
import ProductContanierHome from "@/components/container/ProductContanierHome";

export default function Home() {
  const user = useUser();
  const navigate = useNavigate();

  const categoryA = useQuery(["product", "CategoryA"], fetchProducts);
  const categoryB = useQuery(["product", "CategoryB"], fetchProducts);
  const categoryC = useQuery(["product", "CategoryC"], fetchProducts);
  const categoryD = useQuery(["product", "CategoryD"], fetchProducts);

  return (
    <>
      <NavBar />

      <section className="w-full h-[50vh] bg-purple-300 mb-12">
        이미지 들어갈 곳입니다.
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
