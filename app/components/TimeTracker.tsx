// "use client";

// import { useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";

// export default function TimeTracker() {
//   const startRef = useRef<number>(Date.now());
//   const pathname = usePathname();

//   useEffect(() => {
//     startRef.current = Date.now();
//   }, [pathname]);

//   useEffect(() => {
//     const sendTime = () => {
//       const spent = Date.now() - startRef.current;

//       const payload = JSON.stringify({
//         route: pathname,
//         timeSpent: spent,
//       });

//       navigator.sendBeacon(
//         `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/track-time`,
//         new Blob([payload], { type: "application/json" }),
//       );
//     };

//     window.addEventListener("beforeunload", sendTime);
//     console.log("Time tracker attached");

//     return () => {
//       sendTime();
//       window.removeEventListener("beforeunload", sendTime);
//     };
//   }, [pathname]);

//   return null;
// }

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TimeTracker() {
  const startRef = useRef<number>(Date.now());
  const pathname = usePathname();

  const maxScrollRef = useRef(0);
  const mouseMoveRef = useRef(0);
  const clickRef = useRef(0);
  const screenRef = useRef({
    width: 0,
    height: 0,
    ratio: 1,
    orientation: "unknown",
  });

  useEffect(() => {
    startRef.current = Date.now();
    maxScrollRef.current = 0;
    mouseMoveRef.current = 0;
    clickRef.current = 0;

    screenRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.devicePixelRatio || 1,
      orientation: screen.orientation?.type || "unknown",
    };
  }, [pathname]);

  useEffect(() => {
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);
      if (percent > maxScrollRef.current) {
        maxScrollRef.current = percent;
      }
    };

    // const handleMouseMove = () => {
    //   mouseMoveRef.current += 1;
    // };

    let last = 0;
    const handleMouseMove = () => {
      const now = Date.now();
      if (now - last > 100) {
        mouseMoveRef.current++;
        last = now;
      }
    };

    const handleClick = () => {
      clickRef.current += 1;
    };

    const handleTouch = () => {
      mouseMoveRef.current += 1;
    };

    const handleResize = () => {
      screenRef.current.width = window.innerWidth;
      screenRef.current.height = window.innerHeight;
      screenRef.current.ratio = window.devicePixelRatio || 1;
      screenRef.current.orientation = screen.orientation?.type || "unknown";
    };

    const sendTime = () => {
      const spent = Date.now() - startRef.current;

      const payload = JSON.stringify({
        route: pathname,
        timeSpent: spent,
        scrollDepth: maxScrollRef.current,
        mouseMoves: mouseMoveRef.current,
        clicks: clickRef.current,
        touch: mouseMoveRef.current,
        screen: screenRef.current,
      });

      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/track-time`,
        new Blob([payload], { type: "application/json" }),
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("touchend", handleTouch);
    window.addEventListener("resize", handleResize);
    window.addEventListener("beforeunload", sendTime);

    return () => {
      sendTime();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.addEventListener("touchstart", handleTouch);
      window.addEventListener("touchend", handleTouch);
      window.addEventListener("resize", handleResize);
      window.removeEventListener("beforeunload", sendTime);
    };
  }, [pathname]);

  return null;
}
