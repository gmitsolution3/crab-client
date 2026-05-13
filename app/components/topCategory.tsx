import {
  Box,
  Cpu,
  Heart,
  Watch,
  Thermometer,
  ShoppingBag,
  Gift,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

interface SubCategory {
  name: string;
  slug: string;
  isActive: boolean;
  id: string;
}

interface Category {
  isActive: boolean;
  name: string;
  order: number;
  slug: string;
  image?: string;
  subCategories: SubCategory[];
  _id: string;
}

interface TopCategoriesProps {
  categories: Category[];
}

/**
 * Import ONLY used icons
 */
const iconList = [
  Box,
  Cpu,
  Heart,
  Watch,
  Thermometer,
  ShoppingBag,
  Gift,
];

export const TopCategories = ({
  categories,
}: TopCategoriesProps) => {
  if (!categories?.length) {
    return (
      <section className="py-8 px-4 md:px-8 lg:px-16">
        <div className="text-2xl text-center text-primary">
          No Category found
        </div>
      </section>
    );
  }

  const sortedCategories = [...categories].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      {/* HEADING */}
      <div className="mb-6">
        <h2 className="text-xl lg:text-4xl text-center uppercase font-semibold">
          Top Categories
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {sortedCategories.map((cat, index) => {
          const IconComponent =
            iconList[index % iconList.length];

          return (
            <Link
              href={`/shop/${cat._id}`}
              key={cat._id}
              className="h-full"
            >
              <article className="flex flex-col items-center justify-center bg-gray-300 shadow hover:shadow-lg transition-shadow overflow-hidden relative h-full">
                {/* IMAGE */}
                {cat.image ? (
                  <div className="w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      sizes="
                        (max-width: 768px) 50vw,
                        (max-width: 1200px) 33vw,
                        20vw
                      "
                      className="w-full h-[180px] md:h-[220px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="bg-[#ebdfd4] rounded-full p-3 my-10">
                    <IconComponent
                      size={28}
                      className="text-primary"
                    />
                  </div>
                )}

                {/* CATEGORY NAME */}
                <span className="text-sm font-medium text-white bg-primary shadow rounded-full px-4 py-2 uppercase absolute top-3 left-3">
                  {cat.name}
                </span>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};