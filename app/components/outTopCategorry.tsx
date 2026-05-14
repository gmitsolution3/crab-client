import { TopCategories } from "./topCategory";

export const OurTopCategory = async ({
  categories,
}: {
  categories: any;
}) => {
  return (
    <div className="max-w-7xl mx-auto min-h-[30vh]">
      <TopCategories categories={categories} />
    </div>
  );
};
