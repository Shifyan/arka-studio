import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="py-6 sm:py-8 lg:py-[30px] overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:flex max-w-full">
        <div className="w-[668px] max-h-[670px] mt-[20px] me-[40px] ms-[10px] lg:ms-[110px] flex-shrink-0">
          <h1 className="font-semibold text-[45px] lg:font-bold lg:text-[76px] leading-tight space-y-2">
            <span className="">Unleash The</span>
            <br />
            <span className="">Art Of</span>
            <br />
            <span className="">Photography</span>
          </h1>
          <h2 className="font-normal text-[16px] mt-[20px] lg:mt-[40px] max-w-[568px]">
            Di Arka Studio, kami fokus menangkap momen-momen paling berharga
            dalam hidup Anda dan mengubahnya jadi karya visual yang penuh makna.
            Dengan tim fotografer yang berpengalaman dan penuh semangat, kami
            siap bercerita lewat lensa dan memastikan setiap jepretan
            mencerminkan perjalanan unik Anda.
          </h2>
          <div className="mt-[40px]">
            <Link href="/booking">
              <Button className="cursor-pointer hover:bg-red-950 bg-red-900 text-white px-[48px] py-[28px] font-medium text-[20px] transform duration-200 ease-in">
                Book Your Session Now &gt;
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative flex-1 h-[600px] min-w-0">
          {/* Gambar */}
          <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />

          {/* Overlay gradasi horizontal */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/100 z-10" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-4 sm:px-6">
        {/* Hero Image for Mobile */}
        <div className="relative w-full h-[300px] sm:h-[400px] mb-6 rounded-lg overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 z-10" />

          {/* Text overlay on image for mobile */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="font-bold text-[28px] sm:text-[36px] leading-tight mb-3">
              Unleash The
              <br />
              Art Of
              <br />
              Photography
            </h1>
          </div>
        </div>

        {/* Content below image */}
        <div className="text-center">
          <h2 className="font-normal text-[14px] sm:text-[16px] leading-relaxed mb-6 max-w-[500px] mx-auto text-gray-700">
            Di Arka Studio, kami fokus menangkap momen-momen paling berharga
            dalam hidup Anda dan mengubahnya jadi karya visual yang penuh makna.
            Dengan tim fotografer yang berpengalaman dan penuh semangat, kami
            siap bercerita lewat lensa dan memastikan setiap jepretan
            mencerminkan perjalanan unik Anda.
          </h2>

          <div className="">
            <Link href="/booking">
              <Button className="cursor-pointer hover:bg-red-950 bg-red-900 text-white px-6 sm:px-8 py-5 sm:py-6 font-medium text-[16px] sm:text-[18px] transform duration-200 ease-in w-full sm:w-auto">
                Book Your Session Now &gt;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
