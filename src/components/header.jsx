"use client";
import { Prociono } from "next/font/google";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const prociono = Prociono({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between px-6 py-4 shadow-md">
      {/* Left - Logo */}
      <div className="left-header">
        <h1
          className={`${prociono.className} text-[24px] leading-[24px] text-left`}
        >
          Arka <br />
          Studio
        </h1>
      </div>

      {/* Center - Menu (hidden on mobile) */}
      <div className="hidden md:flex flex-row gap-6">
        <Link href="/">
          <Button
            variant="link"
            className="text-[18px] font-semibold hover:cursor-pointer"
          >
            Home
          </Button>
        </Link>
        <Link href="/services">
          <Button
            variant="link"
            className="text-[18px] font-semibold hover:cursor-pointer"
          >
            Services
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="link"
            className="text-[18px] font-semibold hover:cursor-pointer"
          >
            About Us
          </Button>
        </Link>
        <Link href="/cek-booking">
          <Button
            variant="link"
            className="text-[18px] font-semibold hover:cursor-pointer"
          >
            Cek Jadwal
          </Button>
        </Link>
      </div>

      {/* Right - Book Now (hidden on mobile) */}
      <div className="hidden md:block">
        <Link href="/booking">
          <Button
            variant="outline"
            className="font-medium text-[18px] px-6 py-3 text-red-900 border-red-900 hover:cursor-pointer hover:bg-red-900 hover:text-white transition"
          >
            Book Now
          </Button>
        </Link>
      </div>

      {/* Burger menu (shown on mobile) */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[90px] left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 z-50">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About Us
          </Link>
          <Link href="/cek-booking" onClick={() => setOpen(false)}>
            Cek Jadwal
          </Link>
          <Link href="/booking" onClick={() => setOpen(false)}>
            <Button
              variant="outline"
              className="font-medium text-[18px] px-6 py-3 text-red-900 border-red-900 hover:bg-red-900 hover:text-white transition"
            >
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
