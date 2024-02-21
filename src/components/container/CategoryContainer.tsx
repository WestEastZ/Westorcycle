import { Link } from "react-router-dom";

export default function CategoryContainer({ category }: { category: string }) {
  return (
    <Link
      to={`/category/${category}`}
      className="flex justify-center items-center  hover:scale-150 duration-200"
    >
      <span className="text-3xl">{category}</span>
    </Link>
  );
}
