import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/userContext";
import { useQuery } from "react-query";
import fetchProducts from "@/query/product/fetchProducts";
import { ChevronRight } from "lucide-react";
import ProductContanierHome from "@/components/container/ProductContanierHome";
import CaroselMain from "@/components/carosel/CaroselMain";

export default function Home() {
  const user = useUser();
  const navigate = useNavigate();

  const Motorcycle = useQuery(
    ["product", "productCategory", "Motorcycle", 8],
    fetchProducts
  );
  const Helmet = useQuery(
    ["product", "productCategory", "Helmet", 8],
    fetchProducts
  );
  const Clothes = useQuery(
    ["product", "productCategory", "Clothes", 8],
    fetchProducts
  );
  const Gloves = useQuery(
    ["product", "productCategory", "Gloves", 8],
    fetchProducts
  );

  console.log(Motorcycle.data);

  return (
    <>
      <section className="relative w-full h-96 mb-40">
        <div className="absolute flex flex-col gap-5 text-left w-1/2 h-1/4 top-32 left-20 text-4xl z-10">
          <div>Men will fight</div>
          <div>long and hard for</div>
          <div>a bit of colored ribbon.</div>
        </div>

        <CaroselMain />
      </section>

      <section className="flex flex-col gap-10">
        <section>
          <Link
            to={"/category/Motorcycle"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div>Motorcycle</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={Motorcycle.data} />
        </section>

        <section>
          <Link
            to={"/category/Helmet"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div>Helmet</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={Helmet.data} />
        </section>
        <section>
          <Link
            to={"/category/Clothes"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div>Clothes</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={Clothes.data} />
        </section>

        <section>
          <Link
            to={"/category/Gloves"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div>Gloves</div>
            <ChevronRight />
          </Link>

          <ProductContanierHome products={Gloves.data} />
        </section>
      </section>
    </>
  );
}
