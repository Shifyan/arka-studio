import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="  py-[30px] ">
      <div className="flex">
        <div className="w-[668px] max-h-[670px] me-[40px] ms-[110px]">
          <h1 className="font-bold text-[76px] leading-tight space-y-2">
            <span className="  rounded-b-[20px]  pe-3 ">Unleash The</span>
            <br />
            <span className="  rounded pe-3">Art Of</span>
            <br />
            <span className=" w-[668px] rounded-t-[20px] pe-3">
              Photography
            </span>
          </h1>
          <h2 className="font-normal text-[16px]  pt-4 rounded-b-[20px] max-w-[568px] ">
            Di Arka Studio, kami fokus menangkap momen-momen paling berharga
            dalam hidup Anda dan mengubahnya jadi karya visual yang penuh makna.
            Dengan tim fotografer yang berpengalaman dan penuh semangat, kami
            siap bercerita lewat lensa dan memastikan setiap jepretan
            mencerminkan perjalanan unik Anda.
          </h2>
          <div className="mt-[16px]">
            <Link href="/booking">
              <Button className=" cursor-pointer hover:bg-red-950 bg-red-900 text-white px-[48px] py-[28px] font-medium text-[20px] transform duration-200 ease-in">
                Book Your Session Now &gt;
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[530px]">
          {/* Gambar */}
          <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />

          {/* Overlay gradasi horizontal */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/100 z-10" />
        </div>
      </div>
    </div>
  );
}
