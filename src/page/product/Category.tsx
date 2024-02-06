import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div>
      <Link to={`/category/Motorcycle`}>Motorcycle</Link>
      <Link to={`/category/Helmet`}>Helmet</Link>
      <Link to={`/category/Clothes`}>Clothes</Link>
      <Link to={`/category/Gloves`}>Gloves</Link>
    </div>
  );
}
