import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetchProducts from "@/query/product/fetchProducts";
import ArrowRight from "@/assets/icon/ArrowRight.svg";
import MainImageContainer from "@/components/container/MainImageContainer";
import HomeProductContainer from "@/components/container/HomeProductContainer";
import SEOHelmet from "@/utils/SEOHelmet";

export default function Home() {
  const Classic = useQuery(
    ["product", "productCategory", "Classic", 8],
    fetchProducts
  );
  const Sports = useQuery(
    ["product", "productCategory", "Sports", 8],
    fetchProducts
  );
  const Adventure = useQuery(
    ["product", "productCategory", "Adventure", 8],
    fetchProducts
  );
  const Scooter = useQuery(
    ["product", "productCategory", "Scooter", 8],
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
            to={"/category/Classic"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Classic</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Classic.data} />
        </section>

        <section>
          <Link
            to={"/category/Sports"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Sports</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Sports.data} />
        </section>
        <section>
          <Link
            to={"/category/Adventure"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Adventure</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Adventure.data} />
        </section>

        <section>
          <Link
            to={"/category/Scooter"}
            className="w-fit flex text-left mb-2 ml-2"
          >
            <div className="flex items-center">
              <div>Scooter</div>
              <img src={ArrowRight} alt="ArrowRight" />
            </div>
          </Link>

          <HomeProductContainer products={Scooter.data} />
        </section>
      </main>
    </>
  );
}
