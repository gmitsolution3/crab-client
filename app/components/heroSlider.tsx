// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";

// interface SliderContainer {
//   id: string;
//   title?: string;
//   description?: string;
//   buttonText?: string;
//   buttonLink?: string;
//   images: string[];
// }

// export interface ProductSliderSectionProps {
//   mainSlider: SliderContainer;
//   sideSliders: SliderContainer[];
// }

// const SingleSlider = ({
//   slider,
//   isMain = false,
// }: {
//   slider: SliderContainer;
//   isMain?: boolean;
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState<"left" | "right">("right");

//   const handlePrev = () => {
//     setDirection("left");
//     setCurrentIndex((prev) =>
//       prev === 0 ? slider.images.length - 1 : prev - 1,
//     );
//   };

//   const handleNext = () => {
//     setDirection("right");
//     setCurrentIndex((prev) =>
//       prev === slider.images.length - 1 ? 0 : prev + 1,
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [currentIndex, slider.images.length]);

//   return (
//     <div
//       className={`relative w-full overflow-hidden rounded-md bg-linear-to-br from-slate-900 to-slate-800 ${
//         isMain ? "h-[60vh] md:h-[85vh]" : "h-[15vh] md:h-80"
//       }`}
//     >
//       <div className="relative w-full h-full">
//         {slider.images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-all duration-700 ease-out ${
//               index === currentIndex
//                 ? "opacity-100 scale-100"
//                 : "opacity-0 scale-105"
//             }`}
//           >
//             <Image
//               src={image || "/placeholder.svg"}
//               alt={`${slider.title} - Image ${index + 1}`}
//               className="w-full h-full object-cover"
//               priority
//               fetchPriority="high"
//               fill
//               sizes="100vw"
//             />
//             <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
//           </div>
//         ))}
//       </div>

//       {/* Text Content Overlay */}
//       {isMain ? (
//         <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 max-w-2xl">
//           <div className="mb-2 md:mb-3">
//             <span className="inline-block bg-orange-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
//               নতুন কালেকশন
//             </span>
//           </div>
//           <h2 className="text-white font-bold mb-2 md:mb-4 text-2xl md:text-4xl lg:text-5xl leading-tight">
//             প্রিমিয়াম মানের পোশাক
//           </h2>
//           <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-lg lg:text-xl max-w-xl">
//             সর্বোচ্চ মানের কাপড় দিয়ে তৈরি আরামদায়ক পোশাক। বিশেষ ছাড়ে এখনই
//             অর্ডার করুন।
//           </p>
//           <a
//             href="#products"
//             className="inline-block bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors duration-300 shadow-lg"
//           >
//             এখনই কিনুন
//           </a>
//         </div>
//       ) : (
//         <div className="absolute bottom-4 left-4 right-4 z-10">
//           <h2 className="text-white font-bold mb-1 text-sm md:text-lg">
//             {slider.title || "বিশেষ অফার"}
//           </h2>
//           <p className="text-white/90 text-xs md:text-sm line-clamp-2">
//             {slider.description || "সীমিত সময়ের জন্য বিশেষ ছাড়"}
//           </p>
//         </div>
//       )}

//       {/* Navigation Arrows */}
//       <>
//         <button
//           onClick={handlePrev}
//           className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//         </button>

//         <button
//           onClick={handleNext}
//           className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
//           aria-label="Next slide"
//         >
//           <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//         </button>
//       </>
//     </div>
//   );
// };

// export default function ProductSliderSection({
//   mainSlider,
//   sideSliders,
// }: ProductSliderSectionProps) {
//   return (
//     <section className="w-full bg-white px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
//       <div className="max-w-full mx-auto">
//         <div className="grid grid-cols-1">
//           <div>
//             <SingleSlider slider={mainSlider} isMain={true} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface SliderContainer {
  id: string;
  title?: string;
  description?: string;
  images: string[];
}

export interface ProductSliderSectionProps {
  mainSlider: SliderContainer;
  sideSliders: SliderContainer[];
}

const SingleSlider = ({
  slider,
  isMain = false,
}: {
  slider: SliderContainer;
  isMain?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) =>
      prev === 0 ? slider.images.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) =>
      prev === slider.images.length - 1 ? 0 : prev + 1,
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, slider.images.length]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-md bg-linear-to-br from-slate-900 to-slate-800 ${
        isMain ? "h-[20vh] md:h-[77vh]" : "h-[15vh] md:h-[37vh]"
      }`}
    >
      {/* ${isMain ? "h-96 md:h-full" : "h-64 md:h-80"} */}
      <div className="relative w-full h-full">
        {slider.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${slider.title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              priority
              fetchPriority="high"
              fill
              sizes="100vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
      <>
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slider.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-orange-500 w-8 h-2"
                : "bg-white/50 hover:bg-white/70 w-2 h-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProductSliderSection({
  mainSlider,
  sideSliders,
}: ProductSliderSectionProps) {
  return (
    <section className="w-full bg-white px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="max-w-full mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Main Slider - Takes full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2">
            <SingleSlider slider={mainSlider} isMain={true} />
          </div>

          {/* Side Sliders Container */}
          <div className="grid grid-cols-2 gap-2 md:gap-6 lg:flex lg:flex-col lg:gap-6">
            {sideSliders.map((slider) => (
              <div
                key={slider.id}
                className={`${sideSliders.length === 2 ? "col-span-1" : ""}`}
              >
                <SingleSlider slider={slider} isMain={false} />
                {/* {slider.title && (
                  <h3 className="text-sm md:text-base font-semibold mt-3 md:mt-4 text-gray-900">{slider.title}</h3>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}