import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ComLogo = () => {
  return (
    <Link href="/">
      <div className="hover:cursor-pointer">
        <Image
          src="https://i.postimg.cc/WbTN2bBF/image-70.png"
          alt="logo"
          width={79}
          height={66}
        />
      </div>
    </Link>
  );
};
