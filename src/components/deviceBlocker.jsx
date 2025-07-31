"use client";

import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Image from "next/image";
import Link from "next/link";

export default function OnlyDesktop({ children }) {
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    // Bukan mobile dan bukan tablet berarti PC/Laptop
    const isNotMobileOrTablet = !isMobile && !isTablet;
    setIsDesktop(isNotMobileOrTablet);
  }, []);

  if (isDesktop === null) {
    // Masih deteksi
    return null;
  }

  if (!isDesktop) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center font-bold bg-black text-white text-center p-4">
        <Image
          src="/desktop.png"
          alt="Desktop"
          width={60}
          height={60}
          className="mb-[10px]"
        />
        <p className="mb-[20px]">
          For a better experience, please open this website on a PC or Laptop.
        </p>
        <Link href="https://www.instagram.com/a.shif_yan/">--Shifyannn</Link>
      </div>
    );
  }

  return children;
}
