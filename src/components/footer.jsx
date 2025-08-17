import Link from "next/link";
import { Button } from "./ui/button";
export default function Footer() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:mx-[130px] my-[25px]">
      {/* Mobile Layout - Only Brand and Instagram */}
      <div className="lg:hidden flex justify-center">
        <div className="text-center">
          <h1 className="font-semibold text-[16px] sm:text-[18px]">
            Arka Studio.{" "}
            <Link
              href="https://www.instagram.com/a.shif_yan/"
              className="text-[#BF3A2B] hover:text-[#8B2A1F] transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              SHIFYAN ALMUSTAFID
            </Link>
          </h1>
        </div>
      </div>

      {/* Desktop Layout - Full Navigation */}
      <div className="hidden lg:flex flex-row items-center justify-between">
        <div>
          <h1 className="font-semibold text-[20px]">
            Arka Studio.{" "}
            <Link
              href="https://www.instagram.com/a.shif_yan/"
              className="text-[#BF3A2B] hover:text-[#8B2A1F] transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              SHIFYAN ALMUSTAFID
            </Link>
          </h1>
        </div>
        <div className="flex flex-row gap-[40px] justify-center">
          <Link href="/">
            <Button
              variant="link"
              className="cursor-pointer text-[20px] font-semibold p-0 hover:text-[#BF3A2B] transition-colors duration-200"
            >
              Home
            </Button>
          </Link>
          <Link href="/services">
            <Button
              variant="link"
              className="cursor-pointer text-[20px] font-semibold p-0 hover:text-[#BF3A2B] transition-colors duration-200"
            >
              Services
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="link"
              className="cursor-pointer text-[20px] font-semibold p-0 hover:text-[#BF3A2B] transition-colors duration-200"
            >
              About Us
            </Button>
          </Link>
          <Link href="/cek-booking">
            <Button
              variant="link"
              className="cursor-pointer text-[20px] font-semibold p-0 hover:text-[#BF3A2B] transition-colors duration-200"
            >
              Cek Jadwal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
