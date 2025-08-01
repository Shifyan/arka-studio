"use client";
import { Prociono } from "next/font/google";
import { Button } from "./ui/button";
import Link from "next/link";
const prociono = Prociono({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  return (
    <div className="flex flex-row items-center">
      <div className="left-header basis-1/5 ps-[114px]  pt-[13px]">
        <div className="w-fit ">
          <h1
            className={`${prociono.className} text-[28px] leading-[28px] text-right`}
          >
            Arka <br />
            Studio
          </h1>
        </div>
      </div>

      <div className="center-header flex flex-row basis-3/5 justify-center pt-[25px]">
        <Link href="/">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold "
          >
            Home
          </Button>
        </Link>
        <Link href="/services">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold  "
          >
            Services
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold "
          >
            About Us
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold "
          >
            Portofolio
          </Button>
        </Link>
      </div>
      <div className="right-header basis-1/5 pt-[11px]">
        <Link href="/">
          <Button
            variant="outline"
            className="font-medium text-[20px] px-[30px] py-[22px] leading-[29px] cursor-pointer outline-1 text-red-900 border-red-900 hover:bg-red-900 hover:text-white transform ease-in duration-200"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
