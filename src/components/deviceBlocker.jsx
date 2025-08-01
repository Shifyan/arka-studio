"use client";

import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Image from "next/image";
import Link from "next/link";

export default function OnlyDesktop({ children }) {
  const [ready, setReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Jalankan hanya di client
    const isClientDesktop = !isMobile && !isTablet;
    setIsDesktop(isClientDesktop);
    setReady(true);
  }, []);

  if (!ready) return null;

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
        <p className="mb-[20px] font-medium">
          This project is currently under development. For the better
          experience, please access it from a PC or laptop
        </p>
        <Link href="https://www.instagram.com/a.shif_yan/">--Shifyannn</Link>
      </div>
    );
  }

  return children;
}
