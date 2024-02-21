import { OrderByDirection } from "@firebase/firestore";

export default function SortButton({
  sortOption,
}: {
  sortOption: (option: string, direction: OrderByDirection) => void;
}) {
  return (
    <section className="my-10 w-full flex gap-10">
      <section className="flex justify-center gap-10">
        <button
          name="SortPriceAscButton"
          onClick={() => sortOption("price", "asc")}
        >
          가격 오름정렬
        </button>
        <button
          name="SortPriceDescButton"
          onClick={() => sortOption("price", "desc")}
        >
          가격 내림정렬
        </button>
      </section>

      <section className="flex justify-center gap-10">
        <button
          name="SortUpdateAscButton"
          onClick={() => sortOption("updatedAt", "asc")}
        >
          최신 오름정렬
        </button>
        <button
          name="SortUpdateDescButton"
          onClick={() => sortOption("updatedAt", "desc")}
        >
          최신 내림정렬
        </button>
      </section>
    </section>
  );
}
