"use client";

interface MarqueeTextProps {
  text?: string;
  speed?: number; // seconds, default 20s
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text = "🔥 ফ্রি ডেলিভারি সারা বাংলাদেশে | ক্যাশ অন ডেলিভারি | ৭ দিনের রিটার্ন গ্যারান্টি | ১০০% অরিজিনাল প্রোডাক্ট 🔥",
  speed = 20,
}) => {
  return (
    <div className="w-full overflow-hidden bg-[#0970B4] text-white py-2">
      <div className="flex animate-marquee">
       
        <span className="whitespace-nowrap text-sm md:text-base font-medium px-4">
          {text}
        </span>
       
        <span className="whitespace-nowrap text-sm md:text-base font-medium px-4">
          {text}
        </span>
        <span className="whitespace-nowrap text-sm md:text-base font-medium px-4">
          {text}
        </span>
        <span className="whitespace-nowrap text-sm md:text-base font-medium px-4">
          {text}
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
