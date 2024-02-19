import SEOHelmet from "@/utils/SEOHelmet";
import { Link } from "react-router-dom";

export default function Category() {
  return (
    <>
      {/* header */}
      <SEOHelmet
        title={`Product Category`}
        description="Check out the various categories."
      />

      {/* body  */}
      <main>
        <Link to={`/category/Motorcycle`}>Motorcycle</Link>
        <Link to={`/category/Helmet`}>Helmet</Link>
        <Link to={`/category/Clothes`}>Clothes</Link>
        <Link to={`/category/Gloves`}>Gloves</Link>
      </main>
    </>
  );
}
