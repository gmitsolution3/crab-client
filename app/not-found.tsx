import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Illustration / Icon Area */}
        <div className="mb-10 relative">
          <div className="text-9xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30">
            404
          </div>

          {/* Cute floating element / you can replace with real SVG or image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce">
            👾
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-lg mx-auto">
          The page you're looking for seems to have wandered off into the
          digital void...
        </p>

        {/* Beautiful Gradient Button */}
        <Link
          href="/"
          className="
            inline-block
            px-10 py-5
            text-lg md:text-xl font-semibold
            bg-linear-to-r from-primary to-purple-600
            hover:from-blue-700 hover:to-purple-700
            text-white rounded-full
            shadow-lg shadow-primary/30
            transition-all duration-300
            transform hover:scale-105 hover:shadow-xl hover:shadow-purple-600/40
            focus:outline-none focus:ring-4 focus:ring-purple-500/50
          "
        >
          ← Go Back Home
        </Link>

        <p className="mt-12 text-gray-500 text-sm">
          Or maybe try searching? The internet is big and full of surprises! ✨
        </p>
      </div>
    </div>
  );
}
