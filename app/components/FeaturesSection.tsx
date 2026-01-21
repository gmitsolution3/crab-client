import React from "react";
import { Truck, Repeat, ThumbsUp, Headphones } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  color: string; // icon color
}

const features: Feature[] = [
  { icon: <Truck />, title: "Fastest Home Delivery", color: "#FBBF24" }, // yellow
  { icon: <Repeat />, title: "Exchange Facility", color: "#10B981" }, // green
  { icon: <ThumbsUp />, title: "Best Price Deals", color: "#EF4444" }, // red
  { icon: <Headphones />, title: "After Sell Service", color: "#F97316" }, // orange
];

export const FeaturesSection = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-16">
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-2 lg:grid-cols-4 sm:flex-row justify-between items-center gap-6 sm:gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition duration-300 ease-in-out cursor-pointer group"
          >
            <div
              className="p-3 rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300"
              style={{ color: feature.color }}
            >
              {React.cloneElement(
                feature.icon as React.ReactElement,
                {
                  size: 28,
                } as any,
              )}
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
