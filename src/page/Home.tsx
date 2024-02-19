import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetchProducts from "@/query/product/fetchProducts";
import ArrowRight from "@/assets/icon/ArrowRight.svg";
import MainImageContainer from "@/components/container/MainImageContainer";
import HomeProductContainer from "@/components/container/HomeProductContainer";
import SEOHelmet from "@/utils/SEOHelmet";

export default function Home() {
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

  return (
    <>
      {/* header */}
      <SEOHelmet
        title="Home"
        description="We sell motorcycle-related products at reasonable prices."
      />

      {/* body */}
      <header className="relative w-full h-[30rem] mb-16">
        <div className="absolute flex flex-col gap-5 text-left w-1/2 h-1/4 top-32 left-20 text-4xl z-10">
          <div>Men will fight</div>
          <div>long and hard for</div>
          <div>a bit of colored ribbon.</div>
        </div>

        <MainImageContainer />
      </header>

      <main className="flex flex-col gap-10">
        <section>
          <Link
            to={"/category/Motorcycle"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Motorcycle</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Motorcycle.data} />
        </section>

        <section>
          <Link
            to={"/category/Helmet"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Helmet</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Helmet.data} />
        </section>
        <section>
          <Link
            to={"/category/Clothes"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Clothes</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Clothes.data} />
        </section>

        <section>
          <Link
            to={"/category/Gloves"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Gloves</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Gloves.data} />
        </section>
      </main>
    </>
  );
}
