import SEOHelmet from "@/utils/SEOHelmet";

import CategoryContainer from "@/components/container/CategoryContainer";

export default function Category() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* header */}
      <SEOHelmet
        title={`Product Category`}
        description="Check out the various categories."
      />

      {/* body  */}
      <main className="w-full h-[50rem] grid grid-cols-2 gap-10">
        <CategoryContainer category="Classic" />
        <CategoryContainer category="Sports" />
        <CategoryContainer category="Adventure" />
        <CategoryContainer category="Scooter" />
      </main>
    </div>
  );
}
